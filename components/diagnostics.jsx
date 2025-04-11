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
  History,
  SignalHigh,
  Activity,
  WifiIcon,
  FileText,
  Settings2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";

// Mock data for signal levels
const signalLevelsData = [
  {
    status: "active",
    signalStrength: "good",
    signalValue: "-12.6 dBm",
    distance: "1.2 km",
    name: "Smith-Residence",
    snMac: "00:1A:2B:3C:4D:5E",
    zone: "East",
    odb: "ODB-122",
    onu: "1/1/1",
    lastStatusChange: "2025-04-09 08:23"
  },
  {
    status: "active",
    signalStrength: "good",
    signalValue: "-13.2 dBm",
    distance: "1.5 km",
    name: "Johnson-Home",
    snMac: "00:2C:3D:4E:5F:6G",
    zone: "East",
    odb: "ODB-124",
    onu: "1/1/2",
    lastStatusChange: "2025-04-09 09:45"
  },
  {
    status: "critical",
    signalStrength: "poor",
    signalValue: "-27.8 dBm",
    distance: "3.2 km",
    name: "Brown-Apartment",
    snMac: "00:3D:4E:5F:6G:7H",
    zone: "East",
    odb: "ODB-156",
    onu: "1/2/1",
    lastStatusChange: "2025-04-09 10:12"
  },
  {
    status: "warning",
    signalStrength: "warning",
    signalValue: "-21.5 dBm",
    distance: "2.7 km",
    name: "Wilson-Residence",
    snMac: "00:4E:5F:6G:7H:8I",
    zone: "East",
    odb: "ODB-158",
    onu: "1/2/2",
    lastStatusChange: "2025-04-09 10:58"
  },
  {
    status: "active",
    signalStrength: "good",
    signalValue: "-14.2 dBm",
    distance: "1.8 km",
    name: "Taylor-House",
    snMac: "00:5F:6G:7H:8I:9J",
    zone: "West",
    odb: "ODB-212",
    onu: "2/1/1",
    lastStatusChange: "2025-04-09 07:20"
  },
  {
    status: "active",
    signalStrength: "good",
    signalValue: "-15.8 dBm",
    distance: "1.9 km",
    name: "Davis-Apartment",
    snMac: "00:6G:7H:8I:9J:0K",
    zone: "West",
    odb: "ODB-214",
    onu: "2/1/2",
    lastStatusChange: "2025-04-08 18:32"
  },
  {
    status: "inactive",
    signalStrength: "none",
    signalValue: "N/A",
    distance: "2.4 km",
    name: "Miller-House",
    snMac: "00:7H:8I:9J:0K:1L",
    zone: "West",
    odb: "ODB-236",
    onu: "2/2/1",
    lastStatusChange: "2025-04-09 06:12"
  },
  {
    status: "active",
    signalStrength: "good",
    signalValue: "-11.5 dBm",
    distance: "0.9 km",
    name: "Anderson-Office",
    snMac: "00:8I:9J:0K:1L:2M",
    zone: "North",
    odb: "ODB-315",
    onu: "3/1/1",
    lastStatusChange: "2025-04-09 08:55"
  },
  {
    status: "active",
    signalStrength: "good",
    signalValue: "-16.7 dBm",
    distance: "2.1 km",
    name: "Clark-Building",
    snMac: "00:9J:0K:1L:2M:3N",
    zone: "North",
    odb: "ODB-318",
    onu: "3/1/2",
    lastStatusChange: "2025-04-08 14:27"
  },
  {
    status: "warning",
    signalStrength: "warning",
    signalValue: "-22.8 dBm",
    distance: "2.8 km",
    name: "Lewis-Shop",
    snMac: "00:0K:1L:2M:3N:4O",
    zone: "North",
    odb: "ODB-342",
    onu: "3/2/1",
    lastStatusChange: "2025-04-09 11:03"
  }
];

const NetworkDiagnostics = () => {
  const [activeTab, setActiveTab] = useState('signal');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedStatus, setSelectedStatus] = useState('All Statuses');
  const [selectedZone, setSelectedZone] = useState('All Zones');
  const totalItems = 48;
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

  const getSignalIcon = (strength) => {
    switch(strength) {
      case 'good':
        return <div className="w-12 h-2 bg-green-500 rounded-full"></div>;
      case 'warning':
        return <div className="w-8 h-2 bg-yellow-500 rounded-full"></div>;
      case 'poor':
        return <div className="w-4 h-2 bg-red-500 rounded-full"></div>;
      case 'none':
        return <div className="w-12 h-2 bg-gray-300 rounded-full"></div>;
      default:
        return <div className="w-12 h-2 bg-gray-300 rounded-full"></div>;
    }
  };

  const getSignalColor = (value) => {
    if (value === 'N/A') return 'text-gray-500';
    
    const numValue = parseFloat(value);
    if (numValue > -18) return 'text-green-600';
    if (numValue > -22) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getStatusChangeColor = (time) => {
    if (time.includes('10:12') || time.includes('11:03')) {
      return 'text-red-600';
    }
    if (time.includes('10:58')) {
      return 'text-yellow-600';
    }
    return 'text-black';
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
              className="w-full justify-start bg-green-700 text-white hover:bg-green-600 hover:text-white px-4 py-2 rounded-lg mb-1"
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
                placeholder="Search devices..."
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
        
        {/* Main Diagnostics Content */}
        <main className="flex-1 overflow-y-auto p-6 bg-gray-100">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-black">Network Diagnostics</h1>
              <p className="text-black">Troubleshoot and monitor network device health</p>
            </div>
            <div className="flex items-center space-x-3">
              <Button className="bg-green-500 hover:bg-green-600 text-white">
                Run Diagnostic
              </Button>
              <Button variant="outline" className="bg-white text-black">
                Export Results
              </Button>
            </div>
          </div>
          
          {/* Diagnostic Tabs */}
          <div className="bg-white rounded-md p-3 mb-6 flex space-x-2">
            <Button 
              variant={activeTab === 'signal' ? 'default' : 'ghost'} 
              className={activeTab === 'signal' ? 'bg-green-500 text-white' : 'bg-white text-black'}
              onClick={() => setActiveTab('signal')}
            >
              Signal Levels
            </Button>
            <Button 
              variant={activeTab === 'ping' ? 'default' : 'ghost'} 
              className={activeTab === 'ping' ? 'bg-green-500 text-white' : 'bg-white text-black'}
              onClick={() => setActiveTab('ping')}
            >
              Ping Tests
            </Button>
            <Button 
              variant={activeTab === 'bandwidth' ? 'default' : 'ghost'} 
              className={activeTab === 'bandwidth' ? 'bg-green-500 text-white' : 'bg-white text-black'}
              onClick={() => setActiveTab('bandwidth')}
            >
              Bandwidth Tests
            </Button>
            <Button 
              variant={activeTab === 'error' ? 'default' : 'ghost'} 
              className={activeTab === 'error' ? 'bg-green-500 text-white' : 'bg-white text-black'}
              onClick={() => setActiveTab('error')}
            >
              Error Logs
            </Button>
            <Button 
              variant={activeTab === 'history' ? 'default' : 'ghost'} 
              className={activeTab === 'history' ? 'bg-green-500 text-white' : 'bg-white text-black'}
              onClick={() => setActiveTab('history')}
            >
              History
            </Button>
          </div>
          
          {/* Filters */}
          <div className="bg-white rounded-md p-4 mb-6">
            <div className="flex flex-wrap gap-4 items-center">
              <div className="relative flex-grow max-w-md">
                <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="search"
                  placeholder="Search by name or SN/MAC..."
                  className="w-full pl-8 pr-4 py-2 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 text-black"
                />
              </div>
              
              <div className="flex items-center">
                <span className="text-black mr-2 text-black">Status:</span>
                <Button variant="outline" className="flex items-center justify-between min-w-[150px]">
                  <span>{selectedStatus}</span>
                  <ChevronRight className="h-4 w-4 ml-2 opacity-50 text-black" />
                </Button>
              </div>
              
              <div className="flex items-center">
                <span className="text-black mr-2 text-black">Zone:</span>
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
                  Signal Thresholds
                </Button>
              </div>
            </div>
          </div>
          
          {/* Signal Levels Table */}
          <div className="bg-white rounded-md shadow-sm overflow-hidden mb-4">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-10">
                      STATUS
                    </th>
                    <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-20">
                      SIGNAL
                    </th>
                    <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      SIGNAL VALUE
                    </th>
                    <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      DISTANCE
                    </th>
                    <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      NAME
                    </th>
                    <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      SN/MAC
                    </th>
                    <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      ZONE
                    </th>
                    <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      ODB
                    </th>
                    <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      ONU
                    </th>
                    <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      LAST STATUS CHANGE
                    </th>
                    <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-10">
                      ACTIONS
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {signalLevelsData.map((device, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-3 py-3 whitespace-nowrap">
                        <div className={`h-4 w-4 rounded-full ${getStatusColor(device.status)}`}></div>
                      </td>
                      <td className="px-3 py-3 whitespace-nowrap">
                        {getSignalIcon(device.signalStrength)}
                      </td>
                      <td className={`px-3 py-3 whitespace-nowrap font-medium ${getSignalColor(device.signalValue)}`}>
                        {device.signalValue}
                      </td>
                      <td className="px-3 py-3 whitespace-nowrap text-black">
                        {device.distance}
                      </td>
                      <td className="px-3 py-3 whitespace-nowrap text-black">
                        {device.name}
                      </td>
                      <td className="px-3 py-3 whitespace-nowrap text-black">
                        {device.snMac}
                      </td>
                      <td className="px-3 py-3 whitespace-nowrap text-black">
                        {device.zone}
                      </td>
                      <td className="px-3 py-3 whitespace-nowrap text-black">
                        {device.odb}
                      </td>
                      <td className="px-3 py-3 whitespace-nowrap text-black">
                        {device.onu}
                      </td>
                      <td className={`px-3 py-3 whitespace-nowrap ${getStatusChangeColor(device.lastStatusChange)}`}>
                        {device.lastStatusChange}
                      </td>
                      <td className="px-3 py-3 whitespace-nowrap text-center">
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <Settings2 className="h-4 w-4 text-green-500" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          
          {/* Signal Legend and Pagination */}
          <div className="flex flex-wrap items-center justify-between px-4 py-3 bg-white border-t border-gray-200 rounded-b-md mb-4 text-black">
            <div>
              <div className="text-sm text-gray-700 mb-2">
                <span className="font-medium">SIGNAL LEGEND:</span>
              </div>
              <div className="flex items-center space-x-6">
                <div className="flex items-center">
                  <div className="h-3 w-3 rounded-full bg-green-500 mr-2"></div>
                  <span className="text-sm">Good (-18dBm or higher)</span>
                </div>
                <div className="flex items-center">
                  <div className="h-3 w-3 rounded-full bg-yellow-500 mr-2"></div>
                  <span className="text-sm">Warning (-18dBm to -24dBm)</span>
                </div>
                <div className="flex items-center">
                  <div className="h-3 w-3 rounded-full bg-red-500 mr-2"></div>
                  <span className="text-sm">Poor (below -24dBm)</span>
                </div>
              </div>
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
                      ? 'bg-green-500 text-white border-blue-500' 
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
                      ? 'bg-blue-500 text-white border-green-500' 
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
                      ? 'bg-blue-500 text-white border-blue-500' 
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
                      ? 'bg-blue-500 text-white border-blue-500' 
                      : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                  onClick={() => setCurrentPage(4)}
                >
                  4
                </Button>
                
                <Button 
                  variant={currentPage === 5 ? 'default' : 'outline'} 
                  size="sm" 
                  className={`relative inline-flex items-center px-4 py-2 border ${
                    currentPage === 5 
                      ? 'bg-blue-500 text-white border-blue-500' 
                      : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                  onClick={() => setCurrentPage(5)}
                >
                  5
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
          
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-700">
              Showing <span className="font-medium">1-10</span> of <span className="font-medium">48</span> devices
              </p>
            <div className="text-center text-sm text-black">
              © 2025 DOTMAC Network Management System v1.2.1
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default NetworkDiagnostics;