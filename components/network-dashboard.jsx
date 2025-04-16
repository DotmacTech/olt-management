"use client";

import React from 'react';
import Link from "next/link";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardFooter 
} from "@/components/ui/card";
import { 
  Bell, 
  Search, 
  HelpCircle, 
  Settings, 
  Users, 
  LayoutDashboard, 
  Network, 
  BarChart, 
  Activity,
  LineChart,
  CheckCircle, 
  AlertCircle,
  LogOut,
  Plus,
  FileText,
  Settings2,
  MoreVertical

} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { NetworkTrafficChart } from "@/components/charts/network-traffic";
import { BandwidthUtilizationChart } from "@/components/charts/bandwidth-utilization";
import { useNetworkData } from "@/contexts/data-context";

const NetworkDashboard = () => {
  const data = useNetworkData();

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
              className="w-full justify-start bg-green-700 text-white hover:bg-green-600 hover:text-white px-4 py-2 rounded-lg mb-1"
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
      
      {/* Mobile Sidebar Toggle - only visible on small screens */}
      <div className="md:hidden fixed bottom-4 right-4 z-50">
        <Button className="rounded-full h-12 w-12 p-0 bg-green-600 hover:bg-green-700 text-black">
          <LayoutDashboard className="h-6 w-6 text-white" />
        </Button>
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
                placeholder="Search..."
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
        
        {/* Main Dashboard Content */}
        <main className="flex-1 overflow-y-auto p-6 bg-gray-100">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-black">Network Dashboard</h1>
              <p className="text-black">Overview of your network performance and status</p>
            </div>
            <div className="flex items-center space-x-2 mt-3 sm:mt-0">
              <Button variant="outline" className="bg-white text-black">
                Last 7 days
              </Button>
              <Button variant="ghost" size="icon" className="bg-white">
                <Plus className="h-5 w-5 text-black" />
              </Button>
            </div>
          </div>
          
          {/* Stats Cards Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            {/* Total OLTs Card */}
            <Card>
              <CardContent className="p-6">
                <div className="text-black mb-1">Total OLTs</div>
                <div className="flex items-baseline">
                  <h2 className="text-3xl font-bold text-black">{data.total.olts}</h2>
                  <Badge className="ml-2 bg-green-100 text-green-600">+2</Badge>
                </div>
                <div className="text-sm text-black mt-2">
                  {data.total.activeOlts} Active, {data.total.inactiveOlts} Inactive
                </div>
              </CardContent>
            </Card>
            
            {/* Total ONTs Card */}
            <Card>
              <CardContent className="p-6">
                <div className="text-black mb-1">Total ONTs</div>
                <div className="flex items-baseline">
                  <h2 className="text-3xl font-bold text-black">{data.total.onts.toLocaleString()}</h2>
                  <Badge className="ml-2 bg-green-100 text-green-600">+56</Badge>
                </div>
                <div className="text-sm text-black mt-2">
                  {data.total.activeOnts.toLocaleString()} Active, {data.total.inactiveOnts} Inactive
                </div>
              </CardContent>
            </Card>
            
            {/* Network Availability Card */}
            <Card>
              <CardContent className="p-6">
                <div className="text-black mb-1">Network Availability</div>
                <div className="flex items-baseline">
                  <h2 className="text-3xl font-bold text-black">{data.network.availability}%</h2>
                  <Badge className="ml-2 bg-red-100 text-red-600">-0.1%</Badge>
                </div>
                <div className="text-sm text-black mt-2">
                  {data.network.downtime} hrs downtime this month
                </div>
              </CardContent>
            </Card>
            
            {/* Open Alerts Card */}
            <Card>
              <CardContent className="p-6">
                <div className="text-black mb-1">Open Alerts</div>
                <div className="flex items-baseline">
                  <h2 className="text-3xl font-bold text-black">{data.alerts.total}</h2>
                </div>
                <div className="flex items-center space-x-3 mt-2">
                  <Badge className="bg-red-100 text-red-600">{data.alerts.critical}</Badge>
                  <Badge className="bg-orange-100 text-orange-600">{data.alerts.warning}</Badge>
                  <Badge className="bg-yellow-100 text-yellow-600">{data.alerts.info}</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-6">
            {/* Network Traffic Chart */}
            <Card className="lg:col-span-3">
              <CardHeader className="flex flex-row items-center justify-between pb-2 text-black">
                <CardTitle>Network Traffic</CardTitle>
                <div className="flex items-center space-x-2">
                  <Badge className="bg-blue-100 text-blue-600 flex items-center">
                    <span className="h-2 w-2 rounded-full bg-blue-600 mr-1"></span>
                    Download
                  </Badge>
                  <Badge className="bg-orange-100 text-orange-600 flex items-center">
                    <span className="h-2 w-2 rounded-full bg-orange-500 mr-1"></span>
                    Upload
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="px-6">
                <NetworkTrafficChart />
              </CardContent>
            </Card>
            
            {/* Bandwidth Utilization Chart */}
            <Card className="lg:col-span-2 ">
              <CardHeader>
                <CardTitle className="text-black">Bandwidth Utilization</CardTitle>
              </CardHeader>
              <CardContent className="flex justify-center pb-6">
                <BandwidthUtilizationChart />
              </CardContent>
            </Card>
          </div>
          
          {/* Tables Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* OLT Status Table */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2 text-black">
                <CardTitle>OLT Status</CardTitle>
                <Button variant="link" className="text-blue-600">View All</Button>
              </CardHeader>
              <CardContent className="overflow-x-auto">
                <div className="min-w-full">
                  <table className="w-full">
                    <thead>
                      <tr className="text-left text-black border-b">
                        <th className="pb-2 font-medium text-black">OLT Name</th>
                        <th className="pb-2 font-medium text-black">Location</th>
                        <th className="pb-2 font-medium text-black">Status</th>
                        <th className="pb-2 font-medium text-black">Load</th>
                        <th className="pb-2 font-medium text-black">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.oltStatus.map((olt, index) => (
                        <tr key={olt.name} className={index < data.oltStatus.length - 1 ? "border-b" : ""}>
                          <td className="py-3 text-black">{olt.name}</td>
                          <td className="text-black">{olt.location}</td>
                          <td>
                            <Badge 
                              className={`
                                ${olt.status === "Active" ? "bg-green-100 text-green-600" : 
                                  olt.status === "Warning" ? "bg-red-100 text-red-600" : 
                                  "bg-yellow-100 text-yellow-600"}
                              `}
                            >
                              {olt.status}
                            </Badge>
                          </td>
                          <td>
                            <div className="flex items-center">
                              <Progress 
                                value={olt.load} 
                                className="h-2 w-24 mr-2" 
                                indicatorClassName={`
                                  ${olt.load > 85 ? "bg-red-500" : 
                                    olt.load > 70 ? "bg-yellow-500" : 
                                    "bg-green-600"}
                                `}
                              />
                              <span className="text-sm text-black">{olt.load}%</span>
                            </div>
                          </td>
                          <td>
                            <Button variant="ghost" size="icon">
                              <MoreVertical className="h-5 w-5 text-black" />
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
            
            {/* Recent Alerts */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2 text-black">
                <CardTitle>Recent Alerts</CardTitle>
                <Button variant="link" className="text-blue-600">View All</Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {data.recentAlerts.map((alert) => (
                    <div key={`${alert.device}-${alert.type}`} className="flex items-center p-3 bg-gray-50 rounded-lg">
                      <div className={`
                        h-10 w-10 rounded-full flex items-center justify-center mr-4
                        ${alert.severity === "critical" ? "bg-red-100" : 
                          alert.severity === "warning" ? "bg-orange-100" : "bg-yellow-100"}
                      `}>
                        <AlertCircle className={`
                          h-5 w-5
                          ${alert.severity === "critical" ? "text-red-500" : 
                            alert.severity === "warning" ? "text-orange-500" : "text-yellow-500"}
                        `} />
                      </div>
                      <div className="flex-1">
                        <div className={`font-medium 
                          ${alert.severity === "critical" ? "text-red-500" : 
                            alert.severity === "warning" ? "text-orange-500" : "text-yellow-500"}
                        `}>
                          {alert.type}
                        </div>
                        <div className="text-sm text-black">{alert.device} • {alert.time}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default NetworkDashboard;