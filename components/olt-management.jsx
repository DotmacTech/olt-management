"use client";

import React, { useState } from 'react';
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

// Mock data for OLTs
const oltDevices = [
  { 
    id: "OLT-East-01", 
    dataCenter: "Data Center 1", 
    ip: "192.168.1.10", 
    status: "active" 
  },
  { 
    id: "OLT-West-05", 
    dataCenter: "Data Center 2", 
    ip: "192.168.2.15", 
    status: "active" 
  },
  { 
    id: "OLT-North-03", 
    dataCenter: "Data Center 1", 
    ip: "192.168.1.12", 
    status: "critical" 
  },
  { 
    id: "OLT-South-07", 
    dataCenter: "Data Center 3", 
    ip: "192.168.3.11", 
    status: "warning" 
  },
  { 
    id: "OLT-East-02", 
    dataCenter: "Data Center 1", 
    ip: "192.168.1.11", 
    status: "active" 
  },
  { 
    id: "OLT-West-11", 
    dataCenter: "Data Center 2", 
    ip: "192.168.2.21", 
    status: "active" 
  },
  { 
    id: "OLT-South-15", 
    dataCenter: "Data Center 3", 
    ip: "192.168.3.17", 
    status: "inactive" 
  }
];

// Mock data for OLT details
const oltDetails = {
  id: "OLT-East-01",
  status: "active",
  uptime: "45 days 12 hours",
  lastUpdated: "3 min ago",
  ipAddress: "192.168.1.10",
  cpuLoad: "45%",
  location: "Data Center 1, Rack B12, Unit 5-8",
  memory: "32%",
  system: {
    model: "GPON-8800",
    manufacturer: "CiscoFi",
    serialNumber: "CFI-8800-E1-763254",
    firmware: "v4.2.17",
    macAddress: "00:1A:2B:3C:4D:5E"
  },
  network: {
    managementVlan: "100",
    dataVlanRange: "500-599",
    voiceVlanRange: "600-699",
    videoVlanRange: "700-799",
    routingProtocol: "OSPF"
  },
  ports: [
    { id: 1, type: "GPON", status: "up", onts: "32/64", bandwidth: 75 },
    { id: 2, type: "GPON", status: "up", onts: "48/64", bandwidth: 85 },
    { id: 3, type: "GPON", status: "down", onts: "0/64", bandwidth: 0 }
  ],
  recentAlerts: [
    { message: "Port 3 connection failure", time: "10 min ago", severity: "critical" },
    { message: "CPU load spike detected (78%)", time: "3 hrs ago", severity: "warning" }
  ]
};

