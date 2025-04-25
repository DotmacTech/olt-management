"use client";

import React, { useState, useEffect } from 'react';
import AddOLTModal from './add-olt-form';
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
  LogOut, 
  Activity,
  AlertCircle,
  FileText,
  Settings2,
  MoreVertical
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
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Link from "next/link";

import { getOlts } from '../scripts/supabase-olt';

// Remove mock data. Live data will be loaded via Supabase.

const OLTManagement = () => {
  const [oltDevices, setOltDevices] = useState([]);
  const [selectedOlt, setSelectedOlt] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isAddOltModalOpen, setIsAddOltModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const itemsPerPage = 7;
  const totalPages = Math.ceil(oltDevices.length / itemsPerPage);

  useEffect(() => {
    async function fetchOlts() {
      setLoading(true);
      setError(null);
      try {
        const data = await getOlts();
        setOltDevices(data || []);
        if (data && data.length > 0) {
          setSelectedOlt(data[0]);
        }
      } catch (err) {
        console.error('Error loading OLTs:', err);
        setError('Failed to load OLTs.' + (err && err.message ? ` (${err.message})` : ''));
      } finally {
        setLoading(false);
      }
    }
    fetchOlts();
  }, []);

  const handleSelectOlt = (oltId) => {
    const found = oltDevices.find((olt) => olt.id === oltId);
    setSelectedOlt(found || null);
  };

  const handleAddOlt = async (newOlt) => {
    // Implement add OLT function using Supabase
    // You may want to call a Supabase addOlt() here and then reload the list
    // For now, just reload the OLTs
    setLoading(true);
    setError(null);
    try {
      // await addOlt(newOlt); // Uncomment when addOlt is implemented
      const data = await getOlts();
      setOltDevices(data || []);
      if (data && data.length > 0) {
        setSelectedOlt(data[0]);
      }
    } catch (err) {
      setError('Failed to add OLT.');
    } finally {
      setLoading(false);
    }
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
              className="w-full justify-start bg-green-700 text-white hover:bg-green-600 hover:text-white px-4 py-2 rounded-lg mb-1"
              asChild
            >
              <Link href="/olt-management">
                <CheckCircle className="mr-2 h-5 w-5" />
                OLT Management
              </Link>
            </Button>
            
            <Button 
              variant="ghost" 
              className="w-full justify-start text-white hover:bg-green-700 hover:text-white px-4 py-2 rounded-lg mb-1"
              asChild
            >
              <Link href="/ont-management">
                <Network className="mr-2 h-5 w-5" />
                ONT Management
              </Link>
            </Button>
            
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
          <Button variant="ghost" className="w-full justify-start text-white hover:bg-green-700 hover:text-white px-4 py-2 rounded-lg">
            <LogOut className="mr-2 h-5 w-5" />
            Log Out
          </Button>
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
                placeholder="Search OLTs..."
                className="w-full pl-8 pr-4 py-2 rounded-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500 text-black"
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
        
        {/* Main OLT Management Content */}
        <main className="flex-1 overflow-y-auto p-6 bg-gray-100">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold  text-black">OLT Management</h1>
              <p className="text-black">Manage and monitor your Optical Line Terminals</p>
            </div>
            <div className="flex items-center space-x-3">
              <Button 
                className="bg-green-500 hover:bg-green-600 text-white flex items-center"
                onClick={() => setIsAddOltModalOpen(true)}
              >
                <Plus className="mr-2 h-4 w-4" />
                Add New OLT
              </Button>
              
              {/*<Button variant="outline" className="bg-white text-black">
                Bulk Actions
              </Button>*/}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {/* OLT List Panel */}
            <div className="md:col-span-2">
              <Card className="shadow-sm border-0">
                <CardHeader className="pb-2">
                  <CardTitle className="text-black">OLT Devices</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between mb-4">
                    <div className="relative w-full max-w-xs">
                      <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-black" />
                      <Input
                        type="search"
                        placeholder="Search OLTs..."
                        className="w-full pl-8 pr-4 py-2 rounded-md"
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
                  
                  {loading ? (
                    <div className="text-center text-black py-8">Loading OLTs...</div>
                  ) : error ? (
                    <div className="text-center text-red-500 py-8">{error}</div>
                  ) : (
                    <div className="space-y-3 ">
                      {oltDevices.slice((currentPage-1)*itemsPerPage, currentPage*itemsPerPage).map((olt) => (
                        <div 
                          key={olt.id}
                          className={`p-3 border rounded-md cursor-pointer hover:bg-gray-50 flex items-center justify-between ${
                            selectedOlt && selectedOlt.id === olt.id ? 'bg-gray-50 border-green-200' : ''
                          }`}
                          onClick={() => handleSelectOlt(olt.id)}
                        >
                          <div>
                            <div className="font-medium text-black">{olt.name || olt.id}</div>
                            <div className="text-sm text-black">
                              IP: {olt.ipaddress || olt.ip}
                            </div>
                          </div>
                          <div className="flex items-center">
                            <div className={`
                              h-3 w-3 rounded-full mr-2
                              ${olt.status === 'active' ? 'bg-green-500' : 
                                olt.status === 'warning' ? 'bg-yellow-500' : 
                                olt.status === 'critical' ? 'bg-red-500' : 'bg-gray-400'}
                            `}></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  <div className="flex items-center justify-center mt-6">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-black">Showing 7 of {oltDevices.length} OLTs</span>
                      <Button 
                        variant="outline" 
                        size="icon" 
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </Button>
                      
                      <Button variant="default" size="sm" className="bg-green-500 hover:bg-green-600 h-8 w-8 p-0">
                        1
                      </Button>
                      
                      {totalPages > 1 && (
                        <Button variant="outline" size="sm" className="h-8 w-8 p-0  text-black">
                          2
                        </Button>
                      )}
                      
                      <Button 
                        variant="outline" 
                        size="icon" 
                        disabled={currentPage === totalPages}
                        onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                      >
                        <ChevronRight className="h-4 w-4  text-black" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* OLT Details Panel */}
            <div className="md:col-span-3">
              <Card className="shadow-sm border-0">
                <CardHeader className="pb-2 flex flex-row items-center justify-between">
                  <CardTitle className="text-black">{selectedOlt ? (selectedOlt.name || selectedOlt.id) : 'No OLT Selected'} Details</CardTitle>
                  <div className="flex space-x-2">
                   {/* <Button className="bg-green-500 hover:bg-green-600 text-white" disabled={!selectedOlt}>
                      Edit
                    </Button>
                    <Button variant="outline" className="text-black flex items-center" disabled={!selectedOlt}>
                      Actions
                      <ChevronDown className="ml-1 h-4 w-4" />
                    </Button>*/ }
                  </div>
                </CardHeader>
                <CardContent>
                  {loading ? (
                    <div className="text-center text-black py-8">Loading OLT details...</div>
                  ) : error ? (
                    <div className="text-center text-red-500 py-8">{error}</div>
                  ) : selectedOlt ? (
                    <div className="space-y-6">
                      {/* Status Section */}
                      <div className="p-4 border rounded-md">
                        <h3 className="font-semibold text-lg mb-3 text-black">Status</h3>
                        <div className="space-y-4">
                          <div className="grid grid-cols-2 gap-y-2">
                            <div className="font-medium text-black">OLT ID:</div>
                            <div className="text-black">{selectedOlt.id}</div>
                            <div className="font-medium text-black">Name:</div>
                            <div className="text-black">{selectedOlt.name}</div>
                            <div className="font-medium text-black">Status:</div>
                            <div><Badge className="bg-green-100 text-green-600 mb-1">{selectedOlt.status}</Badge></div>
                            <div className="font-medium text-black">IP Address:</div>
                            <div className="text-black">{selectedOlt.ipaddress || selectedOlt.ip}</div>
                            {selectedOlt.username && (<><div className="font-medium text-black">Username:</div><div className="text-black">{selectedOlt.username}</div></>)}
                            {selectedOlt.dataCenter && (<><div className="font-medium text-black">Data Center:</div><div className="text-black">{selectedOlt.dataCenter}</div></>)}
                            {selectedOlt.location && (<><div className="font-medium text-black">Location:</div><div className="text-black">{selectedOlt.location}</div></>)}
                            {/* Device Model Info from joined DeviceModel table */}
                            {selectedOlt.DeviceModel && selectedOlt.DeviceModel.length > 0 && (
                              <>
                                <div className="font-medium text-black">Device Model:</div>
                                <div className="text-black">
                                  <div><span className="font-semibold">{selectedOlt.DeviceModel[0].vendor}</span> {selectedOlt.DeviceModel[0].name}</div>
                                  {selectedOlt.DeviceModel[0].capabilities && (
                                    <div className="text-xs text-gray-600 mt-1">Capabilities: {selectedOlt.DeviceModel[0].capabilities}</div>
                                  )}
                                </div>
                              </>
                            )}
                            {selectedOlt.model && (<><div className="font-medium text-black">Model:</div><div className="text-black">{selectedOlt.model}</div></>)}
                            {selectedOlt.manufacturer && (<><div className="font-medium text-black">Manufacturer:</div><div className="text-black">{selectedOlt.manufacturer}</div></>)}
                            {selectedOlt.serialNumber && (<><div className="font-medium text-black">Serial Number:</div><div className="text-black">{selectedOlt.serialNumber}</div></>)}
                            {selectedOlt.firmware && (<><div className="font-medium text-black">Firmware:</div><div className="text-black">{selectedOlt.firmware}</div></>)}
                            {selectedOlt.macAddress && (<><div className="font-medium text-black">MAC Address:</div><div className="text-black">{selectedOlt.macAddress}</div></>)}
                            {selectedOlt.managementVlan && (<><div className="font-medium text-black">Management VLAN:</div><div className="text-black">{selectedOlt.managementVlan}</div></>)}
                            {selectedOlt.dataVlanRange && (<><div className="font-medium text-black">Data VLAN Range:</div><div className="text-black">{selectedOlt.dataVlanRange}</div></>)}
                            {selectedOlt.voiceVlanRange && (<><div className="font-medium text-black">Voice VLAN Range:</div><div className="text-black">{selectedOlt.voiceVlanRange}</div></>)}
                            {selectedOlt.videoVlanRange && (<><div className="font-medium text-black">Video VLAN Range:</div><div className="text-black">{selectedOlt.videoVlanRange}</div></>)}
                            {selectedOlt.routingProtocol && (<><div className="font-medium text-black">Routing Protocol:</div><div className="text-black">{selectedOlt.routingProtocol}</div></>)}
                            {selectedOlt.portCount && (<><div className="font-medium text-black">Port Count:</div><div className="text-black">{selectedOlt.portCount}</div></>)}
                          </div>
                        </div>
                      </div>
                      {/* You can add more sections here as needed, depending on your DB schema */}
                      <div className="text-center text-sm text-black">
                        © 2025 DOTMAC Network Management System v1.2.1
                      </div>
                    </div>
                  ) : (
                    <div className="text-center text-black py-8">Select an OLT to view details.</div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </main>

        <AddOLTModal 
          isOpen={isAddOltModalOpen}
          onClose={() => setIsAddOltModalOpen(false)}
          onAdd={handleAddOlt}
        />
      </div>
    </div>
  );
};

export default OLTManagement;