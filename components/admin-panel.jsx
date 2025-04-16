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
  User,
  Laptop,
  MapPin,
  Cable,
  Shield
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Link from "next/link";

// Mock data for users
const usersData = [
  { 
    id: 1, 
    name: 'John Doe', 
    role: 'Admin', 
    snmac: '00:1A:2B:3C:4D:5E', 
    location: 'Head Office (North Zone)', 
    pon: 'OLT-North-01 P1/1/1', 
    created: 'Apr 01, 2025',
    email: 'john.doe@example.com',
    status: 'Active',
    lastLogin: 'Apr 09, 2025 11:23:45'
  },
  { 
    id: 2, 
    name: 'Sarah Adams', 
    role: 'Tech', 
    snmac: '00:2C:3D:4E:5F:6G', 
    location: 'Smith Residence (East Zone)', 
    pon: 'OLT-East-01 P1/1/2', 
    created: 'Mar 15, 2025'
  },
  { 
    id: 3, 
    name: 'Tom Wilson', 
    role: 'Tech', 
    snmac: '00:3D:4E:5F:6G:7H', 
    location: 'Clark Building (West Zone)', 
    pon: 'OLT-West-05 P2/1/1', 
    created: 'Mar 10, 2025'
  },
  { 
    id: 4, 
    name: 'Maria Rodriguez', 
    role: 'Tech', 
    snmac: '00:4E:5F:6G:7H:8I', 
    location: 'Johnson Home (East Zone)', 
    pon: 'OLT-East-01 P1/2/2', 
    created: 'Feb 28, 2025'
  },
  { 
    id: 5, 
    name: 'Alex Johnson', 
    role: 'User', 
    snmac: '00:5F:6G:7H:8I:9J', 
    location: 'Taylor House (West Zone)', 
    pon: 'OLT-West-05 P2/1/2', 
    created: 'Feb 22, 2025'
  },
  { 
    id: 6, 
    name: 'David Martinez', 
    role: 'Tech', 
    snmac: '00:6G:7H:8I:9J:0K', 
    location: 'Davis Office (East Zone)', 
    pon: 'OLT-East-01 P1/3/1', 
    created: 'Feb 15, 2025'
  },
  { 
    id: 7, 
    name: 'Emma Wilson', 
    role: 'User', 
    snmac: '00:7H:8I:9J:0K:1L', 
    location: 'Brown Building (West Zone)', 
    pon: 'OLT-West-05 P2/2/1', 
    created: 'Feb 10, 2025'
  },
  { 
    id: 8, 
    name: 'Robert Chen', 
    role: 'User', 
    snmac: '00:8I:9J:0K:1L:2M', 
    location: 'Anderson Office (South Zone)', 
    pon: 'OLT-South-02 P4/1/1', 
    created: 'Feb 05, 2025'
  },
  { 
    id: 9, 
    name: 'Linda Parker', 
    role: 'User', 
    snmac: '00:9J:0K:1L:2M:3N', 
    location: 'Clark Building (South Zone)', 
    pon: 'OLT-South-02 P4/1/2', 
    created: 'Jan 28, 2025'
  }
];

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState('Users');
  const [currentPage, setCurrentPage] = useState(1);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [filterRole, setFilterRole] = useState('Any');
  const [filterStatus, setFilterStatus] = useState('Active');
  const [filterDate, setFilterDate] = useState('Any date');
  const totalItems = 156;
  const itemsPerPage = 9;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const tabs = ['Users', 'Devices', 'Locations', 'PONs', 'Permissions'];

  const [editFormData, setEditFormData] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);

  const handleEdit = (user) => {
    setSelectedUser(user);
    setEditFormData({ ...user, permissions: user.permissions || {} });
    setShowEditModal(true);
  };
  
  const handleAddUser = () => {
    setEditFormData({
      name: '',
      email: '',
      role: 'User',
      status: 'Active',
      snmac: '',
      location: '',
      pon: '',
      lastLogin: '',
      permissions: {},
    });
    setSelectedUser(null);
    setShowAddModal(true);
  };

  const handleSaveAddUser = (e) => {
    e.preventDefault();
    // In a real app, update state; for mock/demo, just log or refresh
    // usersData.push({ ...editFormData, id: usersData.length + 1, created: new Date().toLocaleDateString() });
    setShowAddModal(false);
  };

  const handleSaveEditUser = (e) => {
    e.preventDefault();
    // Update usersData here (mock update or real API call)
    handleCloseModal();
  };

  const handleCloseModal = () => {
    setShowEditModal(false);
    setSelectedUser(null);
  };

  const handleApplyFilters = () => {
    // Apply filter logic would go here
    console.log("Applying filters:", { filterRole, filterStatus, filterDate });
  };

  const handleResetFilters = () => {
    setFilterRole('Any');
    setFilterStatus('Active');
    setFilterDate('Any date');
  };

  const getRoleBadgeClass = (role) => {
    switch(role) {
      case 'Admin':
        return 'bg-blue-100 text-blue-700';
      case 'Tech':
        return 'bg-green-100 text-green-700';
      case 'User':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
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
               className="w-full justify-start bg-green-700 text-white hover:bg-green-600 hover:text-white px-4 py-2 rounded-lg mb-1"
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
                placeholder="Search users, devices..."
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
        
        {/* Main Admin Content */}
        <main className="flex-1 overflow-y-auto p-6 bg-gray-100">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-black">Administration Panel</h1>
              <p className="text-black">Manage users, devices, locations and network configurations</p>
            </div>
            <div className="flex items-center space-x-3">
              <Button className="bg-green-600 hover:bg-green-700 text-white" onClick={handleAddUser}>
                Add New User
              </Button>
              <Button variant="outline" className="bg-white text-black">
                Export
              </Button>
            </div>
          </div>
          
          {/* Admin Tabs */}
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
          
          {/* Filters */}
          <div className="bg-white rounded-md p-4 mb-6">
            <div className="flex flex-wrap gap-4 items-center">
              <div className="text-black font-medium">Filter By:</div>
              
              <div className="flex items-center space-x-2">
                <select 
                  value={filterRole}
                  onChange={(e) => setFilterRole(e.target.value)}
                  className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option>Any</option>
                  <option>Admin</option>
                  <option>Tech</option>
                  <option>User</option>
                </select>
                
                <select 
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option>Active</option>
                  <option>Inactive</option>
                  <option>Suspended</option>
                </select>
                
                <select 
                  value={filterDate}
                  onChange={(e) => setFilterDate(e.target.value)}
                  className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option>Any date</option>
                  <option>Today</option>
                  <option>Last 7 days</option>
                  <option>Last 30 days</option>
                  <option>Last 90 days</option>
                </select>
              </div>
              
              <Button 
                className="bg-green-600 hover:bg-green-700 text-white"
                onClick={handleApplyFilters}
              >
                Apply
              </Button>
              
              <Button 
                variant="outline" 
                className="text-black"
                onClick={handleResetFilters}
              >
                Reset
              </Button>
              
              <div className="ml-auto">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search"
                    className="pl-9 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
              </div>
            </div>
          </div>
          
          {/* Users Table */}
          <div className="bg-white rounded-md shadow-sm overflow-hidden mb-4">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      NAME
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      ROLE
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
                      CREATED
                    </th>
                    <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      ACTION
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {usersData.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-black">
                        {user.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getRoleBadgeClass(user.role)}`}>
                          {user.role}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-black">
                        {user.snmac}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-black">
                        {user.location}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-black">
                        {user.pon}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-black">
                        {user.created}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <div className="flex justify-center space-x-2">
                          <button
                            className="text-green-600 hover:text-green-800 text-sm font-medium"
                            onClick={() => handleEdit(user)}
                          >
                            Edit
                          </button>
                          <button
                            className="text-red-600 hover:text-red-800 text-sm font-medium"
                          >
                            Delete
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
                Showing 1-9 of 156 users
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
                    variant={currentPage === 16 ? 'default' : 'outline'} 
                    size="sm" 
                    className={`relative inline-flex items-center px-4 py-2 border ${
                      currentPage === 16 
                        ? 'bg-green-600 text-white border-green-600' 
                        : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
                    }`}
                    onClick={() => setCurrentPage(16)}
                  >
                    16
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                    disabled={currentPage === 16}
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
      
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
          <div className="relative bg-white rounded-xl shadow-2xl p-8 w-full max-w-2xl pointer-events-auto">
            <button
              type="button"
              className="absolute top-4 right-4 bg-white rounded-full text-gray-400 hover:text-gray-600 focus:outline-none"
              onClick={() => setShowAddModal(false)}
              aria-label="Close"
            >
              <X className="h-6 w-6" />
            </button>
            <h3 className="text-2xl font-semibold text-gray-900 mb-6">Add New User</h3>
            <form
              onSubmit={handleSaveAddUser}
              className="space-y-6"
              autoComplete="off"
            >
              <div className="grid grid-cols-2 gap-6">
          <div>
            <div className="mb-4">
              <label className="block text-sm text-gray-500 mb-1">Name:</label>
              <input
                type="text"
                value={editFormData.name}
                onChange={e => setEditFormData({ ...editFormData, name: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm text-gray-500 mb-1">Email:</label>
              <input
                type="email"
                value={editFormData.email || ''}
                onChange={e => setEditFormData({ ...editFormData, email: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm text-gray-500 mb-1">Role:</label>
              <select
                value={editFormData.role}
                onChange={e => setEditFormData({ ...editFormData, role: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 appearance-none"
              >
                <option value="Admin">Admin</option>
                <option value="Tech">Tech</option>
                <option value="User">User</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-sm text-gray-500 mb-1">Status:</label>
              <select
                value={editFormData.status || 'Active'}
                onChange={e => setEditFormData({ ...editFormData, status: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 appearance-none"
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
                <option value="Suspended">Suspended</option>
              </select>
            </div>
          </div>
          <div>
            <div className="mb-4">
              <label className="block text-sm text-gray-500 mb-1">SN/MAC:</label>
              <input
                type="text"
                value={editFormData.snmac}
                onChange={e => setEditFormData({ ...editFormData, snmac: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm text-gray-500 mb-1">Location:</label>
              <input
                type="text"
                value={editFormData.location}
                onChange={e => setEditFormData({ ...editFormData, location: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm text-gray-500 mb-1">PON:</label>
              <input
                type="text"
                value={editFormData.pon}
                onChange={e => setEditFormData({ ...editFormData, pon: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>
        </div>
        {/* Permissions (mock checkboxes) */}
        <div>
          <h4 className="text-base font-medium text-gray-900 mb-2">Permissions:</h4>
          <div className="grid grid-cols-3 gap-4">
            {['User Management', 'Network Configuration', 'Reporting', 'Device Management', 'Diagnostics', 'Billing Management'].map((perm, idx) => (
              <div className="flex items-center" key={perm}>
                <input
                  type="checkbox"
                  checked={editFormData.permissions?.[perm] || false}
                  onChange={e =>
                    setEditFormData({
                      ...editFormData,
                      permissions: {
                        ...editFormData.permissions,
                        [perm]: e.target.checked,
                      },
                    })
                  }
                  id={`perm-${idx}`}
                />
                <label htmlFor={`perm-${idx}`} className="ml-2 block text-sm text-gray-700">{perm}</label>
              </div>
            ))}
          </div>
        </div>
        {/* Actions */}
        <div className="flex justify-end gap-3 pt-4">
          <Button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white"
          >
            Save Changes
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => setEditFormData({
              name: '',
              email: '',
              role: 'User',
              status: 'Active',
              snmac: '',
              location: '',
              pon: '',
              lastLogin: '',
              permissions: {},
            })}
          >
            Reset
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => setShowAddModal(false)}
          >
            Cancel
          </Button>
        </div>
              {/* ...same form fields as your edit modal, but using editFormData... */}
              {/* ...actions: Save, Reset, Cancel... */}
            </form>
          </div>
        </div>
      )}

      {/* Edit User Modal */}
{showEditModal && selectedUser && (
  <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
    <div className="relative bg-white rounded-xl shadow-2xl p-8 w-full max-w-2xl pointer-events-auto">
      {/* Close Button */}
      <button
        type="button"
        className="absolute top-4 right-4 bg-white rounded-full text-gray-400 hover:text-gray-600 focus:outline-none"
        onClick={handleCloseModal}
        aria-label="Close"
      >
        <X className="h-6 w-6" />
      </button>
      <h3 className="text-2xl font-semibold text-gray-900 mb-6">Edit User</h3>
      <form
        onSubmit={handleSaveEditUser}
        className="space-y-6"
        autoComplete="off"
      >
        <div className="grid grid-cols-2 gap-6">
          <div>
            <div className="mb-4">
              <label className="block text-sm text-gray-500 mb-1">Name:</label>
              <input
                type="text"
                value={editFormData.name}
                onChange={e => setEditFormData({ ...editFormData, name: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm text-gray-500 mb-1">Email:</label>
              <input
                type="email"
                value={editFormData.email || ''}
                onChange={e => setEditFormData({ ...editFormData, email: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm text-gray-500 mb-1">Role:</label>
              <select
                value={editFormData.role}
                onChange={e => setEditFormData({ ...editFormData, role: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 appearance-none"
              >
                <option value="Admin">Admin</option>
                <option value="Tech">Tech</option>
                <option value="User">User</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-sm text-gray-500 mb-1">Status:</label>
              <select
                value={editFormData.status || 'Active'}
                onChange={e => setEditFormData({ ...editFormData, status: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 appearance-none"
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
                <option value="Suspended">Suspended</option>
              </select>
            </div>
          </div>
          <div>
            <div className="mb-4">
              <label className="block text-sm text-gray-500 mb-1">SN/MAC:</label>
              <input
                type="text"
                value={editFormData.snmac}
                onChange={e => setEditFormData({ ...editFormData, snmac: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm text-gray-500 mb-1">Location:</label>
              <input
                type="text"
                value={editFormData.location}
                onChange={e => setEditFormData({ ...editFormData, location: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm text-gray-500 mb-1">PON:</label>
              <input
                type="text"
                value={editFormData.pon}
                onChange={e => setEditFormData({ ...editFormData, pon: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm text-gray-500 mb-1">Last Login:</label>
              <div className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-700">
                {editFormData.lastLogin || '—'}
              </div>
            </div>
          </div>
        </div>
        {/* Permissions (mock checkboxes) */}
        <div>
          <h4 className="text-base font-medium text-gray-900 mb-2">Permissions:</h4>
          <div className="grid grid-cols-3 gap-4">
            {['User Management', 'Network Configuration', 'Reporting', 'Device Management', 'Diagnostics', 'Billing Management'].map((perm, idx) => (
              <div className="flex items-center" key={perm}>
                <input
                  type="checkbox"
                  className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                  checked={editFormData.permissions?.[perm] || false}
                  onChange={e =>
                    setEditFormData({
                      ...editFormData,
                      permissions: {
                        ...editFormData.permissions,
                        [perm]: e.target.checked,
                      },
                    })
                  }
                  id={`perm-${idx}`}
                />
                <label htmlFor={`perm-${idx}`} className="ml-2 block text-sm text-gray-700">{perm}</label>
              </div>
            ))}
          </div>
        </div>
        {/* Actions */}
        <div className="flex justify-end gap-3 pt-4">
          <Button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white"
          >
            Save Changes
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => setEditFormData({ ...selectedUser })}
          >
            Reset
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={handleCloseModal}
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  </div>
)}
    </div>
  );
};

export default AdminPanel;