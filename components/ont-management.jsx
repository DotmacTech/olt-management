"use client";

import React, { useState } from 'react';
import AddONTModal from './add-ont-form';
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
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Link from "next/link";

// Mock data for ONTs
const ontDevices = [
  { 
    id: "ONT-2201-ABC", 
    customer: "John Smith",
    oltPort: "OLT-East-01 P1", 
    status: "active" 
  },
  { 
    id: "ONT-2202-DEF", 
    customer: "Sarah Johnson",
    oltPort: "OLT-East-01 P1", 
    status: "active" 
  },
  { 
    id: "ONT-2203-GHI", 
    customer: "Mike Brown",
    oltPort: "OLT-East-01 P2", 
    status: "critical" 
  },
  { 
    id: "ONT-2204-JKL", 
    customer: "Susan Wilson",
    oltPort: "OLT-East-01 P2", 
    status: "warning" 
  },
  { 
    id: "ONT-2205-MNO", 
    customer: "David Taylor",
    oltPort: "OLT-West-05 P1", 
    status: "active" 
  },
  { 
    id: "ONT-2206-PQR", 
    customer: "Emily Davis",
    oltPort: "OLT-West-05 P1", 
    status: "active" 
  },
  { 
    id: "ONT-2207-STU", 
    customer: "Ryan Miller",
    oltPort: "OLT-West-05 P2", 
    status: "inactive" 
  }
];

// Mock data for selected ONT
const ontDetails = {
  id: "ONT-2201-ABC",
  customer: "John Smith",
  oltPort: "OLT-East-01 P1",
  status: "active",
  uptime: "23 days 7 hours",
  lastUpdated: "2 min ago",
  signal: "-18 dBm",
  packetLoss: "0.02%",
  address: "123 Main St, Apt 4B, Cityville",
  device: {
    model: "ONT-G-4220",
    manufacturer: "FiberTech",
    serialNumber: "FT-2201-835271",
    firmware: "v3.5.12",
    macAddress: "12:34:56:78:9A:BC"
  },
  connection: {
    olt: "OLT-East-01",
    oltPort: "Port 1",
    provisionedSpeed: "1 Gbps",
    dataVlan: "510",
    voiceVlan: "610"
  },
  services: [
    { name: "Internet", type: "Residential", status: "active", speed: "1 Gbps" },
    { name: "Voice", type: "VoIP", status: "active", speed: "10 Mbps" },
    { name: "TV", type: "IPTV", status: "inactive", speed: "N/A" }
  ],
  diagnostics: {
    lastTest: {
      type: "Signal Test",
      date: "2023-04-08 14:23",
      result: "-18 dBm (Good)"
    }
  }
};

const ONTManagement = () => {
  const [selectedOnt, setSelectedOnt] = useState(ontDetails);
  const [currentPage, setCurrentPage] = useState(1);
  const [isAddOntModalOpen, setIsAddOntModalOpen] = useState(false);
  const totalItems = 128;
  const itemsPerPage = 7;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handleSelectOnt = (ontId) => {
    // In a real app, you'd fetch the ONT details here
    setSelectedOnt(ontDetails);
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
                placeholder="Search ONTs..."
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
              
              <Button variant="outline" className="bg-white text-black">
                Bulk Actions
              </Button>
            </div>
          </div>
          
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
                        placeholder="Search ONTs..."
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
                  
                  <div className="space-y-3">
                    {ontDevices.map((ont) => (
                      <div 
                        key={ont.id}
                        className={`p-3 border rounded-md cursor-pointer hover:bg-gray-50 flex items-center justify-between ${
                          selectedOnt.id === ont.id ? 'bg-gray-50 border-green-200' : ''
                        }`}
                        onClick={() => handleSelectOnt(ont.id)}
                      >
                        <div>
                          <div className="font-medium text-black">{ont.id}</div>
                          <div className="text-sm text-black">
                            {ont.customer} • {ont.oltPort}
                          </div>
                        </div>
                        <div className="flex items-center">
                          <div className={`
                            h-3 w-3 rounded-full mr-2
                            ${ont.status === 'active' ? 'bg-green-500' : 
                              ont.status === 'warning' ? 'bg-yellow-500' : 
                              ont.status === 'critical' ? 'bg-red-500' : 'bg-gray-400'}
                          `}></div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-center mt-6">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-black">Showing 7 of {totalItems} ONTs</span>
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
                        <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                          2
                        </Button>
                      )}
                      
                      <Button 
                        variant="outline" 
                        size="icon" 
                        disabled={currentPage === totalPages}
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
              <Card className="shadow-sm border-0">
                <CardHeader className="pb-2 flex flex-row items-center justify-between">
                  <CardTitle className="text-black">{selectedOnt.id} Details</CardTitle>
                  <div className="flex space-x-2">
                    <Button className="bg-green-500 hover:bg-green-600 text-white">
                      Edit
                    </Button>
                    <Button variant="outline" className="text-black flex items-center">
                      Actions
                      <ChevronDown className="ml-1 h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {/* Status Section */}
                    <div className="p-4 border rounded-md">
                      <h3 className="font-semibold text-lg mb-3 text-black">Status</h3>
                      <div className="grid grid-cols-2 gap-y-4">
                        <div>
                          <Badge className="bg-green-100 text-green-600 mb-1">Online</Badge>
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
                          <div className="text-sm text-black">Firmware: {selectedOnt.device.firmware}</div>
                          <div className="text-sm text-black">MAC Address: {selectedOnt.device.macAddress}</div>
                          <Button variant="outline" className="text-green-500 mt-2 w-full">
                            Update Firmware
                          </Button>
                        </div>
                      </div>

                      {/* Connection Details */}
                      <div className="p-4 border rounded-md">
                        <h3 className="font-semibold text-lg mb-3 text-black">Connection Details</h3>
                        <div className="space-y-2">
                          <div className="text-sm text-black">OLT: {selectedOnt.connection.olt}</div>
                          <div className="text-sm text-black">OLT Port: {selectedOnt.connection.oltPort}</div>
                          <div className="text-sm text-black">Provisioned Speed: {selectedOnt.connection.provisionedSpeed}</div>
                          <div className="text-sm text-black">Data VLAN: {selectedOnt.connection.dataVlan}</div>
                          <div className="text-sm text-black">Voice VLAN: {selectedOnt.connection.voiceVlan}</div>
                          <Button variant="outline" className="text-green-500 mt-2 w-full">
                            Edit Configuration
                          </Button>
                        </div>
                      </div>
                    </div>
                    
                    {/* Services Section */}
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
                                    <Plus className="h-4 w-4 text-black" />
                                  </Button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                    
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
            </div>
          </div>
        </main>
        <AddONTModal 
          isOpen={isAddOntModalOpen}
          onClose={() => setIsAddOntModalOpen(false)}
          onAdd={(newOnt) => {
            // Handle adding new ONT here
            console.log('New ONT:', newOnt);
          }}
        />
      </div>
    </div>
  );
};

export default ONTManagement;