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
  InfoIcon,
  BarChart2,
  MoreHorizontal,
  Eye,
  Activity,
  Plus,
  FileText,
  Settings2,
  MoreVertical
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import LogoutButton from '@/components/logoutButton';
// Mock data for configured devices
const configuredDevices = [
  {
    name: "Smith-Residence",
    sn_mac: "00:1A:2B:3C:4D:5E",
    onu: "East Zone",
    zone: "East Zone",
    odb: "ODB-122",
    signal: "-15.2 dBm",
    br: "50/25",
    vlan: "510",
    voip: true,
    tv: true,
    type: "GPON",
    authDate: "2024-12-15",
    status: "active"
  },
  {
    name: "Johnson-Home",
    sn_mac: "00:2C:3D:4E:5F:6G",
    onu: "East Zone",
    zone: "East Zone",
    odb: "ODB-124",
    signal: "-16.8 dBm",
    br: "100/50",
    vlan: "510",
    voip: true,
    tv: false,
    type: "GPON",
    authDate: "2024-12-18",
    status: "active"
  },
  {
    name: "Brown-Apartment",
    sn_mac: "00:3D:4E:5F:6G:7H",
    onu: "East Zone",
    zone: "East Zone",
    odb: "ODB-156",
    signal: "-26.3 dBm",
    br: "25/10",
    vlan: "510",
    voip: true,
    tv: false,
    type: "GPON",
    authDate: "2025-01-05",
    status: "critical"
  },
  {
    name: "Wilson-Residence",
    sn_mac: "00:4E:5F:6G:7H:8I",
    onu: "East Zone",
    zone: "East Zone",
    odb: "ODB-158",
    signal: "-23.1 dBm",
    br: "50/25",
    vlan: "510",
    voip: true,
    tv: false,
    type: "GPON",
    authDate: "2025-01-10",
    status: "warning"
  },
  {
    name: "Taylor-House",
    sn_mac: "00:5F:6G:7H:8I:9J",
    onu: "West Zone",
    zone: "West Zone",
    odb: "ODB-212",
    signal: "-14.6 dBm",
    br: "100/50",
    vlan: "520",
    voip: true,
    tv: true,
    type: "GPON",
    authDate: "2025-01-15",
    status: "active"
  },
  {
    name: "Davis-Apartment",
    sn_mac: "00:6G:7H:8I:9J:0K",
    onu: "West Zone",
    zone: "West Zone",
    odb: "ODB-214",
    signal: "-15.8 dBm",
    br: "50/25",
    vlan: "520",
    voip: true,
    tv: false,
    type: "GPON",
    authDate: "2025-01-22",
    status: "active"
  },
  {
    name: "Miller-House",
    sn_mac: "00:7H:8I:9J:0K:1L",
    onu: "West Zone",
    zone: "West Zone",
    odb: "ODB-236",
    signal: "N/A",
    br: "25/10",
    vlan: "520",
    voip: false,
    tv: false,
    type: "GPON",
    authDate: "2025-02-01",
    status: "inactive"
  },
  {
    name: "Anderson-Office",
    sn_mac: "00:8I:9J:0K:1L:2M",
    onu: "North Zone",
    zone: "North Zone",
    odb: "ODB-315",
    signal: "-14.2 dBm",
    br: "200/100",
    vlan: "530",
    voip: true,
    tv: true,
    type: "GPON",
    authDate: "2025-02-10",
    status: "active"
  },
  {
    name: "Clark-Building",
    sn_mac: "00:9J:0K:1L:2M:3N",
    onu: "North Zone",
    zone: "North Zone",
    odb: "ODB-318",
    signal: "-16.4 dBm",
    br: "500/200",
    vlan: "530",
    voip: true,
    tv: true,
    type: "GPON",
    authDate: "2025-02-15",
    status: "active"
  },
  {
    name: "Lewis-Shop",
    sn_mac: "00:0K:1L:2M:3N:4O",
    onu: "North Zone",
    zone: "North Zone",
    odb: "ODB-342",
    signal: "-22.5 dBm",
    br: "100/50",
    vlan: "530",
    voip: true,
    tv: false,
    type: "GPON",
    authDate: "2025-03-01",
    status: "warning"
  }
];

