"use client";

import React, { useState, useEffect } from 'react';
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
import { sendPasswordResetEmail } from "../scripts/smtp-email";
import CommunicationSettings from "../scripts/communication-settings";
import { getCommunicationSettings, upsertCommunicationSettings } from "../scripts/supabase-comm";
import { getUsers, addUser, updateUser, deleteUser } from "../scripts/supabase-users";
import LogoutButton from '@/components/logoutButton';
const smtpConfig = {
  host: "smtp.example.com",
  port: 465,
  username: "admin@example.com",
  password: "yourpassword",
  from: "admin@example.com",
};

const AdminPanel = () => {
  const [users, setUsers] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [usersError, setUsersError] = useState(null);

  useEffect(() => {
    async function fetchUsers() {
      setLoadingUsers(true);
      setUsersError(null);
      try {
        const data = await getUsers();
        setUsers(data || []);
      } catch (err) {
        setUsersError("Failed to load users");
      } finally {
        setLoadingUsers(false);
      }
    }
    fetchUsers();
  }, []);

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

  const tabs = ['Users', 'Devices', 'Locations', 'PONs', 'Permissions', 'Communication'];

  const [editFormData, setEditFormData] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [resettingUserId, setResettingUserId] = useState(null);
  const [resetStatus, setResetStatus] = useState({});
  // Communication settings state
  const [smtpConfig, setSmtpConfig] = useState({
    host: "",
    port: 465,
    username: "",
    password: "",
    from: "",
  });
  const [welcomeTemplate, setWelcomeTemplate] = useState("");
  const [resetTemplate, setResetTemplate] = useState("");
  const [loadingComm, setLoadingComm] = useState(true);
  const [commError, setCommError] = useState("");

  // Load communication settings from Supabase on mount
  React.useEffect(() => {
    async function fetchCommSettings() {
      setLoadingComm(true);
      setCommError("");
      try {
        const data = await getCommunicationSettings();
        if (data) {
          setSmtpConfig(data.smtp || {});
          setWelcomeTemplate(data.welcome_template || "");
          setResetTemplate(data.reset_template || "");
        }
      } catch (err) {
        setCommError("Failed to load communication settings");
      } finally {
        setLoadingComm(false);
      }
    }
    fetchCommSettings();
  }, []);

  // Save communication settings to Supabase
  const handleSaveCommunicationSettings = async ({ smtp, welcomeMessage, resetMessage }) => {
    setSmtpConfig(smtp);
    setWelcomeTemplate(welcomeMessage);
    setResetTemplate(resetMessage);
    try {
      await upsertCommunicationSettings({
        smtp,
        welcome_template: welcomeMessage,
        reset_template: resetMessage,
      });
    } catch (err) {
      // Optionally handle error
    }
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
    setEditFormData({
      id: user.id,
      name: user.name,
      email: user.email,
      role_id: user.role_id,
    });
    setShowEditModal(true);
  };

  const handleAddUser = () => {
    setEditFormData({
      name: '',
      email: '',
      role_id: 'User',
    });
    setSelectedUser(null);
    setShowAddModal(true);
  };

  const handleSaveAddUser = async (e) => {
    e.preventDefault();
    try {
      await addUser({
        name: editFormData.name,
        email: editFormData.email,
        role_id: editFormData.role_id,
      });
      setShowAddModal(false);
      // Refresh users list
      setLoadingUsers(true);
      const data = await getUsers();
      setUsers(data || []);
    } catch (err) {
      alert("Failed to add user: " + (err.message || err));
    } finally {
      setLoadingUsers(false);
    }
  };

  const handleSaveEditUser = async (e) => {
    e.preventDefault();
    try {
      await updateUser({
        id: editFormData.id,
        name: editFormData.name,
        email: editFormData.email,
        role_id: editFormData.role_id,
      });
      handleCloseModal();
      // Refresh users list
      setLoadingUsers(true);
      const data = await getUsers();
      setUsers(data || []);
    } catch (err) {
      alert("Failed to update user: " + (err.message || err));
    } finally {
      setLoadingUsers(false);
    }
  };

  const handleDeleteUser = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      await deleteUser(id);
      // Refresh users list
      setLoadingUsers(true);
      const data = await getUsers();
      setUsers(data || []);
    } catch (err) {
      alert("Failed to delete user: " + (err.message || err));
    } finally {
      setLoadingUsers(false);
    }
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
    switch (role) {
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
                      ID
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      NAME
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      EMAIL
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      ROLE ID
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      CREATED AT
                    </th>
                    <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      ACTION
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
  {activeTab === 'Users' ? (
    loadingUsers ? (
      <tr><td colSpan="100%" className="p-6 text-center">Loading users...</td></tr>
    ) : usersError ? (
      <tr><td colSpan="100%" className="p-6 text-center text-red-600">{usersError}</td></tr>
    ) : users.length === 0 ? (
      <tr><td colSpan="100%" className="p-6 text-center">No users found.</td></tr>
    ) : (
      users.map((user) => (
        <tr key={user.id} className="hover:bg-gray-50">
          <td className="px-6 py-4 whitespace-nowrap text-black">
            {user.id}
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-black">
            {user.name}
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-black">
            {user.email}
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-black">
            <span className={`px-2 py-1 rounded-md text-xs font-semibold ${getRoleBadgeClass(user.role_id)}`}>
              {user.role_id}
            </span>
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-black">
            {user.created_at ? new Date(user.created_at).toLocaleString() : ''}
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-center">
            <div className="flex justify-center space-x-2">
              <Button size="sm" variant="outline" onClick={() => handleEdit(user)}>
                Edit
              </Button>
              <Button size="sm" variant="destructive" className="bg-red-600 hover:bg-red-700 text-white transition-colors duration-150" onClick={() => handleDeleteUser(user.id)}>
                Delete
              </Button>
              <Button size="sm" variant="secondary" className="bg-green-700 hover:bg-green-800 text-white transition-colors duration-150" onClick={() => handleResetPassword(user.id)} disabled={resettingUserId === user.id}>
                {resettingUserId === user.id ? "Sending..." : "Reset Password"}
              </Button>
              {resetStatus[user.id] && (
                <div className="text-xs mt-1 text-gray-700">{resetStatus[user.id]}</div>
              )}
            </div>
          </td>
        </tr>
      ))
    )
  ) : activeTab === 'Communication' ? (
    <tr key="communication-settings-row">
      <td colSpan="100%">
        {loadingComm ? (
          <div className="p-6 text-center">Loading communication settings...</div>
        ) : commError ? (
          <div className="p-6 text-center text-red-600">{commError}</div>
        ) : (
          <div>
            <CommunicationSettings
              initialSmtp={smtpConfig}
              initialWelcomeMessage={welcomeTemplate}
              initialResetMessage={resetTemplate}
              onSave={handleSaveCommunicationSettings}
            />
          </div>
        )}
      </td>
    </tr>
  ) : null}
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
                    className={`relative inline-flex items-center px-4 py-2 border ${currentPage === 1
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
                    className={`relative inline-flex items-center px-4 py-2 border ${currentPage === 2
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
                    className={`relative inline-flex items-center px-4 py-2 border ${currentPage === 3
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
                    className={`relative inline-flex items-center px-4 py-2 border ${currentPage === 16
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
            &copy; 2025 DOTMAC Network Management System v4.2.1
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
                    <label className="block text-sm text-gray-500 mb-1">Role ID:</label>
                    <select
                      value={editFormData.role_id}
                      onChange={e => setEditFormData({ ...editFormData, role_id: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 appearance-none"
                    >
                      <option value="Admin">Admin</option>
                      <option value="Tech">Tech</option>
                      <option value="User">User</option>
                    </select>
                  </div>
                </div>
                <div>
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
                    role_id: 'User',
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
                    <label className="block text-sm text-gray-500 mb-1">Role ID:</label>
                    <select
                      value={editFormData.role_id}
                      onChange={e => setEditFormData({ ...editFormData, role_id: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 appearance-none"
                    >
                      <option value="Admin">Admin</option>
                      <option value="Tech">Tech</option>
                      <option value="User">User</option>
                    </select>
                  </div>
                </div>
                <div>
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
}

export default AdminPanel;