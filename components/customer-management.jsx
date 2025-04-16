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
  LogOut,
  ChevronRight,
  X,
  Plus,
  Activity,
  FileText,
  Settings2,
  Filter,
  Download,
  MoreVertical
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Link from "next/link";

// Mock data for customers
const customersData = [
  { 
    id: 1, 
    name: 'Tech Support', 
    status: 'active',
    snmac: 'HWTC69FE6F9E', 
    onu: 'Garki Huawei OLT gpon-onu_0/2/1:1', 
    zone: 'Zone 1',
    odb: 'None',
    signal: 'good',
    br: 'PPPoE',
    vlan: '203',
    type: 'EG8145V5',
    authDate: '10-04-2025'
  },
  { 
    id: 2, 
    name: 'Youth Hub Africa', 
    status: 'active',
    snmac: 'HWTCABEF7A3C', 
    onu: 'Garki Huawei OLT gpon-onu_0/2/6:6', 
    zone: 'Zone 4',
    odb: 'None',
    signal: 'good',
    br: 'PPPoE',
    vlan: '203',
    type: 'EG8145V5',
    authDate: '10-04-2025'
  },
  { 
    id: 3, 
    name: 'Abubakar Hassan Baba', 
    status: 'warning',
    snmac: 'HWTCA31D9901', 
    onu: 'Gwarimpa Huawei OLT 2 gpon-onu_0/2/4:8', 
    zone: 'Zone 1',
    odb: 'None',
    signal: 'good',
    br: 'PPPoE',
    vlan: '203',
    type: 'HG8546M',
    authDate: '08-04-2025'
  },
  { 
    id: 4, 
    name: 'System Admin', 
    status: 'active',
    snmac: 'HWTT206F94A9', 
    onu: 'Garki Huawei OLT gpon-onu_0/2/1:5', 
    zone: 'Zone 1',
    odb: 'None',
    signal: 'good',
    br: 'PPPoE',
    vlan: '203',
    type: 'EG8145V5',
    authDate: '07-04-2025'
  },
  { 
    id: 5, 
    name: 'Felix Nwogorh-katampe', 
    status: 'active',
    snmac: 'HWTCA31D9967', 
    onu: 'Gwarimpa Huawei OLT 2 gpon-onu_0/2/4:7', 
    zone: 'Zone 1',
    odb: 'None',
    signal: 'good',
    br: 'PPPoE',
    vlan: '203',
    type: 'HG8546M',
    authDate: '07-04-2025'
  },
  { 
    id: 6, 
    name: 'Daniel Komolafe', 
    status: 'active',
    snmac: 'HWTCA31D98FB', 
    onu: 'Gwarimpa Huawei OLT 2 gpon-onu_0/2/4:6', 
    zone: 'Zone 1',
    odb: 'None',
    signal: 'good',
    br: 'Bridge',
    vlan: '203',
    type: 'HG8546M',
    authDate: '07-04-2025'
  },
  { 
    id: 7, 
    name: 'Faizah Shittu', 
    status: 'active',
    snmac: 'HWTCA31D9937', 
    onu: 'Garki Huawei OLT gpon-onu_0/2/11:11', 
    zone: 'Zone 1',
    odb: 'None',
    signal: 'low',
    br: 'PPPoE',
    vlan: '203',
    type: 'HG8546M',
    authDate: '04-04-2025'
  },
  { 
    id: 8, 
    name: 'British School of Outdoor', 
    status: 'active',
    snmac: 'HWTCA31D9919', 
    onu: 'Gwarimpa Huawei OLT 2 gpon-onu_0/2/5:2', 
    zone: 'Zone 1',
    odb: 'None',
    signal: 'good',
    br: 'PPPoE',
    vlan: '203',
    type: 'HG8546M',
    authDate: '03-04-2025'
  }
];

