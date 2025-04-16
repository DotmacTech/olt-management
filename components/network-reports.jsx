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
  Settings2,
  Download,
  Printer,
  FileText,
  MoreVertical
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";

// Mock data for network reports
const networkReportsData = [
  { 
    id: 1, 
    user: 'John Doe', 
    role: 'Admin', 
    snmac: '00:1A:2B:3C:4D:5E', 
    location: 'Smith-Residence (East Zone)', 
    pon: 'OLT-East-01 P1/1/1', 
    date: 'Apr 09, 2025',
    time: '11:23:45',
    ip: '192.168.1.45',
    device: 'ONT-2201-ABC (00:1A:2B:3C:4D:5E)',
    action: 'Configuration',
    description: [
      'Updated bandwidth profile from 50/25 Mbps to 100/50 Mbps',
      'Added IPTV service with VLAN 700'
    ]
  },
  { 
    id: 2, 
    user: 'Sarah Adams', 
    role: 'Tech', 
    snmac: '00:2C:3D:4E:5F:6G', 
    location: 'Johnson-Home (East Zone)', 
    pon: 'OLT-East-01 P1/1/2', 
    date: 'Apr 09, 2025',
    time: '10:12:12'
  },
  { 
    id: 3, 
    user: 'Tom Wilson', 
    role: 'Tech', 
    snmac: '00:3D:4E:5F:6G:7H', 
    location: 'Brown-Apartment (East Zone)', 
    pon: 'OLT-East-01 P1/2/1', 
    date: 'Apr 09, 2025',
    time: '09:33:33'
  },
  { 
    id: 4, 
    user: 'John Doe', 
    role: 'Admin', 
    snmac: '00:4E:5F:6G:7H:8I', 
    location: 'Wilson-Residence (East Zone)', 
    pon: 'OLT-East-01 P1/2/2', 
    date: 'Apr 09, 2025',
    time: '08:27:27'
  },
  { 
    id: 5, 
    user: 'Maria Rodriguez', 
    role: 'Tech', 
    snmac: '00:5F:6G:7H:8I:9J', 
    location: 'Taylor-House (West Zone)', 
    pon: 'OLT-West-05 P2/1/1', 
    date: 'Apr 09, 2025',
    time: '07:19:19'
  },
  { 
    id: 6, 
    user: 'Sarah Adams', 
    role: 'Tech', 
    snmac: '00:6G:7H:8I:9J:0K', 
    location: 'Davis-Apartment (West Zone)', 
    pon: 'OLT-West-05 P2/1/2', 
    date: 'Apr 08, 2025',
    time: '17:45:45'
  },
  { 
    id: 7, 
    user: 'Tom Wilson', 
    role: 'Tech', 
    snmac: '00:7H:8I:9J:0K:1L', 
    location: 'Miller-House (West Zone)', 
    pon: 'OLT-West-05 P2/2/1', 
    date: 'Apr 08, 2025',
    time: '16:54:38'
  },
  { 
    id: 8, 
    user: 'John Doe', 
    role: 'Admin', 
    snmac: '00:8I:9J:0K:1L:2M', 
    location: 'Anderson-Office (North Zone)', 
    pon: 'OLT-North-03 P3/1/1', 
    date: 'Apr 08, 2025',
    time: '14:27:56'
  },
  { 
    id: 9, 
    user: 'Maria Rodriguez', 
    role: 'Tech', 
    snmac: '00:9J:0K:1L:2M:3N', 
    location: 'Clark-Building (North Zone)', 
    pon: 'OLT-North-03 P3/1/2', 
    date: 'Apr 08, 2025',
    time: '13:16:22'
  },
  { 
    id: 10, 
    user: 'Alex Johnson', 
    role: 'Tech', 
    snmac: '00:0K:1L:2M:3N:4O', 
    location: 'Lewis-Shop (North Zone)', 
    pon: 'OLT-North-03 P3/2/1', 
    date: 'Apr 08, 2025',
    time: '09:48:35'
  },
];