const OLTManagement = () => {
  const [selectedOlt, setSelectedOlt] = useState(oltDetails);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(oltDevices.length / 7);

  const handleSelectOlt = (oltId) => {
    // In a real app, you'd fetch the OLT details here
    setSelectedOlt(oltDetails);
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
              <Button variant="ghost" size="icon">
                <Settings className="h-5 w-5 text-black" />
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
              <Button className="bg-green-500 hover:bg-green-600 text-white flex items-center">
                <Plus className="mr-2 h-4 w-4" />
                Add New OLT
              </Button>
              
              <Button variant="outline" className="bg-white text-black">
                Bulk Actions
              </Button>
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
                  
                  <div className="space-y-3 ">
                    {oltDevices.slice(0, 7).map((olt) => (
                      <div 
                        key={olt.id}
                        className={`p-3 border rounded-md cursor-pointer hover:bg-gray-50 flex items-center justify-between ${
                          selectedOlt.id === olt.id ? 'bg-gray-50 border-green-200' : ''
                        }`}
                        onClick={() => handleSelectOlt(olt.id)}
                      >
                        <div>
                          <div className="font-medium text-black">{olt.id}</div>
                          <div className="text-sm text-black">
                            {olt.dataCenter} • IP: {olt.ip}
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
                  <CardTitle className="text-black">{selectedOlt.id} Details</CardTitle>
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
                          <Badge className="bg-green-100 text-green-600 mb-1">Active</Badge>
                          <div className="text-sm text-black">Uptime: {selectedOlt.uptime}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm text-black">Last Updated: {selectedOlt.lastUpdated}</div>
                        </div>
                        <div>
                          <div className="text-sm text-black">IP Address: {selectedOlt.ipAddress}</div>
                          <div className="text-sm text-black">Location: {selectedOlt.location}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm text-black">CPU Load: {selectedOlt.cpuLoad}</div>
                          <div className="text-sm text-black">Memory: {selectedOlt.memory}</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* System Information */}
                      <div className="p-4 border rounded-md">
                        <h3 className="font-semibold text-lg mb-3 text-black">System Information</h3>
                        <div className="space-y-2">
                          <div className="text-sm text-black">Model: {selectedOlt.system.model}</div>
                          <div className="text-sm text-black">Manufacturer: {selectedOlt.system.manufacturer}</div>
                          <div className="text-sm text-black">Serial Number: {selectedOlt.system.serialNumber}</div>
                          <div className="text-sm text-black">Firmware: {selectedOlt.system.firmware}</div>
                          <div className="text-sm text-black">MAC Address: {selectedOlt.system.macAddress}</div>
                          <Button variant="outline" className="text-green-500 mt-2 w-full">
                            Update Firmware
                          </Button>
                        </div>
                      </div>

                      {/* Network Configuration */}
                      <div className="p-4 border rounded-md">
                        <h3 className="font-semibold text-lg mb-3 text-black">Network Configuration</h3>
                        <div className="space-y-2">
                          <div className="text-sm text-black">Management VLAN: {selectedOlt.network.managementVlan}</div>
                          <div className="text-sm text-black">Data VLAN Range: {selectedOlt.network.dataVlanRange}</div>
                          <div className="text-sm text-black">Voice VLAN Range: {selectedOlt.network.voiceVlanRange}</div>
                          <div className="text-sm text-black">Video VLAN Range: {selectedOlt.network.videoVlanRange}</div>
                          <div className="text-sm text-black">Routing Protocol: {selectedOlt.network.routingProtocol}</div>
                          <Button variant="outline" className="text-green-500 mt-2 w-full">
                            Edit Configuration
                          </Button>
                        </div>
                      </div>
                    </div>
                    
                    {/* Ports Overview */}
                    <div className="p-4 border rounded-md">
                      <h3 className="font-semibold text-lg mb-3 text-black">Ports Overview</h3>
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead>
                            <tr className="text-left border-b">
                              <th className="pb-2 font-medium text-black">Port</th>
                              <th className="pb-2 font-medium text-black">Type</th>
                              <th className="pb-2 font-medium text-black">Status</th>
                              <th className="pb-2 font-medium text-black">ONTs</th>
                              <th className="pb-2 font-medium text-black">Bandwidth</th>
                              <th className="pb-2 font-medium text-black">Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {selectedOlt.ports.map((port) => (
                              <tr key={port.id} className="border-b">
                                <td className="py-3 text-black">Port {port.id}</td>
                                <td className="py-3 text-black">{port.type}</td>
                                <td className="py-3">
                                  <Badge className={
                                    port.status === 'up' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                                  }>
                                    {port.status === 'up' ? 'Up' : 'Down'}
                                  </Badge>
                                </td>
                                <td className="py-3 text-black">{port.onts}</td>
                                <td className="py-3">
                                  <div className="flex items-center">
                                    <Progress
                                      value={port.bandwidth}
                                      className="h-2 w-24 mr-2"
                                      indicatorClassName={`
                                        ${port.bandwidth > 85 ? 'bg-red-500' :
                                          port.bandwidth > 70 ? 'bg-yellow-500' :
                                            port.bandwidth > 0 ? 'bg-green-600' : 'bg-gray-200'}
                                      `}
                                    />
                                  </div>
                                </td>
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
                    
                    {/* Recent Alerts and Events */}
                    <div className="p-4 border rounded-md">
                      <h3 className="font-semibold text-lg mb-3 text-black">Recent Alerts and Events</h3>
                      <div className="space-y-3">
                        {selectedOlt.recentAlerts.map((alert, index) => (
                          <div key={index} className="flex items-center">
                            <div className={`
                              h-3 w-3 rounded-full mr-3
                              ${alert.severity === 'critical' ? 'bg-red-500' : 
                                alert.severity === 'warning' ? 'bg-yellow-500' : 'bg-blue-500'}
                            `}></div>
                            <div className="flex-1 text-black">
                              {alert.message}
                            </div>
                            <div className="text-sm text-black">
                              {alert.time}
                            </div>
                          </div>
                        ))}
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
      </div>
    </div>
  );
};

export default OLTManagement;