const CustomerManagement = () => {
  const [showAddCustomerModal, setShowAddCustomerModal] = useState(false);
  const [showViewCustomerModal, setShowViewCustomerModal] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const handleAddCustomer = () => {
    setShowAddCustomerModal(true);
  };

  const handleCloseAddModal = () => {
    setShowAddCustomerModal(false);
  };

  const handleViewCustomer = (customer) => {
    setSelectedCustomer(customer);
    setShowViewCustomerModal(true);
  };

  const handleCloseViewModal = () => {
    setShowViewCustomerModal(false);
    setSelectedCustomer(null);
  };

  const getStatusClass = (status) => {
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

  const getSignalStrength = (signal) => {
    switch(signal) {
      case 'good':
        return (
          <div className="flex space-x-1">
            <div className="w-2 h-4 bg-green-500 rounded-sm"></div>
            <div className="w-2 h-4 bg-green-500 rounded-sm"></div>
            <div className="w-2 h-4 bg-green-500 rounded-sm"></div>
            <div className="w-2 h-4 bg-green-500 rounded-sm"></div>
          </div>
        );
      case 'medium':
        return (
          <div className="flex space-x-1">
            <div className="w-2 h-4 bg-yellow-500 rounded-sm"></div>
            <div className="w-2 h-4 bg-yellow-500 rounded-sm"></div>
            <div className="w-2 h-4 bg-yellow-500 rounded-sm"></div>
            <div className="w-2 h-4 bg-gray-300 rounded-sm"></div>
          </div>
        );
      case 'low':
        return (
          <div className="flex space-x-1">
            <div className="w-2 h-4 bg-red-500 rounded-sm"></div>
            <div className="w-2 h-4 bg-gray-300 rounded-sm"></div>
            <div className="w-2 h-4 bg-gray-300 rounded-sm"></div>
            <div className="w-2 h-4 bg-gray-300 rounded-sm"></div>
          </div>
        );
      default:
        return (
          <div className="flex space-x-1">
            <div className="w-2 h-4 bg-gray-300 rounded-sm"></div>
            <div className="w-2 h-4 bg-gray-300 rounded-sm"></div>
            <div className="w-2 h-4 bg-gray-300 rounded-sm"></div>
            <div className="w-2 h-4 bg-gray-300 rounded-sm"></div>
          </div>
        );
    }
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
              className="w-full justify-start bg-green-700 text-white hover:bg-green-600 hover:text-white px-4 py-2 rounded-lg mb-1"
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
                <CheckCircle className="mr-2 h-5 w-5" />
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
                placeholder="Search..."
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
        
        {/* Main Customer Content */}
        <main className="flex-1 overflow-y-auto p-6 bg-gray-100">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-black">Customer Management</h1>
              <p className="text-black">Manage and monitor customer ONTs and connections</p>
            </div>
            <div className="flex items-center space-x-3">
              <Button 
                variant="outline" 
                className="bg-white text-black flex items-center"
              >
                <Filter className="mr-2 h-4 w-4" />
                Filters
              </Button>
              
              <Button 
                variant="outline" 
                className="bg-white text-black flex items-center"
              >
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>

              <Button 
                className="bg-green-600 hover:bg-green-700 text-white flex items-center"
                onClick={handleAddCustomer}
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Customer
              </Button>
            </div>
          </div>
          
          {/* Search bar */}
          <div className="mb-6">
            <div className="relative w-full max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name, SN, ONU..."
                className="pl-10 pr-4 py-2 w-full bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>
          
          {/* Customers Table */}
          <div className="bg-white rounded-md shadow-sm overflow-hidden mb-4">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      SN/MAC
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      ONU
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Zone
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      ODB
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Signal
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      B/R
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      VLAN
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Type
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Auth date
                    </th>
                    <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {customersData.map((customer) => (
                    <tr key={customer.id} className="hover:bg-gray-50">
                      <td className="px-3 py-4 whitespace-nowrap">
                        <div className={`h-3 w-3 rounded-full ${getStatusClass(customer.status)}`}></div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-black font-medium">
                        {customer.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-black">
                        {customer.snmac}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-black">
                        {customer.onu}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-black">
                        {customer.zone}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-black">
                        {customer.odb}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getSignalStrength(customer.signal)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          customer.br === 'PPPoE' 
                            ? 'bg-blue-100 text-blue-700' 
                            : 'bg-purple-100 text-purple-700'
                        }`}>
                          {customer.br}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-black">
                        {customer.vlan}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-black">
                        {customer.type}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-black">
                        {customer.authDate}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <div className="flex justify-center space-x-2">
                          <button
                            className="inline-flex items-center justify-center px-3 py-1 bg-green-600 text-white text-sm font-medium rounded-md hover:bg-green-700"
                            onClick={() => handleViewCustomer(customer)}
                          >
                            View
                          </button>
                          <button className="text-gray-400 hover:text-gray-500">
                            <MoreVertical className="h-5 w-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {/* Pagination */}
            <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200">
              <div className="text-sm text-gray-700">
                1-8 of 8 displayed
              </div>
              <div className="text-sm text-gray-700">
                Showing 8 of 8 customers
              </div>
            </div>
          </div>
        </main>
      </div>
      
      {/* Add Customer Modal */}
      {showAddCustomerModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-screen items-end justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-3xl sm:w-full sm:p-6">
              <div className="absolute top-0 right-0 pt-4 pr-4">
                <button
                  type="button"
                  className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none"
                  onClick={handleCloseAddModal}
                >
                  <span className="sr-only">Close</span>
                  <X className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              
              <div className="sm:flex sm:items-start">
                <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                  <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Add New Customer</h3>
                  
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <div className="mb-4">
                        <label className="block text-sm text-gray-500 mb-1">Customer Name *</label>
                        <input 
                          type="text" 
                          placeholder="Enter full name"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                      </div>
                      
                      <div className="mb-4">
                        <label className="block text-sm text-gray-500 mb-1">Contact Email</label>
                        <input 
                          type="email"
                          placeholder="email@example.com"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                      </div>
                      
                      <div className="mb-4">
                        <label className="block text-sm text-gray-500 mb-1">Phone Number *</label>
                        <input 
                          type="text"
                          placeholder="+234"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                      </div>
                      
                      <div className="mb-4">
                        <label className="block text-sm text-gray-500 mb-1">Address</label>
                        <input 
                          type="text"
                          placeholder="Physical address"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                      </div>

                      <div className="mb-4">
                        <label className="block text-sm text-gray-500 mb-1">Customer Type</label>
                        <div className="relative">
                          <select
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 appearance-none"
                          >
                            <option>Residential</option>
                            <option>Business</option>
                            <option>Enterprise</option>
                          </select>
                          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                            <ChevronRight className="rotate-90 h-4 w-4" />
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="mb-4">
                        <label className="block text-sm text-gray-500 mb-1">SN/MAC *</label>
                        <input 
                          type="text" 
                          placeholder="Device serial number"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                      </div>
                      
                      <div className="mb-4">
                        <label className="block text-sm text-gray-500 mb-1">ONU</label>
                        <div className="relative">
                          <select
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 appearance-none"
                          >
                            <option>Garki Huawei OLT gpon-onu_0/2/1:1</option>
                            <option>Garki Huawei OLT gpon-onu_0/2/6:6</option>
                            <option>Gwarimpa Huawei OLT 2 gpon-onu_0/2/4:8</option>
                            <option>Garki Huawei OLT gpon-onu_0/2/1:5</option>
                          </select>
                          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                            <ChevronRight className="rotate-90 h-4 w-4" />
                          </div>
                        </div>
                      </div>
                      
                      <div className="mb-4">
                        <label className="block text-sm text-gray-500 mb-1">Zone</label>
                        <div className="relative">
                        <div className="mb-4">
                            <label className="block text-sm text-gray-500 mb-1">Zone</label>
                            <div className="relative">
                              <select
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 appearance-none"
                              >
                                <option>Zone 1</option>
                                <option>Zone 2</option>
                                <option>Zone 3</option>
                                <option>Zone 4</option>
                              </select>
                              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                <ChevronRight className="rotate-90 h-4 w-4" />
                              </div>
                            </div>
                          </div>
                          
                          <div className="mb-4">
                            <label className="block text-sm text-gray-500 mb-1">Bandwidth/Rate</label>
                            <div className="relative">
                              <select
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 appearance-none"
                              >
                                <option>PPPoE</option>
                                <option>Bridge</option>
                              </select>
                              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                <ChevronRight className="rotate-90 h-4 w-4" />
                              </div>
                            </div>
                          </div>
                          
                          <div className="mb-4">
                            <label className="block text-sm text-gray-500 mb-1">Device Type</label>
                            <div className="relative">
                              <select
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 appearance-none"
                              >
                                <option>EG8145V5</option>
                                <option>HG8546M</option>
                              </select>
                              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                <ChevronRight className="rotate-90 h-4 w-4" />
                              </div>
                            </div>
                          </div>
                          
                          <div className="mb-4">
                            <label className="block text-sm text-gray-500 mb-1">VLAN</label>
                            <input 
                              type="text"
                              defaultValue="203"
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                            />
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-6">
                        <h4 className="text-base font-medium text-gray-900 mb-2">Service Options</h4>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="flex items-center">
                            <input 
                              type="checkbox" 
                              id="internet-service" 
                              className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                              defaultChecked={true}
                            />
                            <label htmlFor="internet-service" className="ml-2 block text-sm text-gray-700">
                              Internet Service
                            </label>
                          </div>
                          
                          <div className="flex items-center">
                            <input 
                              type="checkbox" 
                              id="iptv-service" 
                              className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                            />
                            <label htmlFor="iptv-service" className="ml-2 block text-sm text-gray-700">
                              IPTV Service
                            </label>
                          </div>
                          
                          <div className="flex items-center">
                            <input 
                              type="checkbox" 
                              id="voip-service" 
                              className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                            />
                            <label htmlFor="voip-service" className="ml-2 block text-sm text-gray-700">
                              VoIP Service
                            </label>
                          </div>
                          
                          <div className="flex items-center">
                            <input 
                              type="checkbox" 
                              id="static-ip" 
                              className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                            />
                            <label htmlFor="static-ip" className="ml-2 block text-sm text-gray-700">
                              Static IP
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                    <Button
                      className="w-full bg-green-600 hover:bg-green-700 text-white"
                    >
                      Add Customer
                    </Button>
                    <Button
                      variant="outline"
                      className="mt-3 w-full sm:mt-0"
                      onClick={handleCloseAddModal}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* View Customer Modal */}
      {showViewCustomerModal && selectedCustomer && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-screen items-end justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-3xl sm:w-full sm:p-6">
              <div className="absolute top-0 right-0 pt-4 pr-4">
                <button
                  type="button"
                  className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none"
                  onClick={handleCloseViewModal}
                >
                  <span className="sr-only">Close</span>
                  <X className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">Customer Details</h3>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    selectedCustomer.status === 'active' 
                      ? 'bg-green-100 text-green-800' 
                      : selectedCustomer.status === 'warning'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {selectedCustomer.status === 'active' ? 'Active' : selectedCustomer.status === 'warning' ? 'Warning' : 'Inactive'}
                  </span>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-md mb-6">
                  <h4 className="text-base font-medium text-gray-900 mb-3">{selectedCustomer.name}</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Customer ID</p>
                      <p className="font-medium">CUST-{String(selectedCustomer.id).padStart(4, '0')}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Contact</p>
                      <p className="font-medium">+234 800 123 4567</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="font-medium">{selectedCustomer.name.toLowerCase().replace(/\s+/g, '.')}@example.com</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Added Date</p>
                      <p className="font-medium">{selectedCustomer.authDate}</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-md mb-6">
                  <h4 className="text-base font-medium text-gray-900 mb-3">Connection Details</h4>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">SN/MAC</p>
                      <p className="font-medium">{selectedCustomer.snmac}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">ONU</p>
                      <p className="font-medium">{selectedCustomer.onu}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Zone</p>
                      <p className="font-medium">{selectedCustomer.zone}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Bandwidth/Rate</p>
                      <p className="font-medium">{selectedCustomer.br}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">VLAN</p>
                      <p className="font-medium">{selectedCustomer.vlan}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Device Type</p>
                      <p className="font-medium">{selectedCustomer.type}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Signal Quality</p>
                      <div className="flex items-center mt-1">
                        {getSignalStrength(selectedCustomer.signal)}
                        <span className="ml-2 text-sm">
                          {selectedCustomer.signal === 'good' 
                            ? 'Good' 
                            : selectedCustomer.signal === 'medium'
                            ? 'Average'
                            : 'Poor'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-md mb-6">
                  <h4 className="text-base font-medium text-gray-900 mb-3">Subscription</h4>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Package</p>
                      <p className="font-medium">Premium Fiber 50Mbps</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Monthly Fee</p>
                      <p className="font-medium">₦45,000</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Payment Status</p>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Paid
                      </span>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Next Billing</p>
                      <p className="font-medium">May 10, 2025</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Additional Services</p>
                      <p className="font-medium">
                        {selectedCustomer.id % 2 === 0 ? 'IPTV, Static IP' : 'None'}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 flex justify-end space-x-3">
                  <Button
                    variant="outline"
                    className="bg-white text-black"
                  >
                    Edit Customer
                  </Button>
                  <Button
                    className="bg-green-600 hover:bg-green-700 text-white"
                  >
                    Run Diagnostics
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerManagement;