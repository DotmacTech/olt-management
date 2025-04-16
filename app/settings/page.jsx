"use client";

import Link from "next/link";
import { useState } from "react";
import { 
  Settings, 
  Bell,
  Shield,
  User,
  KeyRound,
  ChevronRight,
  Save
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function SettingsPage() {
  // State for active tab
  const [activeTab, setActiveTab] = useState("general");
  
  // State for settings
  const [userSettings, setUserSettings] = useState({
    username: "admin",
    email: "admin@smartolt.com",
    language: "en",
    displayName: "Administrator"
  });
  
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });
  
  const [generalSettings, setGeneralSettings] = useState({
    darkMode: false,
    compactView: true,
    autoLogout: 30
  });
  
  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: false,
    loginNotifications: true,
    sessionTimeout: 60
  });
  
  const [notificationSettings, setNotificationSettings] = useState({
    emailAlerts: true,
    systemNotifications: true,
    criticalAlerts: true,
    maintenanceAlerts: true,
    weeklyReports: false
  });
  
  // Form handlers
  const handleUserFormChange = (e) => {
    const { name, value } = e.target;
    setUserSettings(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handlePasswordFormChange = (e) => {
    const { name, value } = e.target;
    setPasswordForm(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleToggleChange = (settingType, settingName) => {
    if (settingType === "general") {
      setGeneralSettings(prev => ({
        ...prev,
        [settingName]: !prev[settingName]
      }));
    } else if (settingType === "security") {
      setSecuritySettings(prev => ({
        ...prev,
        [settingName]: !prev[settingName]
      }));
    } else if (settingType === "notification") {
      setNotificationSettings(prev => ({
        ...prev,
        [settingName]: !prev[settingName]
      }));
    }
  };
  
  // Submit handlers
  const handleUserFormSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send data to your backend
    alert("User settings saved successfully!");
  };
  
  const handlePasswordFormSubmit = (e) => {
    e.preventDefault();
    
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      alert("New passwords don't match!");
      return;
    }
    
    if (passwordForm.newPassword.length < 8) {
      alert("Password must be at least 8 characters long!");
      return;
    }
    
    // Here you would typically send data to your backend
    alert("Password changed successfully!");
    setPasswordForm({
      currentPassword: "",
      newPassword: "",
      confirmPassword: ""
    });
  };
  
  const handleGeneralSettingsSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send data to your backend
    alert("General settings saved successfully!");
  };
  
  const handleSecuritySettingsSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send data to your backend
    alert("Security settings saved successfully!");
  };
  
  const handleNotificationSettingsSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send data to your backend
    alert("Notification settings saved successfully!");
  };
  
  // Toggle component
  const Toggle = ({ checked, onChange, label, description }) => (
    <div className="flex items-center justify-between mb-4">
      <div>
        <p className="font-medium text-gray-700">{label}</p>
        {description && <p className="text-sm text-gray-500">{description}</p>}
      </div>
      <label className="relative inline-flex items-center cursor-pointer">
        <input 
          type="checkbox" 
          className="sr-only peer" 
          checked={checked}
          onChange={onChange}
        />
        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
      </label>
    </div>
  );
  
  // Render tab content based on active tab
  const renderTabContent = () => {
    switch (activeTab) {
      case "user":
        return (
          <form onSubmit={handleUserFormSubmit}>
            <h2 className="text-xl font-semibold mb-6 text-green-700">User Settings</h2>
            <div className="space-y-4">
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                <input 
                  type="text" 
                  id="username" 
                  name="username"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500" 
                  value={userSettings.username}
                  onChange={handleUserFormChange}
                />
              </div>
              
              <div>
                <label htmlFor="displayName" className="block text-sm font-medium text-gray-700 mb-1">Display Name</label>
                <input 
                  type="text" 
                  id="displayName" 
                  name="displayName"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500" 
                  value={userSettings.displayName}
                  onChange={handleUserFormChange}
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500" 
                  value={userSettings.email}
                  onChange={handleUserFormChange}
                />
              </div>
              
              <div>
                <label htmlFor="language" className="block text-sm font-medium text-gray-700 mb-1">Language</label>
                <select 
                  id="language" 
                  name="language"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                  value={userSettings.language}
                  onChange={handleUserFormChange}
                >
                  <option value="en">English</option>
                  <option value="fr">French</option>
                  <option value="es">Spanish</option>
                  <option value="de">German</option>
                  <option value="zh">Chinese</option>
                </select>
              </div>
              
              <div className="pt-4">
                <Button type="submit" variant="default" className="bg-green-600 hover:bg-green-700 flex items-center">
                  <Save className="mr-2 h-5 w-5" />
                  Save Changes
                </Button>
              </div>
            </div>
          </form>
        );
      
      case "password":
        return (
          <form onSubmit={handlePasswordFormSubmit}>
            <h2 className="text-xl font-semibold mb-6 text-green-700">Reset Password</h2>
            <div className="space-y-4">
              <div>
                <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
                <input 
                  type="password" 
                  id="currentPassword" 
                  name="currentPassword"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500" 
                  value={passwordForm.currentPassword}
                  onChange={handlePasswordFormChange}
                  required
                />
              </div>
              
              <div>
                <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                <input 
                  type="password" 
                  id="newPassword" 
                  name="newPassword"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500" 
                  value={passwordForm.newPassword}
                  onChange={handlePasswordFormChange}
                  required
                />
                <p className="text-xs text-gray-500 mt-1">Must be at least 8 characters long</p>
              </div>
              
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
                <input 
                  type="password" 
                  id="confirmPassword" 
                  name="confirmPassword"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500" 
                  value={passwordForm.confirmPassword}
                  onChange={handlePasswordFormChange}
                  required
                />
              </div>
              
              <div className="pt-4">
                <Button type="submit" variant="default" className="bg-green-600 hover:bg-green-700 flex items-center">
                  <KeyRound className="mr-2 h-5 w-5" />
                  Change Password
                </Button>
              </div>
            </div>
          </form>
        );
        
      case "general":
        return (
          <form onSubmit={handleGeneralSettingsSubmit}>
            <h2 className="text-xl font-semibold mb-6 text-green-700">General Settings</h2>
            <div className="space-y-4">
              <Toggle 
                checked={generalSettings.darkMode} 
                onChange={() => handleToggleChange("general", "darkMode")}
                label="Dark Mode"
                description="Enable dark theme for the dashboard"
              />
              
              <Toggle 
                checked={generalSettings.compactView} 
                onChange={() => handleToggleChange("general", "compactView")}
                label="Compact View"
                description="Display more information in less space"
              />
              
              <div>
                <label htmlFor="autoLogout" className="block text-sm font-medium text-gray-700 mb-1">
                  Auto Logout (minutes)
                </label>
                <select 
                  id="autoLogout" 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                  value={generalSettings.autoLogout}
                  onChange={(e) => setGeneralSettings({...generalSettings, autoLogout: parseInt(e.target.value)})}
                >
                  <option value="15">15 minutes</option>
                  <option value="30">30 minutes</option>
                  <option value="60">1 hour</option>
                  <option value="120">2 hours</option>
                  <option value="0">Never</option>
                </select>
              </div>
              
              <div className="pt-4">
                <Button type="submit" variant="default" className="bg-green-600 hover:bg-green-700 flex items-center">
                  <Save className="mr-2 h-5 w-5" />
                  Save Changes
                </Button>
              </div>
            </div>
          </form>
        );
        
      case "security":
        return (
          <form onSubmit={handleSecuritySettingsSubmit}>
            <h2 className="text-xl font-semibold mb-6 text-green-700">Security Settings</h2>
            <div className="space-y-4">
              <Toggle 
                checked={securitySettings.twoFactorAuth} 
                onChange={() => handleToggleChange("security", "twoFactorAuth")}
                label="Two-Factor Authentication"
                description="Require a verification code in addition to your password"
              />
              
              <Toggle 
                checked={securitySettings.loginNotifications} 
                onChange={() => handleToggleChange("security", "loginNotifications")}
                label="Login Notifications"
                description="Receive email alerts for new sign-ins"
              />
              
              <div>
                <label htmlFor="sessionTimeout" className="block text-sm font-medium text-gray-700 mb-1">
                  Session Timeout (minutes)
                </label>
                <select 
                  id="sessionTimeout" 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                  value={securitySettings.sessionTimeout}
                  onChange={(e) => setSecuritySettings({...securitySettings, sessionTimeout: parseInt(e.target.value)})}
                >
                  <option value="15">15 minutes</option>
                  <option value="30">30 minutes</option>
                  <option value="60">1 hour</option>
                  <option value="120">2 hours</option>
                  <option value="240">4 hours</option>
                </select>
              </div>
              
              <div className="pt-4">
                <Button type="submit" variant="default" className="bg-green-600 hover:bg-green-700 flex items-center">
                  <Save className="mr-2 h-5 w-5" />
                  Save Changes
                </Button>
              </div>
            </div>
          </form>
        );
      
      case "notification":
        return (
          <form onSubmit={handleNotificationSettingsSubmit}>
            <h2 className="text-xl font-semibold mb-6 text-green-700">Notification Settings</h2>
            <div className="space-y-4">
              <Toggle 
                checked={notificationSettings.emailAlerts} 
                onChange={() => handleToggleChange("notification", "emailAlerts")}
                label="Email Alerts"
                description="Receive notifications via email"
              />
              
              <Toggle 
                checked={notificationSettings.systemNotifications} 
                onChange={() => handleToggleChange("notification", "systemNotifications")}
                label="System Notifications"
                description="Receive notifications in the dashboard"
              />
              
              <Toggle 
                checked={notificationSettings.criticalAlerts} 
                onChange={() => handleToggleChange("notification", "criticalAlerts")}
                label="Critical Alerts"
                description="Get notified for urgent system issues"
              />
              
              <Toggle 
                checked={notificationSettings.maintenanceAlerts} 
                onChange={() => handleToggleChange("notification", "maintenanceAlerts")}
                label="Maintenance Alerts"
                description="Get notified about scheduled maintenance"
              />
              
              <Toggle 
                checked={notificationSettings.weeklyReports} 
                onChange={() => handleToggleChange("notification", "weeklyReports")}
                label="Weekly Reports"
                description="Receive summary reports every week"
              />
              
              <div className="pt-4">
                <Button type="submit" variant="default" className="bg-green-600 hover:bg-green-700 flex items-center">
                  <Save className="mr-2 h-5 w-5" />
                  Save Changes
                </Button>
              </div>
            </div>
          </form>
        );
      
      default:
        return <div>Select a setting category</div>;
    }
  };
  
  // Tab button component
  const TabButton = ({ icon: Icon, label, tabId }) => (
    <Button 
      variant="ghost" 
      className={`w-full justify-between px-4 py-3 ${activeTab === tabId ? 'bg-green-50 text-green-700' : 'text-gray-700'} hover:bg-green-50 hover:text-green-700`}
      onClick={() => setActiveTab(tabId)}
    >
      <span className="flex items-center">
        <Icon className="mr-2 h-5 w-5" />
        {label}
      </span>
      <ChevronRight className="h-4 w-4" />
    </Button>
  );
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-green-700 text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <Link href="/settings">
              <Button variant="ghost" size="icon" className="text-white hover:bg-green-600 mr-3">
                <Settings className="h-5 w-5" />
              </Button>
            </Link>
            <h1 className="text-2xl font-bold">Dotmac Settings</h1>
          </div>
          <Link href="/dashboard">
            <Button variant="outline" className="bg-green-600 hover:bg-green-800 text-white border-green-500">
              Back to Dashboard
            </Button>
          </Link>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="container mx-auto py-8 px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Sidebar Navigation */}
          <div className="bg-white rounded-lg shadow-md p-4">
            <h2 className="text-xl font-semibold mb-4 text-green-700">Settings Menu</h2>
            <nav>
              <ul className="space-y-2">
                <li>
                  <TabButton icon={Settings} label="General Settings" tabId="general" />
                </li>
                <li>
                  <TabButton icon={User} label="User Settings" tabId="user" />
                </li>
                <li>
                  <TabButton icon={KeyRound} label="Reset Password" tabId="password" />
                </li>
                <li>
                  <TabButton icon={Shield} label="Security" tabId="security" />
                </li>
                <li>
                  <TabButton icon={Bell} label="Notifications" tabId="notification" />
                </li>
              </ul>
            </nav>
          </div>
          
          {/* Settings Content */}
          <div className="md:col-span-2 bg-white rounded-lg shadow-md p-6">
            {renderTabContent()}
          </div>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="bg-gray-100 mt-12 py-6 border-t border-gray-200">
        <div className="container mx-auto px-4 text-center text-gray-600">
          <p>© 2025 DOTMAC Network Management System. All rights reserved.</p>
          <p className="text-sm mt-2">Version 1.2.1</p>
        </div>
      </footer>
    </div>
  );
}