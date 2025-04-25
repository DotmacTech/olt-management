"use client";

import React, { useState } from 'react';
import { 
  Search, 
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
  ChevronRight,
  X,
  Plus,
  Activity,
  FileText,
  Settings2,
  MoreVertical
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";
import LogoutButton from '@/components/logoutButton';
// Mock data for unconfigured devices
const unconfiguredDevices = [
  {
    ponType: "GPON",
    board: "1",
    port: "1",
    description: "East Zone - Residential",
    serialNumber: "FT-2208-768394",
    type: "ONT-G-4220",
    firstDetected: "2025-04-08 09:23"
  },
  {
    ponType: "GPON",
    board: "1",
    port: "1",
    description: "East Zone - Residential",
    serialNumber: "FT-2208-821765",
    type: "ONT-G-4220",
    firstDetected: "2025-04-08 10:15"
  },
  {
    ponType: "GPON",
    board: "1",
    port: "2",
    description: "East Zone - Commercial",
    serialNumber: "FT-2209-132487",
    type: "ONT-B-4320",
    firstDetected: "2025-04-08 11:42"
  },
  {
    ponType: "GPON",
    board: "1",
    port: "2",
    description: "East Zone - Commercial",
    serialNumber: "FT-2209-193876",
    type: "ONT-B-4320",
    firstDetected: "2025-04-08 13:18"
  },
  {
    ponType: "GPON",
    board: "2",
    port: "1",
    description: "West Zone - Residential",
    serialNumber: "FT-2210-546982",
    type: "ONT-G-4220",
    firstDetected: "2025-04-08 14:29"
  },
  {
    ponType: "GPON",
    board: "2",
    port: "1",
    description: "West Zone - Residential",
    serialNumber: "FT-2210-651843",
    type: "ONT-G-4220",
    firstDetected: "2025-04-08 15:44"
  },
  {
    ponType: "GPON",
    board: "2",
    port: "2",
    description: "West Zone - Commercial",
    serialNumber: "FT-2211-287346",
    type: "ONT-B-4320",
    firstDetected: "2025-04-08 16:37"
  },
  {
    ponType: "GPON",
    board: "3",
    port: "1",
    description: "North Zone - Residential",
    serialNumber: "FT-2212-490815",
    type: "ONT-G-4220",
    firstDetected: "2025-04-09 08:21"
  },
  {
    ponType: "GPON",
    board: "3",
    port: "1",
    description: "North Zone - Residential",
    serialNumber: "FT-2212-518723",
    type: "ONT-G-4220",
    firstDetected: "2025-04-09 09:05"
  },
  {
    ponType: "EPON",
    board: "3",
    port: "2",
    description: "North Zone - Enterprise",
    serialNumber: "FT-2213-619425",
    type: "ONT-E-5500",
    firstDetected: "2025-04-09 10:42"
  },
  {
    ponType: "EPON",
    board: "3",
    port: "2",
    description: "North Zone - Enterprise",
    serialNumber: "FT-2213-751824",
    type: "ONT-E-5500",
    firstDetected: "2025-04-09 11:18"
  }
];

const UnconfiguredDevices = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPonType, setSelectedPonType] = useState('All Types');
  const [selectedOLT, setSelectedOLT] = useState('All OLTs');
  const [showConfigModal, setShowConfigModal] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState(null);
  const totalItems = 23;
  const itemsPerPage = 11;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handleConfigureClick = (device) => {
    setSelectedDevice(device);
    setShowConfigModal(true);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-gradient-to-b from-green-800 to-green-950 text-white flex flex-col hidden md:flex">
        <div className="p-4 flex items-center space-x-2 border-b border-green-700">
          <div className="bg-green-500 rounded-full p-2">
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
              className="w-full justify-start bg-green-700 text-white hover:bg-green-600 hover:text-white px-4 py-2 rounded-lg mb-1"
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
            <Avatar className="h-10 w-10 bg-green-500">
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
                placeholder="Search by serial number..."
                className="w-full pl-8 pr-4 py-2 rounded-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500"
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
        
        {/* Main Unconfigured Devices Content */}
        <main className="flex-1 overflow-y-auto p-6 bg-gray-100 relative">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-black">Unconfigured Devices</h1>
              <p className="text-black">Manage and provision new devices detected on the network</p>
            </div>
            <div className="flex items-center space-x-3">
              <Button className="bg-green-500 hover:bg-green-600 text-white">
                Batch Configure
              </Button>
              <Button variant="outline" className="bg-white text-black">
                Refresh
              </Button>
            </div>
          </div>
          
          {/* Filters */}
          <div className="bg-white rounded-md p-4 mb-6">
            <div className="flex flex-wrap gap-4 items-center">
              <div className="relative flex-grow max-w-md">
                <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="search"
                  placeholder="Search by SN or description..."
                  className="w-full pl-8 pr-4 py-2 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 text-black"
                />
              </div>
              
              <div className="flex items-center">
                <span className="text-black mr-2">PON Type:</span>
                <Button variant="outline" className="flex items-center justify-between min-w-[150px]">
                  <span>{selectedPonType}</span>
                  <ChevronRight className="h-4 w-4 ml-2 opacity-50" />
                </Button>
              </div>
              
              <div className="flex items-center">
                <span className="text-black mr-2">OLT:</span>
                <Button variant="outline" className="flex items-center justify-between min-w-[150px]">
                  <span>{selectedOLT}</span>
                  <ChevronRight className="h-4 w-4 ml-2 opacity-50" />
                </Button>
              </div>
              
              <div className="ml-auto flex items-center gap-2">
                <Button variant="outline" className="text-green-600">
                  Reset
                </Button>
                <Button variant="outline" className="text-green-600">
                  Advanced Options
                </Button>
              </div>
            </div>
          </div>
          
          {/* Devices Table */}
          <div className="bg-white rounded-md shadow-sm overflow-hidden mb-4">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      PON TYPE
                    </th>
                    <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      BOARD
                    </th>
                    <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      PORT
                    </th>
                    <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      PON DESCRIPTION
                    </th>
                    <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      SERIAL NUMBER
                    </th>
                    <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      TYPE
                    </th>
                    <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      FIRST DETECTED
                    </th>
                    <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      ACTIONS
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {unconfiguredDevices.map((device, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-3 py-3 whitespace-nowrap text-black">
                        {device.ponType}
                      </td>
                      <td className="px-3 py-3 whitespace-nowrap text-black">
                        {device.board}
                      </td>
                      <td className="px-3 py-3 whitespace-nowrap text-black">
                        {device.port}
                      </td>
                      <td className="px-3 py-3 whitespace-nowrap text-black">
                        {device.description}
                      </td>
                      <td className="px-3 py-3 whitespace-nowrap text-black">
                        {device.serialNumber}
                      </td>
                      <td className="px-3 py-3 whitespace-nowrap text-black">
                        {device.type}
                      </td>
                      <td className="px-3 py-3 whitespace-nowrap text-black">
                        {device.firstDetected}
                      </td>
                      <td className="px-3 py-3 whitespace-nowrap">
                        <Button 
                          className="bg-green-500 hover:bg-green-600 text-white" 
                          size="sm"
                          onClick={() => handleConfigureClick(device)}
                        >
                          Configure
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          
          {/* Pagination */}
          <div className="flex items-center justify-between px-4 py-3 bg-white border-t border-gray-200 rounded-b-md">
            <div className="flex-1 flex justify-between sm:hidden">
              <Button variant="outline" size="sm">Previous</Button>
              <Button variant="outline" size="sm">Next</Button>
            </div>
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  Showing <span className="font-medium">1-11</span> of <span className="font-medium">23</span> unconfigured devices
                </p>
              </div>
              <div>
                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  >
                    <span className="sr-only">Previous</span>
                    &lt;
                  </Button>
                  
                  <Button 
                    variant={currentPage === 1 ? 'default' : 'outline'} 
                    size="sm" 
                    className={`relative inline-flex items-center px-4 py-2 border ${
                      currentPage === 1 
                        ? 'bg-green-500 text-white border-green-500' 
                        : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
                    }`}
                    onClick={() => setCurrentPage(1)}
                  >
                    1
                  </Button>
                  
                  <Button 
                    variant={currentPage === 2 ? 'default' : 'outline'} 
                    size="sm" 
                    className={`relative inline-flex items-center px-4 py-2 border ${
                      currentPage === 2 
                        ? 'bg-green-500 text-white border-green-500' 
                        : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
                    }`}
                    onClick={() => setCurrentPage(2)}
                  >
                    2
                  </Button>
                  
                  <Button 
                    variant={currentPage === 3 ? 'default' : 'outline'} 
                    size="sm" 
                    className={`relative inline-flex items-center px-4 py-2 border ${
                      currentPage === 3 
                        ? 'bg-green-500 text-white border-green-500' 
                        : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
                    }`}
                    onClick={() => setCurrentPage(3)}
                  >
                    3
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  >
                    <span className="sr-only">Next</span>
                    &gt;
                  </Button>
                </nav>
              </div>
            </div>
          </div>
          
          <div className="text-center text-sm text-black mt-4">
            © 2025 DOTMAC Network Management System v1.2.1
          </div>
          
          {/* Configuration Modal */}
          {showConfigModal && selectedDevice && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl overflow-hidden">
                <div className="flex justify-between items-center px-6 py-4 border-b">
                  <h3 className="text-xl font-bold text-black">Configure New Device</h3>
                  <Button variant="ghost" size="sm" onClick={() => setShowConfigModal(false)}>
                    <X className="h-5 w-5" />
                  </Button>
                </div>
                
                <div className="p-6">
                  <div className="mb-6">
                    <h4 className="text-lg font-semibold text-black mb-4">Device Information</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">PON Type:</label>
                        <Input value={selectedDevice.ponType} readOnly className="bg-gray-50" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Board/Port:</label>
                        <Input value={`${selectedDevice.board}/${selectedDevice.port}`} readOnly className="bg-gray-50" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Serial Number:</label>
                        <Input value={selectedDevice.serialNumber} readOnly className="bg-gray-50" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Device Type:</label>
                        <Input value={selectedDevice.type} readOnly className="bg-gray-50" />
                      </div>
                      <div className="col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Description:</label>
                        <Input value={selectedDevice.description} readOnly className="bg-gray-50" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <h4 className="text-lg font-semibold text-black mb-4">Customer Assignment</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Customer:</label>
                        <Input placeholder="Select customer or enter new name..." />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Location:</label>
                        <Input placeholder="Select location..." />
                      </div>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <h4 className="text-lg font-semibold text-black mb-4">Service Configuration</h4>
                    <div className="grid grid-cols-3 gap-4 mb-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Bandwidth Profile:</label>
                        <Button variant="outline" className="w-full justify-between text-left">
                          <span>Residential 50/25</span>
                          <ChevronRight className="h-4 w-4 ml-2 opacity-50" />
                        </Button>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">VLAN:</label>
                        <Input value="510" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">ODB:</label>
                        <Input value="ODB-312" />
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Services:</label>
                      <div className="flex space-x-6">
                        <div className="flex items-center space-x-2">
                          <Checkbox id="internet" defaultChecked />
                          <label htmlFor="internet" className="text-sm text-gray-700">Internet</label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="voice" defaultChecked />
                          <label htmlFor="voice" className="text-sm text-gray-700">Voice (VoIP)</label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="tv" />
                          <label htmlFor="tv" className="text-sm text-gray-700">TV (IPTV)</label>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Notes:</label>
                      <Textarea placeholder="Additional configuration notes..." className="min-h-[100px]" />
                    </div>
                  </div>
                  
                  <div className="flex justify-end space-x-3">
                    <Button variant="outline" onClick={() => setShowConfigModal(false)}>
                      Cancel
                    </Button>
                    <Button className="bg-green-500 hover:bg-green-600 text-white">
                      Confirm
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default UnconfiguredDevices;