const NetworkReports = () => {
  const [activeTab, setActiveTab] = useState('Activity Logs');
  const [currentPage, setCurrentPage] = useState(1);
  const [dateRange, setDateRange] = useState({ start: '04/01', end: '04/09' });
  const [showLogDetails, setShowLogDetails] = useState(false);
  const [selectedLog, setSelectedLog] = useState(null);
  const totalItems = 347;
  const itemsPerPage = 10;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const tabs = ['Activity Logs', 'Performance', 'Utilization', 'Billing', 'Inventory'];

  const handleViewDetails = (log) => {
    setSelectedLog(log);
    setShowLogDetails(true);
  };

  const handleCloseDetails = () => {
    setShowLogDetails(false);
    setSelectedLog(null);
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
               className="w-full justify-start bg-green-700 text-white hover:bg-green-600 hover:text-white px-4 py-2 rounded-lg mb-1"
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
                placeholder="Search reports..."
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
        
        {/* Main Reports Content */}
        <main className="flex-1 overflow-y-auto p-6 bg-gray-100">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-black">Network Reports</h1>
              <p className="text-black">Generate and view network activity reports</p>
            </div>
            <div className="flex items-center space-x-3">
              <Button className="bg-green-600 hover:bg-green-700 text-white">
                New Report
              </Button>
              <Button variant="outline" className="bg-white text-black">
                Export
              </Button>
            </div>
          </div>
          
          {/* Report Tabs */}
          <div className="bg-white rounded-md mb-6">
            <div className="border-b border-gray-200">
              <nav className="flex" aria-label="Tabs">
                {tabs.map(tab => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`
                      px-6 py-3 text-sm font-medium
                      ${activeTab === tab 
                        ? 'border-b-2 border-green-600 text-green-600' 
                        : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }
                    `}
                  >
                    {tab}
                  </button>
                ))}
              </nav>
            </div>
          </div>
          
          {/* Date Filter */}
          <div className="bg-white rounded-md p-4 mb-6">
            <div className="flex flex-wrap gap-4 items-center">
              <div className="flex items-center">
                <span className="text-black font-medium mr-2">Date Range:</span>
                
                <div className="flex items-center mr-4">
                  <span className="text-sm text-gray-500 mr-2">Start Date</span>
                  <input 
                    type="text" 
                    value={dateRange.start}
                    onChange={(e) => setDateRange({...dateRange, start: e.target.value})}
                    className="w-24 px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                
                <div className="flex items-center mr-4">
                  <span className="text-sm text-gray-500 mr-2">End Date</span>
                  <input 
                    type="text" 
                    value={dateRange.end}
                    onChange={(e) => setDateRange({...dateRange, end: e.target.value})}
                    className="w-24 px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
              </div>
              
              <Button className="bg-green-600 hover:bg-green-700 text-white">
                Apply
              </Button>
              
              <Button variant="outline" className="text-black">
                Reset
              </Button>
              
              <div className="ml-auto flex items-center space-x-4">
                <div className="flex items-center">
                  <span className="text-black font-medium mr-2">Preset:</span>
                  <Button variant="outline" className="text-black flex items-center">
                    Last Week
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Button>
                </div>
                
                <Button variant="ghost" className="text-green-600 hover:text-green-700 flex items-center">
                  Advanced Filters
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
          
          {/* Reports Table */}
          <div className="bg-white rounded-md shadow-sm overflow-hidden mb-4">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      USER
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      SN/MAC
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      LOCATION
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      PON
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      DATE
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      ACTION
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {networkReportsData.map((report) => (
                    <tr key={report.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-black">
                        {report.user} ({report.role})
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-black">
                        {report.snmac}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-black">
                        {report.location}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-black">
                        {report.pon}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-black">
                        {report.date}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <button
                          className="text-green-600 hover:text-green-800 text-sm font-medium"
                          onClick={() => handleViewDetails(report)}
                        >
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {/* Pagination */}
            <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200">
              <div className="text-sm text-gray-700">
                Showing 1-9 of 347 log entries
              </div>
              <div>
                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                    disabled={currentPage === 1}
                  >
                    <span className="sr-only">Previous</span>
                    &lt;
                  </Button>
                  
                  <Button 
                    variant={currentPage === 1 ? 'default' : 'outline'} 
                    size="sm" 
                    className={`relative inline-flex items-center px-4 py-2 border ${
                      currentPage === 1 
                        ? 'bg-green-600 text-white border-green-600' 
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
                        ? 'bg-green-600 text-white border-green-600' 
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
                        ? 'bg-green-600 text-white border-green-600' 
                        : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
                    }`}
                    onClick={() => setCurrentPage(3)}
                  >
                    3
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700"
                  >
                    ...
                  </Button>
                  
                  <Button 
                    variant={currentPage === totalPages ? 'default' : 'outline'} 
                    size="sm" 
                    className={`relative inline-flex items-center px-4 py-2 border ${
                      currentPage === totalPages 
                        ? 'bg-green-600 text-white border-green-600' 
                        : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
                    }`}
                    onClick={() => setCurrentPage(totalPages)}
                  >
                    35
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                    disabled={currentPage === totalPages}
                  >
                    <span className="sr-only">Next</span>
                    &gt;
                  </Button>
                </nav>
              </div>
            </div>
          </div>
          
          <div className="text-center text-sm text-black">
            © 2025 DOTMAC Network Management System v4.2.1
          </div>
        </main>
      </div>
      
      {/* Log Details Modal */}
      {showLogDetails && selectedLog && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-screen items-end justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={handleCloseDetails}></div>
            
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-3xl sm:w-full sm:p-6">
              <div className="sm:flex sm:items-start">
                <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">Log Entry Details</h3>
                    <button
                      type="button"
                      className="rounded-md text-gray-400 hover:text-gray-500 focus:outline-none"
                      onClick={handleCloseDetails}
                    >
                      <span className="sr-only">Close</span>
                      <X className="h-6 w-6" />
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <div className="mb-4">
                        <div className="text-sm text-gray-500">User:</div>
                        <div className="mt-1 text-black font-medium">
                          {selectedLog.user} ({selectedLog.role === 'Admin' ? 'Administrator' : selectedLog.role})
                        </div>
                      </div>
                      
                      <div className="mb-4">
                        <div className="text-sm text-gray-500">Date and Time:</div>
                        <div className="mt-1 text-black">
                          {selectedLog.date} {selectedLog.time || '11:23:45'}
                        </div>
                      </div>
                      
                      <div className="mb-4">
                        <div className="text-sm text-gray-500">IP Address:</div>
                        <div className="mt-1 text-black">
                          {selectedLog.ip || '192.168.1.45'}
                        </div>
                      </div>
                      
                      <div className="mb-4">
                        <div className="text-sm text-gray-500">Device:</div>
                        <div className="mt-1 text-black">
                          {selectedLog.device || `ONT-2201-ABC (${selectedLog.snmac})`}
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="mb-4">
                        <div className="text-sm text-gray-500">Location:</div>
                        <div className="mt-1 text-black">
                          {selectedLog.location}
                        </div>
                      </div>
                      
                      <div className="mb-4">
                        <div className="text-sm text-gray-500">PON:</div>
                        <div className="mt-1 text-black">
                          {selectedLog.pon}
                        </div>
                      </div>
                      
                      <div className="mb-4">
                        <div className="text-sm text-gray-500">Action:</div>
                        <div className="mt-1">
                          <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                            {selectedLog.action || 'Configuration'}
                          </span>
                        </div>
                      </div>
                      
                      <div className="mb-4">
                        <div className="text-sm text-gray-500">Description:</div>
                        <div className="mt-1 text-black">
                          {selectedLog.description ? (
                            <ul className="list-disc pl-5 space-y-1">
                              {selectedLog.description.map((desc, index) => (
                                <li key={index}>{desc}</li>
                              ))}
                            </ul>
                          ) : (
                            <ul className="list-disc pl-5 space-y-1">
                              <li>Updated bandwidth profile from 50/25 Mbps to 100/50 Mbps</li>
                              <li>Added IPTV service with VLAN 700</li>
                            </ul>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                  <Button
                    className="bg-green-600 hover:bg-green-700 text-white sm:ml-3"
                    onClick={() => {}}
                  >
                    Export Log
                  </Button>
                  <Button
                    variant="outline"
                    className="mt-3 sm:mt-0 mr-3"
                    onClick={() => {}}
                  >
                    Print
                  </Button>
                  <Button
                    variant="outline"
                    className="mt-3 sm:mt-0"
                    onClick={handleCloseDetails}
                  >
                    Close
                  </Button>
                </div>
              </div>
            </div>
          </div>
      )}
    </div>
  );
};

export default NetworkReports;