const ConfiguredDevices = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedStatus, setSelectedStatus] = useState('All Statuses');
  const [selectedZone, setSelectedZone] = useState('All Zones');
  const totalItems = 128;
  const itemsPerPage = 10;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const getStatusColor = (status) => {
    switch(status) {
      case 'active':
        return 'bg-green-500';
      case 'warning':
        return 'bg-yellow-500';
      case 'critical':
        return 'bg-red-500';
      case 'inactive':
        return 'bg-gray-400';
      default:
        return 'bg-gray-400';
    }
  };

  const getSignalColor = (signal) => {
    if (signal === 'N/A') return 'text-gray-500';
    
    const value = parseFloat(signal);
    if (value > -15) return 'text-green-600';
    if (value > -20) return 'text-green-600';
    if (value > -25) return 'text-yellow-600';
    return 'text-red-600';
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
              className="w-full justify-start bg-green-700 text-white hover:bg-green-600 hover:text-white px-4 py-2 rounded-lg mb-1"
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
                placeholder="Search devices..."
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
        
        {/* Main Configured Devices Content */}
        <main className="flex-1 overflow-y-auto p-6 bg-gray-100">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-black">Configured Devices</h1>
              <p className="text-black">View and manage all provisioned network devices</p>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" className="bg-green-500 hover:bg-green-600 text-white">
                Export
              </Button>
            </div>
          </div>
          
          {/* Tabs */}
          <div className="bg-white rounded-md p-3 mb-6 flex space-x-2">
            <Button 
              variant={activeTab === 'all' ? 'default' : 'ghost'} 
              className={activeTab === 'all' ? 'bg-green-500 text-white' : 'bg-white text-black'}
              onClick={() => setActiveTab('all')}
            >
              All
            </Button>
            <Button 
              variant={activeTab === 'olts' ? 'default' : 'ghost'} 
              className={activeTab === 'olts' ? 'bg-green-500 text-white' : 'bg-white text-black'}
              onClick={() => setActiveTab('olts')}
            >
              OLTs
            </Button>
            <Button 
              variant={activeTab === 'onts' ? 'default' : 'ghost'} 
              className={activeTab === 'onts' ? 'bg-green-500 text-white' : 'bg-white text-black'}
              onClick={() => setActiveTab('onts')}
            >
              ONTs
            </Button>
            <Button 
              variant={activeTab === 'switches' ? 'default' : 'ghost'} 
              className={activeTab === 'switches' ? 'bg-green-500 text-white' : 'bg-white text-black'}
              onClick={() => setActiveTab('switches')}
            >
              Switches
            </Button>
            <Button 
              variant={activeTab === 'routers' ? 'default' : 'ghost'} 
              className={activeTab === 'routers' ? 'bg-green-500 text-white' : 'bg-white text-black'}
              onClick={() => setActiveTab('routers')}
            >
              Routers
            </Button>
          </div>
          
          {/* Filters */}
          <div className="bg-white rounded-md p-4 mb-6">
            <div className="flex flex-wrap gap-4 items-center">
              <div className="relative flex-grow max-w-md">
                <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="search"
                  placeholder="Search by name, SN/MAC..."
                  className="w-full pl-8 pr-4 py-2 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              
              <div className="flex items-center">
                <span className="text-black mr-2">Status:</span>
                <Button variant="outline" className="flex items-center justify-between min-w-[150px]">
                  <span>{selectedStatus}</span>
                  <ChevronRight className="h-4 w-4 ml-2 opacity-50" />
                </Button>
              </div>
              
              <div className="flex items-center">
                <span className="text-black mr-2">Zone:</span>
                <Button variant="outline" className="flex items-center justify-between min-w-[150px]">
                  <span>{selectedZone}</span>
                  <ChevronRight className="h-4 w-4 ml-2 opacity-50" />
                </Button>
              </div>
              
              <div className="ml-auto flex items-center gap-2">
                <Button variant="outline" className="text-green-500">
                  Reset
                </Button>
                <Button variant="outline" className="text-green-500">
                  Column Settings
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
                    <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-10">
                      STATUS
                    </th>
                    <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-10">
                      VIEW
                    </th>
                    <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      NAME
                    </th>
                    <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      SN/MAC
                    </th>
                    <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      ONU
                    </th>
                    <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      ZONE
                    </th>
                    <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      ODB
                    </th>
                    <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      SIGNAL
                    </th>
                    <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      B/R
                    </th>
                    <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      VLAN
                    </th>
                    <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-10">
                      VoIP
                    </th>
                    <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-10">
                      TV
                    </th>
                    <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      TYPE
                    </th>
                    <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      AUTH DATE
                    </th>
                    <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      ACTIONS
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {configuredDevices.map((device, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-3 py-3 whitespace-nowrap">
                        <div className={`h-4 w-4 rounded-full ${getStatusColor(device.status)}`}></div>
                      </td>
                      <td className="px-3 py-3 whitespace-nowrap">
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <Eye className="h-4 w-4 text-gray-500" />
                        </Button>
                      </td>
                      <td className="px-3 py-3 whitespace-nowrap text-black">
                        {device.name}
                      </td>
                      <td className="px-3 py-3 whitespace-nowrap text-black">
                        {device.sn_mac}
                      </td>
                      <td className="px-3 py-3 whitespace-nowrap text-black">
                        {device.onu}
                      </td>
                      <td className="px-3 py-3 whitespace-nowrap text-black">
                        {device.zone}
                      </td>
                      <td className="px-3 py-3 whitespace-nowrap text-black">
                        {device.odb}
                      </td>
                      <td className={`px-3 py-3 whitespace-nowrap font-medium ${getSignalColor(device.signal)}`}>
                        {device.signal}
                      </td>
                      <td className="px-3 py-3 whitespace-nowrap text-black">
                        {device.br}
                      </td>
                      <td className="px-3 py-3 whitespace-nowrap text-black">
                        {device.vlan}
                      </td>
                      <td className="px-3 py-3 whitespace-nowrap">
                        <div className={`h-4 w-4 rounded-full ${device.voip ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                      </td>
                      <td className="px-3 py-3 whitespace-nowrap">
                        <div className={`h-4 w-4 rounded-full ${device.tv ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                      </td>
                      <td className="px-3 py-3 whitespace-nowrap text-black">
                        {device.type}
                      </td>
                      <td className="px-3 py-3 whitespace-nowrap text-black">
                        {device.authDate}
                      </td>
                      <td className="px-3 py-3 whitespace-nowrap text-right flex space-x-1">
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <InfoIcon className="h-4 w-4 text-green-500" />
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <BarChart2 className="h-4 w-4 text-green-500" />
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4 text-gray-400" />
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
                  Showing <span className="font-medium">1-10</span> of <span className="font-medium">128</span> items
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
                    variant={currentPage === 4 ? 'default' : 'outline'} 
                    size="sm" 
                    className={`relative inline-flex items-center px-4 py-2 border ${
                      currentPage === 4 
                        ? 'bg-green-500 text-white border-green-500' 
                        : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
                    }`}
                    onClick={() => setCurrentPage(4)}
                  >
                    4
                  </Button>
                  
                  <span className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
                    ...
                  </span>
                  
                  <Button 
                    variant={currentPage === 13 ? 'default' : 'outline'} 
                    size="sm" 
                    className={`relative inline-flex items-center px-4 py-2 border ${
                      currentPage === 13 
                        ? 'bg-green-500 text-white border-green-500' 
                        : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
                    }`}
                    onClick={() => setCurrentPage(13)}
                  >
                    13
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
        </main>
      </div>
    </div>
  );
};

export default ConfiguredDevices;