"use client";

import React, { useState } from 'react';
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
  MoreVertical,
  Filter,
  Download,
  ArrowUpDown
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";

const CustomersPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  
  // Mock customer data - in a real app, this would come from an API
  const customers = [
    {
      id: 1,
      name: "Tech Support",
      sn: "HWTC69FE6F9E",
      onu: "Garki Huawei OLT gpon-onu_0/2/1:1",
      zone: "Zone 1",
      odb: "None",
      signal: 4, // 0-4 scale for signal strength
      connectionType: "PPPoE",
      vlan: "203",
      type: "EG8145V5",
      authDate: "10-04-2025",
      status: "active"
    },
    {
      id: 2,
      name: "Youth Hub Africa",
      sn: "HWTCABEF7A3C",
      onu: "Garki Huawei OLT gpon-onu_0/2/6:6", 
      zone: "Zone 4",
      odb: "None",
      signal: 3,
      connectionType: "PPPoE",
      vlan: "203",
      type: "EG8145V5",
      authDate: "10-04-2025",
      status: "active"
    },
    {
      id: 3,
      name: "Abubakar Hassan Baba",
      sn: "HWTCA31D9901",
      onu: "Gwarimpa Huawei OLT 2 gpon-onu_0/2/4:8",
      zone: "Zone 1",
      odb: "None",
      signal: 4,
      connectionType: "PPPoE",
      vlan: "203",
      type: "HG8546M",
      authDate: "08-04-2025",
      status: "maintenance"
    },
    {
      id: 4,
      name: "System Admin",
      sn: "HWTT206F94A9",
      onu: "Garki Huawei OLT gpon-onu_0/2/1:5",
      zone: "Zone 1",
      odb: "None",
      signal: 3,
      connectionType: "PPPoE",
      vlan: "203",
      type: "EG8145V5",
      authDate: "07-04-2025",
      status: "active"
    },
    {
      id: 5,
      name: "Felix Nwogorh-katampe",
      sn: "HWTCA31D9967",
      onu: "Gwarimpa Huawei OLT 2 gpon-onu_0/2/4:7",
      zone: "Zone 1",
      odb: "None",
      signal: 4,
      connectionType: "PPPoE",
      vlan: "203", 
      type: "HG8546M",
      authDate: "07-04-2025",
      status: "active"
    },
    {
      id: 6,
      name: "Daniel Komolafe",
      sn: "HWTCA31D98FB",
      onu: "Gwarimpa Huawei OLT 2 gpon-onu_0/2/4:6",
      zone: "Zone 1",
      odb: "None",
      signal: 3,
      connectionType: "Bridge",
      vlan: "203",
      type: "HG8546M",
      authDate: "07-04-2025",
      status: "active"
    },
    {
      id: 7,
      name: "Faizah Shittu",
      sn: "HWTCA31D9937",
      onu: "Garki Huawei OLT gpon-onu_0/2/11:11",
      zone: "Zone 1",
      odb: "None",
      signal: 1,
      connectionType: "PPPoE",
      vlan: "203",
      type: "HG8546M",
      authDate: "04-04-2025",
      status: "active"
    },
    {
      id: 8,
      name: "British School of Outdoor",
      sn: "HWTCA31D9919",
      onu: "Gwarimpa Huawei OLT 2 gpon-onu_0/2/5:2",
      zone: "Zone 1",
      odb: "None",
      signal: 4,
      connectionType: "PPPoE",
      vlan: "203",
      type: "HG8546M",
      authDate: "03-04-2025",
      status: "active"
    }
  ];

  // Filter customers based on search query
  const filteredCustomers = customers.filter(customer => {
    return customer.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
           customer.sn.toLowerCase().includes(searchQuery.toLowerCase()) ||
           customer.onu.toLowerCase().includes(searchQuery.toLowerCase());
  });

  // Helper function to render signal strength indicator
  const renderSignalStrength = (signal) => {
    const bars = [];
    for (let i = 0; i < 4; i++) {
      const barClass = i < signal ? "bg-green-500" : "bg-gray-200";
      bars.push(
        <div 
          key={i} 
          className={`h-3 w-1 ${barClass} ${i > 0 ? "ml-1" : ""}`}
        />
      );
    }
    return <div className="flex items-end">{bars}</div>;
  };

  // Handle various button clicks
  const handleViewCustomer = (customerId) => {
    console.log("View customer with ID:", customerId);
    // In a real app, navigate to customer detail page
    // router.push(`/customers/${customerId}`);
  };

  const handleAddCustomer = () => {
    console.log("Add customer clicked");
    // In a real app, navigate to add customer form or open a modal
  };

  const handleExport = () => {
    console.log("Export data clicked");
    // In a real app, trigger an API call to export customer data
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    console.log("Changing to page:", page);
    // In a real app, fetch data for the selected page
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
            <Link href="/dashboard">
              <Button 
                variant="ghost" 
                className="w-full justify-start text-white hover:bg-green-700 hover:text-white px-4 py-2 rounded-lg mb-1"
              >
                <LayoutDashboard className="mr-2 h-5 w-5" />
                Dashboard
              </Button>
            </Link>
            
            <Link href="/customers">
              <Button 
                variant="ghost" 
                className="w-full justify-start bg-green-700 text-white hover:bg-green-600 hover:text-white px-4 py-2 rounded-lg mb-1"
              >
                <Users className="mr-2 h-5 w-5" />
                Customers
              </Button>
            </Link>
            
            <Link href="/olt-management">
              <Button 
                variant="ghost" 
                className="w-full justify-start text-white hover:bg-green-700 hover:text-white px-4 py-2 rounded-lg mb-1"
              >
                <CheckCircle className="mr-2 h-5 w-5" />
                OLT Management
              </Button>
            </Link>
            
            <Link href="/ont-management">
              <Button 
                variant="ghost" 
                className="w-full justify-start text-white hover:bg-green-700 hover:text-white px-4 py-2 rounded-lg mb-1"
              >
                <Network className="mr-2 h-5 w-5" />
                ONT Management
              </Button>
            </Link>
            
            <Link href="/network-maps">
              <Button 
                variant="ghost" 
                className="w-full justify-start text-white hover:bg-green-700 hover:text-white px-4 py-2 rounded-lg mb-1"
              >
                <LineChart className="mr-2 h-5 w-5" />
                Network Maps
              </Button>
            </Link>
            
            <Link href="/graphs">
              <Button 
                variant="ghost" 
                className="w-full justify-start text-white hover:bg-green-700 hover:text-white px-4 py-2 rounded-lg mb-1"
              >
                <BarChart className="mr-2 h-5 w-5" />
                Graphs
              </Button>
            </Link>
            
            <Link href="/configured">
              <Button 
                variant="ghost" 
                className="w-full justify-start text-white hover:bg-green-700 hover:text-white px-4 py-2 rounded-lg mb-1"
              >
                <Settings className="mr-2 h-5 w-5" />
                Configured
              </Button>
            </Link>
            
            <Link href="/unconfigured">
              <Button 
                variant="ghost" 
                className="w-full justify-start text-white hover:bg-green-700 hover:text-white px-4 py-2 rounded-lg mb-1"
              >
                <Plus className="mr-2 h-5 w-5" />
                Unconfigured
              </Button>
            </Link>
            
            <Link href="/diagnostics">
              <Button 
                variant="ghost" 
                className="w-full justify-start text-white hover:bg-green-700 hover:text-white px-4 py-2 rounded-lg mb-1"
              >
                <Activity className="mr-2 h-5 w-5" />
                Diagnostics
              </Button>
            </Link>
            
            <Link href="/reports">
              <Button 
                variant="ghost" 
                className="w-full justify-start text-white hover:bg-green-700 hover:text-white px-4 py-2 rounded-lg mb-1"
              >
                <FileText className="mr-2 h-5 w-5" />
                Reports
              </Button>
            </Link>
            
            <Link href="/admin">
              <Button 
                variant="ghost" 
                className="w-full justify-start text-white hover:bg-green-700 hover:text-white px-4 py-2 rounded-lg mb-1"
              >
                <Settings2 className="mr-2 h-5 w-5" />
                Admin
              </Button>
            </Link>
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
          <Button 
            variant="ghost" 
            className="w-full justify-start text-white hover:bg-green-700 hover:text-white px-4 py-2 rounded-lg"
            onClick={() => console.log("Logout clicked")}
          >
            <LogOut className="mr-2 h-5 w-5" />
            Log Out
          </Button>
        </div>
      </div>
      
      {/* Mobile Sidebar Toggle - only visible on small screens */}
      <div className="md:hidden fixed bottom-4 right-4 z-50">
        <Button 
          className="rounded-full h-12 w-12 p-0 bg-green-600 hover:bg-green-700 text-white"
          onClick={() => console.log("Mobile menu toggle clicked")}
        >
          <LayoutDashboard className="h-6 w-6" />
        </Button>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navigation */}
        <header className="bg-white shadow-sm z-10">
          <div className="px-6 py-3 flex items-center justify-between">
            <div className="relative w-64">
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
              <input
                type="search"
                placeholder="Search..."
                className="w-full pl-8 pr-4 py-2 rounded-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500 text-black"
              />
            </div>
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                size="icon" 
                className="relative"
                onClick={() => console.log("Notifications clicked")}
              >
                <Bell className="h-5 w-5 text-gray-700" />
                <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
              </Button>
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => console.log("Settings clicked")}
              >
                <Settings className="h-5 w-5 text-gray-700" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => console.log("Help clicked")}
              >
                <HelpCircle className="h-5 w-5 text-gray-700" />
              </Button>
            </div>
          </div>
        </header>
        
        {/* Main Customers Content */}
        <main className="flex-1 overflow-y-auto p-6 bg-gray-100">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-black">Customer Management</h1>
              <p className="text-gray-600">Manage and monitor customer ONTs and connections</p>
            </div>
            <div className="flex items-center space-x-2 mt-3 sm:mt-0">
              <Button 
                variant="outline" 
                className="bg-white text-gray-700"
                onClick={() => console.log("Filter clicked")}
              >
                <Filter className="mr-2 h-4 w-4" />
                Filters
              </Button>
              <Button 
                variant="outline" 
                className="bg-white text-gray-700"
                onClick={handleExport}
              >
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
              <Button 
                className="bg-green-600 hover:bg-green-700 text-white"
                onClick={handleAddCustomer}
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Customer
              </Button>
            </div>
          </div>
          
          {/* Filters & Search Row */}
          <Card className="mb-6">
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
                <div className="relative">
                  <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input 
                    placeholder="Search by name, SN, ONU..." 
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                {/* Status filter dropdown would go here */}
                {/* We'll add other filters once we have the Select component */}
              </div>
            </CardContent>
          </Card>
          
          {/* Customer Table */}
          <Card>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle>Customers</CardTitle>
                <div className="text-sm text-gray-500">
                  Showing {filteredCustomers.length} of {customers.length} customers
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left border-b">
                      <th className="pb-2 font-medium text-gray-600">
                        <div className="flex items-center">
                          Status
                        </div>
                      </th>
                      <th className="pb-2 font-medium text-gray-600">
                        <div className="flex items-center cursor-pointer" onClick={() => console.log("Sort by name")}>
                          Name
                          <ArrowUpDown className="ml-1 h-4 w-4" />
                        </div>
                      </th>
                      <th className="pb-2 font-medium text-gray-600">SN/MAC</th>
                      <th className="pb-2 font-medium text-gray-600">ONU</th>
                      <th className="pb-2 font-medium text-gray-600">Zone</th>
                      <th className="pb-2 font-medium text-gray-600">ODB</th>
                      <th className="pb-2 font-medium text-gray-600">Signal</th>
                      <th className="pb-2 font-medium text-gray-600">B/R</th>
                      <th className="pb-2 font-medium text-gray-600">VLAN</th>
                      <th className="pb-2 font-medium text-gray-600">Type</th>
                      <th className="pb-2 font-medium text-gray-600">Auth date</th>
                      <th className="pb-2 font-medium text-gray-600">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredCustomers.map((customer) => (
                      <tr key={customer.id} className="border-b hover:bg-gray-50">
                        <td className="py-3">
                          <div className="flex items-center">
                            <div className={`h-3 w-3 rounded-full ${
                              customer.status === 'active' ? 'bg-green-500' : 
                              customer.status === 'maintenance' ? 'bg-yellow-500' : 'bg-gray-400'
                            }`}></div>
                          </div>
                        </td>
                        <td className="py-3 text-black">
                          <div className="font-medium">{customer.name}</div>
                        </td>
                        <td className="text-gray-700">{customer.sn}</td>
                        <td className="text-gray-700 max-w-xs truncate">{customer.onu}</td>
                        <td className="text-gray-700">{customer.zone}</td>
                        <td className="text-gray-700">{customer.odb}</td>
                        <td className="text-gray-700">
                          {renderSignalStrength(customer.signal)}
                        </td>
                        <td>
                          <Badge className={`${
                            customer.connectionType === 'PPPoE' ? 'bg-blue-100 text-blue-600' : 
                            'bg-purple-100 text-purple-600'
                          }`}>
                            {customer.connectionType}
                          </Badge>
                        </td>
                        <td className="text-gray-700">{customer.vlan}</td>
                        <td className="text-gray-700">{customer.type}</td>
                        <td className="text-gray-700">{customer.authDate}</td>
                        <td>
                          <div className="flex space-x-1">
                            <Button 
                              variant="secondary" 
                              size="sm" 
                              className="px-2 bg-blue-500 hover:bg-gray-200 text-gray-700"
                              onClick={() => handleViewCustomer(customer.id)}
                            >
                              View
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="icon"
                              onClick={() => console.log("More options for customer:", customer.id)}
                            >
                              <MoreVertical className="h-4 w-4 text-gray-500" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <div className="text-sm text-gray-500">
                1-{filteredCustomers.length} of {customers.length} displayed
              </div>
              <div className="flex items-center space-x-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  disabled={currentPage === 1}
                  onClick={() => handlePageChange(currentPage - 1)}
                >
                  Previous
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className={currentPage === 1 ? "bg-blue-50 font-medium" : ""}
                  onClick={() => handlePageChange(1)}
                >
                  1
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  className={currentPage === 2 ? "bg-blue-50 font-medium" : ""}
                  onClick={() => handlePageChange(2)}
                >
                  2
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  className={currentPage === 3 ? "bg-blue-50 font-medium" : ""}
                  onClick={() => handlePageChange(3)}
                >
                  3
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handlePageChange(currentPage + 1)}
                >
                  Next
                </Button>
              </div>
            </CardFooter>
          </Card>
        </main>
      </div>
    </div>
  );
};

export default CustomersPage;