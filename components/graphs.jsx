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

// Mock data for CPU Load chart
const cpuLoadData = [
  { time: '00:00', 'OLT-East-01': 25, 'OLT-East-02': 20, 'OLT-West-05': 35, 'OLT-North-03': 0 },
  { time: '04:00', 'OLT-East-01': 30, 'OLT-East-02': 25, 'OLT-West-05': 40, 'OLT-North-03': 0 },
  { time: '08:00', 'OLT-East-01': 40, 'OLT-East-02': 30, 'OLT-West-05': 55, 'OLT-North-03': 0 },
  { time: '12:00', 'OLT-East-01': 30, 'OLT-East-02': 25, 'OLT-West-05': 35, 'OLT-North-03': 0 },
  { time: '16:00', 'OLT-East-01': 35, 'OLT-East-02': 28, 'OLT-West-05': 45, 'OLT-North-03': 0 },
  { time: '20:00', 'OLT-East-01': 40, 'OLT-East-02': 30, 'OLT-West-05': 52, 'OLT-North-03': 0 },
  { time: '00:00', 'OLT-East-01': 35, 'OLT-East-02': 28, 'OLT-West-05': 48, 'OLT-North-03': 0 },
];

// Mock data for Bandwidth Usage chart
const bandwidthData = [
  { time: '00:00', 'OLT-East-01': 8, 'OLT-East-02': 7, 'OLT-West-05': 14, 'OLT-North-03': 0 },
  { time: '04:00', 'OLT-East-01': 9, 'OLT-East-02': 8, 'OLT-West-05': 15, 'OLT-North-03': 0 },
  { time: '08:00', 'OLT-East-01': 11, 'OLT-East-02': 9, 'OLT-West-05': 14, 'OLT-North-03': 0 },
  { time: '12:00', 'OLT-East-01': 8, 'OLT-East-02': 7, 'OLT-West-05': 13, 'OLT-North-03': 0 },
  { time: '16:00', 'OLT-East-01': 7, 'OLT-East-02': 6, 'OLT-West-05': 12, 'OLT-North-03': 0 },
  { time: '20:00', 'OLT-East-01': 8, 'OLT-East-02': 7, 'OLT-West-05': 13, 'OLT-North-03': 0 },
  { time: '00:00', 'OLT-East-01': 9, 'OLT-East-02': 8, 'OLT-West-05': 15, 'OLT-North-03': 0 },
];

// Mock data for OLT status
const oltStatusData = [
  { 
    id: "OLT-East-01", 
    status: "active", 
    cpuLoad: "45%", 
    memory: "32%", 
    activeONTs: "80/128", 
    bandwidth: "8.5 / 2.2", 
    errors: 0 
  },
  { 
    id: "OLT-East-02", 
    status: "active", 
    cpuLoad: "38%", 
    memory: "28%", 
    activeONTs: "64/128", 
    bandwidth: "7.0 / 1.8", 
    errors: 0 
  },
  { 
    id: "OLT-North-03", 
    status: "down", 
    cpuLoad: "—", 
    memory: "—", 
    activeONTs: "0/128", 
    bandwidth: "0.0 / 0.0", 
    errors: 5 
  }
];

// Mock data for ONT Status Distribution
const ontDistributionData = [
  {
    olt: "OLT-East-01",
    total: 128,
    active: 80,
    warning: 8,
    error: 10,
    offline: 30
  },
  {
    olt: "OLT-East-02",
    total: 128,
    active: 64,
    warning: 12,
    error: 6,
    offline: 46
  }
];

// Mock data for Recent Alerts
const recentAlertsData = [
  {
    message: "OLT-North-03 connection failure",
    time: "10 min ago",
    severity: "critical"
  },
  {
    message: "OLT-East-01 high CPU load (78%) detected",
    time: "35 min ago",
    severity: "warning"
  },
  {
    message: "OLT-West-05 Port 3 connection lost",
    time: "1 hour ago",
    severity: "critical"
  }
];

