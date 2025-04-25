"use client";

import React, { useState, useEffect } from 'react';
import AddONTModal from './add-ont-form';
import { createClient } from '@supabase/supabase-js';
import { 
  Search, 
  ChevronRight, 
  ChevronLeft, 
  SlidersHorizontal, 
  ArrowUpDown,
  Plus,
  ChevronDown,
  Bell,
  Settings,
  HelpCircle,
  Users,
  LayoutDashboard,
  Network,
  BarChart,
  LineChart,
  CheckCircle,
  AlertCircle,
  LogOut,
  FileText,
  Settings2,
  Activity,
  MoreVertical,
  Loader2
} from "lucide-react";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Link from "next/link";
import LogoutButton from '@/components/logoutButton';

// Initialize Supabase client
// NOTE: Replace with your actual Supabase URL and anon key
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const ONTManagement = () => {
  const [ontDevices, setOntDevices] = useState([]);
  const [selectedOnt, setSelectedOnt] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isAddOntModalOpen, setIsAddOntModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [totalItems, setTotalItems] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState(null);
  
  const itemsPerPage = 7;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Fetch ONT devices from Supabase
  useEffect(() => {
    fetchOntDevices();
  }, [currentPage, searchQuery]);

  const fetchOntDevices = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Calculate pagination range
      const from = (currentPage - 1) * itemsPerPage;
      const to = from + itemsPerPage - 1;
      
      // Build the query
      let query = supabase
        .from('Onu')
        .select('id, name, serialnumber, status, ponportid', { count: 'exact' });
        
      // Add search filter if search query exists
      if (searchQuery) {
        query = query.or(`name.ilike.%${searchQuery}%,serialnumber.ilike.%${searchQuery}%`);
      }
      
      // Add pagination
      const { data, count, error } = await query
        .range(from, to)
        .order('updatedat', { ascending: false });
        
      if (error) throw error;
      
      // Fetch customer info and OLT port info for each ONT
      const enhancedData = await Promise.all(data.map(async (ont) => {
        // Fetch PON port details to get OLT port information
        const { data: ponPortData } = await supabase
          .from('PonPort')
          .select('id, name, oltid')
          .eq('id', ont.ponportid)
          .single();
          
        // Fetch customer info if customerid exists
        let customerName = 'Unassigned';
        if (ont.customerid) {
          const { data: customerData } = await supabase
            .from('Customer')
            .select('name')
            .eq('id', ont.customerid)
            .single();
            
          if (customerData) {
            customerName = customerData.name;
          }
        }
        
        let oltPort = 'Unknown';
        if (ponPortData) {
          // Get OLT name
          const { data: oltData } = await supabase
            .from('OLT')
            .select('name')
            .eq('id', ponPortData.oltid)
            .single();
            
          if (oltData) {
            oltPort = `${oltData.name} ${ponPortData.name}`;
          }
        }
        
        return {
          ...ont,
          customer: customerName,
          oltPort
        };
      }));
      
      setOntDevices(enhancedData);
      setTotalItems(count || 0);
      
      // Select the first ONT by default if none is selected
      if (!selectedOnt && enhancedData.length > 0) {
        handleSelectOnt(enhancedData[0].id);
      }
    } catch (error) {
      console.error('Error fetching ONT devices:', error);
      setError('Failed to load ONT devices');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectOnt = async (ontId) => {
    try {
      setIsLoading(true);
      
      // Fetch the basic ONT details
      const { data: ontData, error: ontError } = await supabase
        .from('Onu')
        .select('*')
        .eq('id', ontId)
        .single();
        
      if (ontError) throw ontError;
      
      // Fetch customer info
      let customer = "Unassigned";
      let address = "N/A";
      if (ontData.customerid) {
        const { data: customerData } = await supabase
          .from('Customer')
          .select('name, address')
          .eq('id', ontData.customerid)
          .single();
          
        if (customerData) {
          customer = customerData.name;
          address = customerData.address || "N/A";
        }
      }
      
      // Fetch PON port details
      let connection = {
        olt: "Unknown",
        oltPort: "Unknown",
        provisionedSpeed: "Unknown",
        latitude: "Unknown",
        longitude: "Unknown"
      };
      
      if (ontData.ponportid) {
        const { data: ponPortData } = await supabase
          .from('PonPort')
          .select('name, oltid')
          .eq('id', ontData.ponportid)
          .single();
          
        if (ponPortData) {
          // Get OLT name
          const { data: oltData } = await supabase
            .from('OLT')
            .select('name')
            .eq('id', ponPortData.oltid)
            .single();
            
          if (oltData) {
            connection.olt = oltData.name;
            connection.oltPort = ponPortData.name;
          }
        }
      }
      
      // Fetch profile info for provisioned speed and lat/long
      if (ontData.profileid) {
        const { data: profileData } = await supabase
          .from('Profile')
          .select('speed, latitude, longitude')
          .eq('id', ontData.profileid)
          .single();
          
        if (profileData) {
          connection.provisionedSpeed = profileData.speed || "N/A";
          connection.latitude = profileData.latitude || "N/A";
          connection.longitude = profileData.longitude || "N/A";
        }
      }
      
      // Fetch services assigned to this ONT
      const { data: servicesData } = await supabase
        .from('Service')
        .select('name, type, status, speed')
        .eq('onuid', ontId);
        
      // Use default services if none found
      const services = servicesData?.length > 0 ? servicesData : [
        { name: "Internet", type: "Residential", status: "active", speed: "N/A" },
        { name: "Voice", type: "VoIP", status: "inactive", speed: "N/A" }
      ];
      
      // Calculate uptime if lastOnlineAt exists
      let uptime = "N/A";
      if (ontData.lastOnlineAt && ontData.uptimeSeconds) {
        const uptimeHours = Math.floor(ontData.uptimeSeconds / 3600);
        const uptimeDays = Math.floor(uptimeHours / 24);
        const remainingHours = uptimeHours % 24;
        uptime = `${uptimeDays} days ${remainingHours} hours`;
      }
      
      // Format last updated time
      let lastUpdated = "N/A";
      if (ontData.updatedat) {
        const updatedDate = new Date(ontData.updatedat);
        const now = new Date();
        const diffMs = now - updatedDate;
        const diffMins = Math.floor(diffMs / 60000);
        
        if (diffMins < 60) {
          lastUpdated = `${diffMins} min ago`;
        } else {
          const diffHours = Math.floor(diffMins / 60);
          if (diffHours < 24) {
            lastUpdated = `${diffHours} hours ago`;
          } else {
            const diffDays = Math.floor(diffHours / 24);
            lastUpdated = `${diffDays} days ago`;
          }
        }
      }
      
      // Construct the complete ONT details object
      const ontDetails = {
        id: ontData.id,
        name: ontData.name || ontData.serialnumber,
        customer,
        oltPort: `${connection.olt} ${connection.oltPort}`,
        status: ontData.status?.toLowerCase() || "unknown",
        uptime,
        lastUpdated,
        signal: ontData.rxPower ? `${ontData.rxPower} dBm` : "N/A",
        packetLoss: "0.02%", // Default value or calculate if available
        address,
        device: {
          model: ontData.model || "N/A",
          manufacturer: "N/A", // Not in the database, add if needed
          serialNumber: ontData.serialnumber || "N/A",
          ip_address: ontData.ip_address || "N/A",
          macAddress: ontData.mac_address || "N/A"
        },
        connection,
        services,
        diagnostics: {
          lastTest: {
            type: "Signal Test",
            date: ontData.lastSyncAt ? new Date(ontData.lastSyncAt).toLocaleString() : "N/A",
            result: ontData.rxPower ? `${ontData.rxPower} dBm (Good)` : "N/A"
          }
        }
      };
      
      setSelectedOnt(ontDetails);
    } catch (error) {
      console.error('Error fetching ONT details:', error);
      setError('Failed to load ONT details');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddOnt = async (newOnt) => {
    try {
      // Insert the new ONT into Supabase
      const { data, error } = await supabase
        .from('Onu')
        .insert([{
          name: newOnt.name,
          serialnumber: newOnt.serialNumber,
          ponportid: newOnt.ponPort,
          model: newOnt.model,
          mac_address: newOnt.macAddress,
          ip_address: newOnt.ip_address,
          status: 'PENDING',
          createdat: new Date().toISOString(),
          updatedat: new Date().toISOString()
        }])
        .select();
        
      if (error) throw error;
      
      // Refresh the ONT list
      fetchOntDevices();
      
      // Close the modal
      setIsAddOntModalOpen(false);
    } catch (error) {
      console.error('Error adding new ONT:', error);
      alert('Failed to add new ONT');
    }
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); // Reset to first page when searching
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-gradient-to-b from-green-800 to-green-950 text-white flex flex-col hidden md:flex">
        <div className="p-4 flex items-center space-x-2 border-b border-green-700">
          <div className="bg-blue-400 rounded-full p-2">
            <Network className="h-5 w-5 text-white" />
          </div>
          <span className="font-bold text-xl">DOTMAC</span>
        </div>
        
        <nav className="flex-1 overflow-y-auto">
          <div className="p-2">
            <Button 
              variant="ghost" 
              className="w-full justify-start text-white hover:bg-green-700 hover:text-white px-4 py-2 rounded-lg mb-1"
              asChild
            >
              <Link href="/dashboard">
                <LayoutDashboard className="mr-2 h-5 w-5" />
                Dashboard
              </Link>
            </Button>
            
            {/* Other navigation buttons remain the same */}
            <Button 
              variant="ghost" 
              className="w-full justify-start text-white hover:bg-green-700 hover:text-white px-4 py-2 rounded-lg mb-1"
              asChild
            >
              <Link href="/customers">
                <Users className="mr-2 h-5 w-5" />
                Customers
              </Link>
            </Button>
            
            <Button 
              variant="ghost" 
              className="w-full justify-start text-white hover:bg-green-700 hover:text-white px-4 py-2 rounded-lg mb-1"
              asChild
            >
              <Link href="/olt-management">
                <CheckCircle className="mr-2 h-5 w-5" />
                OLT Management
              </Link>
            </Button>
            
            <Button 
              variant="ghost" 
              className="w-full justify-start bg-green-700 text-white hover:bg-green-600 hover:text-white px-4 py-2 rounded-lg mb-1"
              asChild
            >
              <Link href="/ont-management">
                <Network className="mr-2 h-5 w-5" />
                ONT Management
              </Link>
            </Button>
            
            {/* Remaining navigation menu items */}
            <Button 
              variant="ghost" 
             className="w-full justify-start text-white hover:bg-green-700 hover:text-white px-4 py-2 rounded-lg mb-1"
              asChild
            >
              <Link href="/network-maps">
                <LineChart className="mr-2 h-5 w-5" />
                Network Maps
              </Link>
            </Button>
            
            <Button 
              variant="ghost" 
              className="w-full justify-start text-white hover:bg-green-700 hover:text-white px-4 py-2 rounded-lg mb-1"
              asChild
            >
              <Link href="/graphs">
                <BarChart className="mr-2 h-5 w-5" />
                Graphs
              </Link>
            </Button>
            
            <Button 
              variant="ghost" 
              className="w-full justify-start text-white hover:bg-green-700 hover:text-white px-4 py-2 rounded-lg mb-1"
              asChild
            >
              <Link href="/configured">
                <Settings className="mr-2 h-5 w-5" />
                Configured
              </Link>
            </Button>
            
            <Button 
              variant="ghost" 
              className="w-full justify-start text-white hover:bg-green-700 hover:text-white px-4 py-2 rounded-lg mb-1"
              asChild
            >
              <Link href="/unconfigured">
                <Plus className="mr-2 h-5 w-5" />
                Unconfigured
              </Link>
            </Button>
            
            <Button 
              variant="ghost" 
              className="w-full justify-start text-white hover:bg-green-700 hover:text-white px-4 py-2 rounded-lg mb-1"
              asChild
            >
              <Link href="/diagnostics">
                <Activity className="mr-2 h-5 w-5" />
                Diagnostics
              </Link>
            </Button>
            
            <Button 
              variant="ghost" 
               className="w-full justify-start text-white hover:bg-green-700 hover:text-white px-4 py-2 rounded-lg mb-1"
              asChild
            >
              <Link href="/reports">
                <FileText className="mr-2 h-5 w-5" />
                Reports
              </Link>
            </Button>
            
            <Button 
              variant="ghost" 
              className="w-full justify-start text-white hover:bg-green-700 hover:text-white px-4 py-2 rounded-lg mb-1"
              asChild
            >
              <Link href="/admin">
                <Settings2 className="mr-2 h-5 w-5" />
                Admin
              </Link>
            </Button>
          </div>
        </nav>
        
        <div className="p-4 border-t border-green-700">
          <div className="flex items-center space-x-3 mb-3">
            <Avatar className="h-10 w-10 bg-blue-400">
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div>
              <div className="font-medium">John Doe</div>
              <div className="text-xs text-gray-300">Administrator</div>
            </div>
          </div>
          <LogoutButton />
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navigation */}
        <header className="bg-white shadow-sm z-10">
          <div className="px-6 py-3 flex items-center justify-between">
            <div className="relative w-64">
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-black" />
              <input
                type="search"
                placeholder="Search ONTs..."
                className="w-full pl-8 pr-4 py-2 rounded-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500 text-black"
                onChange={handleSearch}
                value={searchQuery}
              />
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5 text-black" />
                <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <Link href="/settings">
                <Settings className="h-5 w-5 text-black" />
                </Link>
              </Button>
              <Button variant="ghost" size="icon">
                <HelpCircle className="h-5 w-5 text-black" />
              </Button>
            </div>
          </div>
        </header>
        
        {/* Main ONT Management Content */}
        <main className="flex-1 overflow-y-auto p-6 bg-gray-100">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-black">ONT Management</h1>
              <p className="text-black">Manage and monitor your Optical Network Terminals</p>
            </div>
            <div className="flex items-center space-x-3">
            <Button 
                className="bg-green-500 hover:bg-green-600 text-white flex items-center"
                onClick={() => setIsAddOntModalOpen(true)}
              >
                <Plus className="mr-2 h-4 w-4" />
                Add New ONT
              </Button>
              
            {/*  <Button variant="outline" className="bg-white text-black">
                Bulk Actions
              </Button> */}
            </div>
          </div>
          
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
              <p>{error}</p>
            </div>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {/* ONT List Panel */}
            <div className="md:col-span-2">
              <Card className="shadow-sm border-0">
                <CardHeader className="pb-2">
                  <CardTitle className="text-black">ONT Devices</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between mb-4">
                    <div className="relative w-full max-w-xs">
                      <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-black" />
                      <Input
                        type="search"
                        placeholder="Filter ONTs..."
                        className="w-full pl-8 pr-4 py-2 rounded-md"
                        onChange={handleSearch}
                        value={searchQuery}
                      />
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" className="flex items-center text-black">
                        <SlidersHorizontal className="mr-1 h-4 w-4" />
                        Filter
                      </Button>
                      <Button variant="outline" className="flex items-center text-black">
                        <ArrowUpDown className="mr-1 h-4 w-4" />
                        Sort
                      </Button>
                    </div>
                  </div>
                  
                  {isLoading && ontDevices.length === 0 ? (
                    <div className="flex items-center justify-center h-64">
                      <Loader2 className="h-8 w-8 animate-spin text-green-500" />
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {ontDevices.length === 0 ? (
                        <div className="text-center p-6 text-gray-500">
                          No ONT devices found
                        </div>
                      ) : (
                        ontDevices.map((ont) => (
                          <div 
                            key={ont.id}
                            className={`p-3 border rounded-md cursor-pointer hover:bg-gray-50 flex items-center justify-between ${
                              selectedOnt?.id === ont.id ? 'bg-gray-50 border-green-200' : ''
                            }`}
                            onClick={() => handleSelectOnt(ont.id)}
                          >
                            <div>
                              <div className="font-medium text-black">{ont.name || ont.serialnumber}</div>
                              <div className="text-sm text-black">
                                {ont.description || 'Unassigned'} • {ont.serialnumber || 'Not assigned'}
                              </div>
                            </div>
                            <div className="flex items-center">
                              <div className={`
                                h-3 w-3 rounded-full mr-2
                                ${ont.status?.toLowerCase() === 'active' ? 'bg-green-500' : 
                                  ont.status?.toLowerCase() === 'warning' ? 'bg-yellow-500' : 
                                  ont.status?.toLowerCase() === 'critical' ? 'bg-red-500' : 
                                  ont.status?.toLowerCase() === 'pending' ? 'bg-blue-500' : 'bg-gray-400'}
                              `}></div>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  )}
                  
                  <div className="flex items-center justify-center mt-6">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-black">
                        Showing {ontDevices.length} of {totalItems} ONTs
                      </span>
                      <Button 
                        variant="outline" 
                        size="icon" 
                        disabled={currentPage === 1 || isLoading}
                        onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </Button>
                      
                      {Array.from({ length: Math.min(3, totalPages) }, (_, i) => {
                        const pageNum = i + 1;
                        return (
                          <Button 
                            key={pageNum}
                            variant={currentPage === pageNum ? "default" : "outline"} 
                            size="sm" 
                            className={`h-8 w-8 p-0 ${currentPage === pageNum ? 'bg-green-500 hover:bg-green-600' : ''}`}
                            onClick={() => setCurrentPage(pageNum)}
                            disabled={isLoading}
                          >
                            {pageNum}
                          </Button>
                        );
                      })}
                      
                      <Button 
                        variant="outline" 
                        size="icon" 
                        disabled={currentPage === totalPages || isLoading}
                        onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                      >
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* ONT Details Panel */}
            <div className="md:col-span-3">
              {isLoading && !selectedOnt ? (
                <div className="flex items-center justify-center h-64 bg-white rounded-lg shadow-sm">
                  <Loader2 className="h-8 w-8 animate-spin text-green-500" />
                </div>
              ) : !selectedOnt ? (
                <div className="flex items-center justify-center h-64 bg-white rounded-lg shadow-sm">
                  <p className="text-gray-500">Select an ONT to view details</p>
                </div>
              ) : (
                <Card className="shadow-sm border-0">
                  <CardHeader className="pb-2 flex flex-row items-center justify-between">
                    <CardTitle className="text-black">{selectedOnt.name || selectedOnt.id} Details</CardTitle>
                    <div className="flex space-x-2">
                    {/*  <Button className="bg-green-500 hover:bg-green-600 text-white">
                        Edit
                      </Button>
                      <Button variant="outline" className="text-black flex items-center">
                        Actions
                        <ChevronDown className="ml-1 h-4 w-4" />
                      </Button> */}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {/* Status Section */}
                      <div className="p-4 border rounded-md">
                        <h3 className="font-semibold text-lg mb-3 text-black">Status</h3>
                        <div className="grid grid-cols-2 gap-y-4">
                          <div>
                            <Badge className={`
                              ${selectedOnt.status === 'active' ? 'bg-green-100 text-green-600' : 
                                selectedOnt.status === 'warning' ? 'bg-yellow-100 text-yellow-600' :
                                selectedOnt.status === 'critical' ? 'bg-red-100 text-red-600' :
                                selectedOnt.status === 'pending' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'} mb-1
                            `}>
                              {selectedOnt.status === 'active' ? 'Online' : 
                                selectedOnt.status === 'warning' ? 'Warning' :
                                selectedOnt.status === 'critical' ? 'Critical' :
                                selectedOnt.status === 'pending' ? 'Pending' : 'Offline'}
                            </Badge>
                            <div className="text-sm text-black">Uptime: {selectedOnt.uptime}</div>
                          </div>
                          <div className="text-right">
                            <div className="text-sm text-black">Last Updated: {selectedOnt.lastUpdated}</div>
                          </div>
                          <div>
                            <div className="text-sm text-black">Customer: {selectedOnt.customer}</div>
                            <div className="text-sm text-black">Address: {selectedOnt.address}</div>
                          </div>
                          <div className="text-right">
                            <div className="text-sm text-black">Signal: {selectedOnt.signal}</div>
                            <div className="text-sm text-black">Packet Loss: {selectedOnt.packetLoss}</div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Device Information */}
                        <div className="p-4 border rounded-md">
                          <h3 className="font-semibold text-lg mb-3 text-black">Device Information</h3>
                          <div className="space-y-2">
                            <div className="text-sm text-black">Model: {selectedOnt.device.model}</div>
                            <div className="text-sm text-black">Manufacturer: {selectedOnt.device.manufacturer}</div>
                            <div className="text-sm text-black">Serial Number: {selectedOnt.device.serialNumber}</div>
                            <div className="text-sm text-black">IpAddress: {selectedOnt.device.ip_address}</div>
                            <div className="text-sm text-black">MAC Address: {selectedOnt.device.macAddress}</div>
                           {/* <Button variant="outline" className="text-green-500 mt-2 w-full">
                              Update Firmware
                            </Button> */}
                          </div>
                        </div>

                        {/* Connection Details */}
                        <div className="p-4 border rounded-md">
                          <h3 className="font-semibold text-lg mb-3 text-black">Connection Details</h3>
                          <div className="space-y-2">
                            <div className="text-sm text-black">OLT: {selectedOnt.connection.olt}</div>
                            <div className="text-sm text-black">OLT Port: {selectedOnt.connection.oltPort}</div>
                            <div className="text-sm text-black">Provisioned Speed: {selectedOnt.connection.provisionedSpeed}</div>
                            <div className="text-sm text-black">Latitude: {selectedOnt.connection.latitude}</div>
                            <div className="text-sm text-black">Longitude: {selectedOnt.connection.longitude}</div>
                           {/* <Button variant="outline" className="text-green-500 mt-2 w-full">
                              Edit Configuration
                            </Button> */}
                          </div>
                        </div>
                      </div>
                      
                      {/* Services Section 
                      <div className="p-4 border rounded-md">
                        <h3 className="font-semibold text-lg mb-3 text-black">Services</h3>
                        <div className="overflow-x-auto">
                          <table className="w-full">
                            <thead>
                              <tr className="text-left border-b">
                                <th className="pb-2 font-medium text-black">Service</th>
                                <th className="pb-2 font-medium text-black">Type</th>
                                <th className="pb-2 font-medium text-black">Status</th>
                                <th className="pb-2 font-medium text-black">Speed</th>
                                <th className="pb-2 font-medium text-black">Actions</th>
                              </tr>
                            </thead>
                            <tbody>
                              {selectedOnt.services.map((service, index) => (
                                <tr key={index} className="border-b">
                                  <td className="py-3 text-black">{service.name}</td>
                                  <td className="py-3 text-black">{service.type}</td>
                                  <td className="py-3">
                                    <Badge className={
                                      service.status === 'active' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                                    }>
                                      {service.status === 'active' ? 'Active' : 'Inactive'}
                                    </Badge>
                                  </td>
                                  <td className="py-3 text-black">{service.speed}</td>
                                  <td className="py-3 text-center">
                                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                      <MoreVertical className="h-4 w-4 text-black" />
                                    </Button>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                        <Button variant="outline" className="text-green-500 mt-4">
                          <Plus className="mr-2 h-4 w-4" />
                          Add Service
                        </Button>
                      </div>
                      */}
                      {/* Diagnostics Section */}
                      <div className="p-4 border rounded-md">
                        <h3 className="font-semibold text-lg mb-3 text-black">Diagnostics and Troubleshooting</h3>
                        <div className="mb-4 flex flex-wrap gap-3">
                          <Button variant="outline" className="text-green-500">
                            Ping Test
                          </Button>
                          <Button variant="outline" className="text-green-500">
                            Trace Route
                          </Button>
                          <Button variant="outline" className="text-green-500">
                            Signal Test
                          </Button>
                          <Button variant="outline" className="text-green-500">
                            Reboot ONT
                          </Button>
                        </div>
                        <div className="text-sm text-black">
                          Last Test: {selectedOnt.diagnostics.lastTest.type} ({selectedOnt.diagnostics.lastTest.date}) • Result: {selectedOnt.diagnostics.lastTest.result}
                        </div>
                      </div>
                      
                      {/* Footer */}
                      <div className="text-center text-sm text-black">
                        © 2025 DOTMAC Network Management System v1.2.1
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </main>
        <AddONTModal 
          isOpen={isAddOntModalOpen}
          onClose={() => setIsAddOntModalOpen(false)}
          onAdd={handleAddOnt}
          supabase={supabase}
        />
      </div>
    </div>
  );
};

export default ONTManagement;