const OLTPerformanceGraphs = () => {
  const [selectedTimeRange, setSelectedTimeRange] = useState('24h');
  const [selectedOLT, setSelectedOLT] = useState('all');

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
              className="w-full justify-start bg-green-700 text-white hover:bg-green-600 hover:text-white px-4 py-2 rounded-lg mb-1"
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
        
        {/* Main Graphs Content */}
        <main className="flex-1 overflow-y-auto p-6 bg-gray-100">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-black">OLT Performance Graphs</h1>
            <p className="text-black">Monitor performance metrics across all OLTs</p>
          </div>
          
          {/* Filters */}
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <div className="flex items-center">
              <span className="text-black mr-2">Select OLT:</span>
              <div className="relative w-48">
                <Button variant="outline" className="w-full justify-between bg-white">
                  <span>All OLTs</span>
                  <ChevronRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </div>
            
            <div className="flex items-center">
              <span className="text-black mr-2">Time Range:</span>
              <div className="flex border rounded-md overflow-hidden">
                <Button 
                  variant={selectedTimeRange === '24h' ? 'default' : 'ghost'} 
                  className={`px-4 py-2 rounded-none ${selectedTimeRange === '24h' ? 'bg-green-500 text-white' : 'bg-white text-black'}`}
                  onClick={() => setSelectedTimeRange('24h')}
                >
                  24h
                </Button>
                <Button 
                  variant={selectedTimeRange === '7d' ? 'default' : 'ghost'} 
                  className={`px-4 py-2 rounded-none ${selectedTimeRange === '7d' ? 'bg-green-500 text-white' : 'bg-white text-black'}`}
                  onClick={() => setSelectedTimeRange('7d')}
                >
                  7d
                </Button>
                <Button 
                  variant={selectedTimeRange === '30d' ? 'default' : 'ghost'} 
                  className={`px-4 py-2 rounded-none ${selectedTimeRange === '30d' ? 'bg-green-500 text-white' : 'bg-white text-black'}`}
                  onClick={() => setSelectedTimeRange('30d')}
                >
                  30d
                </Button>
              </div>
            </div>
            
            <div className="ml-auto">
              <Button variant="outline" className="bg-white text-black">
                Export Data
              </Button>
            </div>
          </div>
          
          {/* OLT Performance Overview Table */}
          <Card className="mb-6 shadow-sm border-0">
            <CardHeader className="pb-2">
              <CardTitle className="text-black">OLT Performance Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left border-b">
                      <th className="pb-2 font-medium text-black">OLT Name</th>
                      <th className="pb-2 font-medium text-black">Status</th>
                      <th className="pb-2 font-medium text-black">CPU Load</th>
                      <th className="pb-2 font-medium text-black">Memory</th>
                      <th className="pb-2 font-medium text-black">Active ONTs</th>
                      <th className="pb-2 font-medium text-black">Bandwidth (Gbps)</th>
                      <th className="pb-2 font-medium text-black">Errors</th>
                      <th className="pb-2 font-medium text-black">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {oltStatusData.map((olt) => (
                      <tr key={olt.id} className="border-b">
                        <td className="py-3 text-black">{olt.id}</td>
                        <td className="py-3">
                          <Badge className={
                            olt.status === 'active' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                          }>
                            {olt.status === 'active' ? 'Active' : 'Down'}
                          </Badge>
                        </td>
                        <td className="py-3 text-black">{olt.cpuLoad}</td>
                        <td className="py-3 text-black">{olt.memory}</td>
                        <td className="py-3 text-black">{olt.activeONTs}</td>
                        <td className="py-3 text-black">{olt.bandwidth}</td>
                        <td className="py-3 text-black">
                          <span className={olt.errors > 0 ? "text-red-500 font-medium" : ""}>{olt.errors}</span>
                        </td>
                        <td className="py-3">
                          <Button variant="link" className="text-green-500 h-8 px-2">
                            View Details
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
          
          {/* Charts */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* CPU Load Chart */}
            <Card className="shadow-sm border-0">
              <CardHeader className="pb-2">
                <CardTitle className="text-black">CPU Load (%)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 relative">
                  <svg viewBox="0 0 800 300" className="w-full h-full">
                    {/* Grid lines */}
                    <line x1="50" y1="250" x2="750" y2="250" stroke="#e5e7eb" strokeWidth="1" />
                    <line x1="50" y1="200" x2="750" y2="200" stroke="#e5e7eb" strokeWidth="1" />
                    <line x1="50" y1="150" x2="750" y2="150" stroke="#e5e7eb" strokeWidth="1" />
                    <line x1="50" y1="100" x2="750" y2="100" stroke="#e5e7eb" strokeWidth="1" />
                    <line x1="50" y1="50" x2="750" y2="50" stroke="#e5e7eb" strokeWidth="1" />
                    
                    {/* Y-axis labels */}
                    <text x="40" y="250" textAnchor="end" fontSize="12" fill="#6b7280">0</text>
                    <text x="40" y="200" textAnchor="end" fontSize="12" fill="#6b7280">25</text>
                    <text x="40" y="150" textAnchor="end" fontSize="12" fill="#6b7280">50</text>
                    <text x="40" y="100" textAnchor="end" fontSize="12" fill="#6b7280">75</text>
                    
                    {/* X-axis labels */}
                    {cpuLoadData.map((point, i) => (
                      <text 
                        key={i} 
                        x={50 + i * (700 / (cpuLoadData.length - 1))} 
                        y="270" 
                        textAnchor="middle" 
                        fontSize="12" 
                        fill="#6b7280"
                      >
                        {point.time}
                      </text>
                    ))}
                    
                    {/* Lines */}
                    <polyline 
                      points={cpuLoadData.map((point, i) => `${50 + i * (700 / (cpuLoadData.length - 1))},${250 - point["OLT-East-01"] * 2}`).join(' ')} 
                      fill="none" 
                      stroke="#3b82f6" 
                      strokeWidth="2" 
                    />
                    
                    <polyline 
                      points={cpuLoadData.map((point, i) => `${50 + i * (700 / (cpuLoadData.length - 1))},${250 - point["OLT-East-02"] * 2}`).join(' ')} 
                      fill="none" 
                      stroke="#8b5cf6" 
                      strokeWidth="2" 
                    />
                    
                    <polyline 
                      points={cpuLoadData.map((point, i) => `${50 + i * (700 / (cpuLoadData.length - 1))},${250 - point["OLT-West-05"] * 2}`).join(' ')} 
                      fill="none" 
                      stroke="#10b981" 
                      strokeWidth="2" 
                    />
                    
                    <polyline 
                      points={cpuLoadData.map((point, i) => `${50 + i * (700 / (cpuLoadData.length - 1))},${250 - point["OLT-North-03"] * 2}`).join(' ')} 
                      fill="none" 
                      stroke="#ef4444" 
                      strokeWidth="2" 
                      strokeDasharray="5,5"
                    />
                    
                    {/* Legend */}
                    <rect x="50" y="285" width="10" height="10" fill="#3b82f6" />
                    <text x="65" y="295" fontSize="12" fill="#000">OLT-East-01</text>
                    
                    <rect x="150" y="285" width="10" height="10" fill="#8b5cf6" />
                    <text x="165" y="295" fontSize="12" fill="#000">OLT-East-02</text>
                    
                    <rect x="250" y="285" width="10" height="10" fill="#10b981" />
                    <text x="265" y="295" fontSize="12" fill="#000">OLT-West-05</text>
                    
                    <rect x="350" y="285" width="10" height="10" fill="#ef4444" />
                    <text x="365" y="295" fontSize="12" fill="#000">OLT-North-03</text>
                  </svg>
                </div>
              </CardContent>
            </Card>
            
            {/* Bandwidth Usage Chart */}
            <Card className="shadow-sm border-0">
              <CardHeader className="pb-2">
                <CardTitle className="text-black">Bandwidth Usage (Gbps)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 relative">
                  <svg viewBox="0 0 800 300" className="w-full h-full">
                    {/* Grid lines */}
                    <line x1="50" y1="250" x2="750" y2="250" stroke="#e5e7eb" strokeWidth="1" />
                    <line x1="50" y1="200" x2="750" y2="200" stroke="#e5e7eb" strokeWidth="1" />
                    <line x1="50" y1="150" x2="750" y2="150" stroke="#e5e7eb" strokeWidth="1" />
                    <line x1="50" y1="100" x2="750" y2="100" stroke="#e5e7eb" strokeWidth="1" />
                    <line x1="50" y1="50" x2="750" y2="50" stroke="#e5e7eb" strokeWidth="1" />
                    
                    {/* Y-axis labels */}
                    <text x="40" y="250" textAnchor="end" fontSize="12" fill="#6b7280">0</text>
                    <text x="40" y="200" textAnchor="end" fontSize="12" fill="#6b7280">5</text>
                    <text x="40" y="150" textAnchor="end" fontSize="12" fill="#6b7280">10</text>
                    <text x="40" y="100" textAnchor="end" fontSize="12" fill="#6b7280">15</text>
                    
                    {/* X-axis labels */}
                    {bandwidthData.map((point, i) => (
                      <text 
                        key={i} 
                        x={50 + i * (700 / (bandwidthData.length - 1))} 
                        y="270" 
                        textAnchor="middle" 
                        fontSize="12" 
                        fill="#6b7280"
                      >
                        {point.time}
                      </text>
                    ))}
                    
                    {/* Lines */}
                    <polyline 
                      points={bandwidthData.map((point, i) => `${50 + i * (700 / (bandwidthData.length - 1))},${250 - point["OLT-East-01"] * 10}`).join(' ')} 
                      fill="none" 
                      stroke="#3b82f6" 
                      strokeWidth="2" 
                    />
                    
                    <polyline 
                      points={bandwidthData.map((point, i) => `${50 + i * (700 / (bandwidthData.length - 1))},${250 - point["OLT-East-02"] * 10}`).join(' ')} 
                      fill="none" 
                      stroke="#8b5cf6" 
                      strokeWidth="2" 
                    />
                    
                    <polyline 
                      points={bandwidthData.map((point, i) => `${50 + i * (700 / (bandwidthData.length - 1))},${250 - point["OLT-West-05"] * 10}`).join(' ')} 
                      fill="none" 
                      stroke="#10b981" 
                      strokeWidth="2" 
                    />
                    
                    <polyline 
                      points={bandwidthData.map((point, i) => `${50 + i * (700 / (bandwidthData.length - 1))},${250 - point["OLT-North-03"] * 10}`).join(' ')} 
                      fill="none" 
                      stroke="#ef4444" 
                      strokeWidth="2" 
                      strokeDasharray="5,5"
                    />
                    
                    {/* Legend */}
                    <rect x="50" y="285" width="10" height="10" fill="#3b82f6" />
                    <text x="65" y="295" fontSize="12" fill="#000">OLT-East-01</text>
                    
                    <rect x="150" y="285" width="10" height="10" fill="#8b5cf6" />
                    <text x="165" y="295" fontSize="12" fill="#000">OLT-East-02</text>
                    
                    <rect x="250" y="285" width="10" height="10" fill="#10b981" />
                    <text x="265" y="295" fontSize="12" fill="#000">OLT-West-05</text>
                    
                    <rect x="350" y="285" width="10" height="10" fill="#ef4444" />
                    <text x="365" y="295" fontSize="12" fill="#000">OLT-North-03</text>
                  </svg>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* ONT Status Distribution */}
            <Card className="shadow-sm border-0">
              <CardHeader className="pb-2">
                <CardTitle className="text-black">ONT Status Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {ontDistributionData.map((olt) => (
                    <div key={olt.olt} className="space-y-1">
                      <div className="flex justify-between text-sm text-black">
                        <span>{olt.olt}</span>
                        <span>{olt.active}/{olt.total}</span>
                      </div>
                      <div className="flex h-5 rounded-md overflow-hidden">
                        <div 
                          className="bg-green-500" 
                          style={{ width: `${(olt.active / olt.total) * 100}%` }}
                        ></div>
                        <div 
                          className="bg-yellow-500" 
                          style={{ width: `${(olt.warning / olt.total) * 100}%` }}
                        ></div>
                        <div 
                          className="bg-red-500" 
                          style={{ width: `${(olt.error / olt.total) * 100}%` }}
                        ></div>
                        <div 
                          className="bg-gray-300" 
                          style={{ width: `${(olt.offline / olt.total) * 100}%` }}
                        ></div>
                      </div>
                      </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            {/* Recent Alerts */}
            <Card className="shadow-sm border-0">
              <CardHeader className="pb-2">
                <CardTitle className="text-black">Recent Alerts</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentAlertsData.map((alert, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className={`h-4 w-4 rounded-full mt-1 ${
                        alert.severity === 'critical' ? 'bg-red-500' : 
                        alert.severity === 'warning' ? 'bg-yellow-500' : 'bg-green-500'
                      }`}></div>
                      <div>
                        <div className="text-black">{alert.message}</div>
                        <div className="text-sm text-gray-500">{alert.time}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="text-center text-sm text-black mt-4">
            © 2025 DOTMAC Network Management System v1.2.1
          </div>
        </main>
      </div>
    </div>
  );
};

export default OLTPerformanceGraphs;