"use client";

import React, { useState, useEffect } from 'react';
import { 
  Search, 
  ZoomIn,
  ZoomOut,
  RotateCw,
  FileText,
  Bell,
  Settings,
  HelpCircle,
  Users,
  LayoutDashboard,
  Network,
  BarChart,
  LogOut,
  Minus,
  Activity,
  LineChart,
  CheckCircle, 
  AlertCircle,
  Plus,
  Settings2,
  MoreVertical
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import dynamic from 'next/dynamic';


// We need to use dynamic import for Leaflet components since they use browser APIs
const MapComponent = dynamic(() => import('./MapComponent'), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-gray-100 flex items-center justify-center">Loading map...</div>
});

const NetworkMaps = () => {
  const [activeView, setActiveView] = useState('geographical');
  const [devices, setDevices] = useState([]);
  const [connections, setConnections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [zoomLevel, setZoomLevel] = useState(0); // For zoom controls

  useEffect(() => {
    const fetchDevices = async () => {
      try {
        setLoading(true);
        console.log('Fetching device data from API...');
        
        // Only fetch data when geographical view is active
        if (activeView === 'geographical') {
          const response = await fetch('/api/network-devices');
          const responseData = await response.json();
          
          if (!response.ok) {
            console.error('API error response:', responseData);
            throw new Error(responseData.error || responseData.details || 'Failed to fetch network devices');
          }
          
          console.log('Device data received:', responseData);
          
          setDevices(responseData.devices || []);
          setConnections(responseData.connections || []);
        }
      } catch (err) {
        console.error('Error fetching devices:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    
    fetchDevices();
  }, [activeView]);

  // Filter devices by type when available
  const oltDevices = devices.filter(device => device.type === 'OLT');
  const onuDevices = devices.filter(device => device.type === 'ONU');

  // Helper for refreshing the map data
  const handleRefresh = () => {
    if (activeView === 'geographical') {
      setLoading(true);
      fetch('/api/network-devices')
        .then(response => response.json())
        .then(data => {
          setDevices(data.devices || []);
          setConnections(data.connections || []);
          setLoading(false);
        })
        .catch(err => {
          console.error('Error refreshing data:', err);
          setError('Failed to refresh network data');
          setLoading(false);
        });
    }
  };

  // Helper for zoom controls
  const handleZoomIn = () => {
    setZoomLevel(prev => prev + 1);
    // This would need to be passed to the map component
  };

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(0, prev - 1));
    // This would need to be passed to the map component
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
              className="w-full justify-start bg-green-700 text-white hover:bg-green-600 hover:text-white px-4 py-2 rounded-lg mb-1"
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
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navigation */}
        <header className="bg-white shadow-sm z-10">
          <div className="px-6 py-3 flex items-center justify-between">
            <div className="relative w-64">
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-black" />
              <input
                type="search"
                placeholder="Search network elements..."
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
        
        {/* Main Network Maps Content */}
        <main className="flex-1 overflow-y-auto p-6 bg-gray-100">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-black">Network Maps</h1>
            <p className="text-black">View and monitor your network topology</p>
          </div>
          
          <div className="bg-white rounded-md shadow-sm p-4 mb-6">
            <div className="flex flex-wrap gap-3 mb-4">
              <Button 
                className={`${activeView === 'logical' ? 'bg-green-500 hover:bg-green-600' : 'bg-white text-black border'}`}
                onClick={() => setActiveView('logical')}
              >
                Logical View
              </Button>
              <Button 
                variant={activeView === 'physical' ? 'default' : 'outline'} 
                className={activeView === 'physical' ? 'bg-green-500 hover:bg-green-600' : 'bg-white text-black'}
                onClick={() => setActiveView('physical')}
              >
                Physical View
              </Button>
              <Button 
                variant={activeView === 'geographical' ? 'default' : 'outline'} 
                className={activeView === 'geographical' ? 'bg-green-500 hover:bg-green-600 ' : 'bg-white text-black'}
                onClick={() => setActiveView('geographical')}
              >
                Geographical View
              </Button>
              
              <div className="ml-auto flex gap-2">
                <Button variant="outline" size="icon" onClick={handleZoomOut}>
                  <Minus className="h-4 w-4 text-black" />
                </Button>
                <Button variant="outline" size="icon" onClick={handleZoomIn}>
                  <Plus className="h-4 w-4 text-black" />
                </Button>
                <Button variant="outline" size="icon" onClick={handleRefresh}>
                  <RotateCw className="h-4 w-4 text-black" />
                </Button>
                <Button variant="outline" className="px-4 text-black">
                  Legend
                </Button>
                <Button variant="outline" className="px-4 text-black">
                  Export
                </Button>
              </div>
            </div>
            
            <div className="border rounded-md min-h-[500px] relative">
              {activeView === 'logical' && (
                /* Logical Network Diagram */
                <svg width="100%" height="100%" className="absolute inset-0">
                  {/* Data centers connection */}
                  <path d="M 671 313 Q 740 250 810 313" stroke="#9AA5B1" strokeWidth="2" fill="none" />
                  
                  {/* Data Center 1 to OLTs */}
                  <path d="M 671 350 L 500 425" stroke="#9AA5B1" strokeWidth="2" fill="none" />
                  <path d="M 671 350 L 580 425" stroke="#9AA5B1" strokeWidth="2" fill="none" />
                  <path d="M 671 350 L 740 425" stroke="#9AA5B1" strokeWidth="2" fill="none" />
                  
                  {/* Data Center 2 to OLT */}
                  <path d="M 810 350 L 895 425" stroke="#9AA5B1" strokeWidth="2" fill="none" />
                  
                  {/* OLT-East-01 to ONTs */}
                  <path d="M 480 460 L 380 545" stroke="#9AA5B1" strokeWidth="2" fill="none" />
                  <path d="M 500 460 L 480 545" stroke="#9AA5B1" strokeWidth="2" fill="none" />
                  
                  {/* OLT-East-02 to ONTs */}
                  <path d="M 580 460 L 580 545" stroke="#9AA5B1" strokeWidth="2" fill="none" />
                  <path d="M 600 460 L 680 545" stroke="#9AA5B1" strokeWidth="2" fill="none" />
                  
                  {/* OLT-North-03 to ONT (dashed) */}
                  <path d="M 740 460 L 780 545" stroke="#9AA5B1" strokeWidth="2" fill="none" strokeDasharray="5,5" />
                  
                  {/* OLT-West-05 to ONTs (dashed) */}
                  <path d="M 895 460 L 880 545" stroke="#9AA5B1" strokeWidth="2" fill="none" strokeDasharray="5,5" />
                  <path d="M 915 460 L 980 545" stroke="#9AA5B1" strokeWidth="2" fill="none" strokeDasharray="5,5" />
                  
                  {/* Data Centers */}
                  <rect x="622" y="287" width="100" height="60" rx="5" ry="5" fill="#E6F0FF" stroke="#3B82F6" strokeWidth="2" />
                  <text x="672" y="323" textAnchor="middle" dominantBaseline="middle" fill="#000">Data Center 1</text>
                  
                  <rect x="760" y="287" width="100" height="60" rx="5" ry="5" fill="#E6F0FF" stroke="#3B82F6" strokeWidth="2" />
                  <text x="810" y="323" textAnchor="middle" dominantBaseline="middle" fill="#000">Data Center 2</text>
                  
                  {/* OLTs */}
                  <rect x="450" y="410" width="100" height="50" rx="5" ry="5" fill="#E6FFEF" stroke="#22C55E" strokeWidth="2" />
                  <text x="500" y="435" textAnchor="middle" dominantBaseline="middle" fill="#000">OLT-East-01</text>
                  
                  <rect x="550" y="410" width="100" height="50" rx="5" ry="5" fill="#E6FFEF" stroke="#22C55E" strokeWidth="2" />
                  <text x="600" y="435" textAnchor="middle" dominantBaseline="middle" fill="#000">OLT-East-02</text>
                  
                  <rect x="690" y="410" width="100" height="50" rx="5" ry="5" fill="#FFEBEB" stroke="#EF4444" strokeWidth="2" />
                  <text x="740" y="435" textAnchor="middle" dominantBaseline="middle" fill="#000">OLT-North-03</text>
                  
                  <rect x="845" y="410" width="100" height="50" rx="5" ry="5" fill="#E6FFEF" stroke="#22C55E" strokeWidth="2" />
                  <text x="895" y="435" textAnchor="middle" dominantBaseline="middle" fill="#000">OLT-West-05</text>
                  
                  {/* ONTs */}
                  <rect x="335" y="530" width="90" height="30" rx="5" ry="5" fill="#F9F0FF" stroke="#A855F7" strokeWidth="2" />
                  <text x="380" y="545" textAnchor="middle" dominantBaseline="middle" fill="#000" fontSize="12">ONT-2201-ABC</text>
                  
                  <rect x="435" y="530" width="90" height="30" rx="5" ry="5" fill="#F9F0FF" stroke="#A855F7" strokeWidth="2" />
                  <text x="480" y="545" textAnchor="middle" dominantBaseline="middle" fill="#000" fontSize="12">ONT-2202-DEF</text>
                  
                  <rect x="535" y="530" width="90" height="30" rx="5" ry="5" fill="#F9F0FF" stroke="#A855F7" strokeWidth="2" />
                  <text x="580" y="545" textAnchor="middle" dominantBaseline="middle" fill="#000" fontSize="12">ONT-2203-GHI</text>
                  
                  <rect x="635" y="530" width="90" height="30" rx="5" ry="5" fill="#F9F0FF" stroke="#A855F7" strokeWidth="2" />
                  <text x="680" y="545" textAnchor="middle" dominantBaseline="middle" fill="#000" fontSize="12">ONT-2204-JKL</text>
                  
                  <rect x="735" y="530" width="90" height="30" rx="5" ry="5" fill="#F9F0FF" stroke="#A855F7" strokeWidth="2" />
                  <text x="780" y="545" textAnchor="middle" dominantBaseline="middle" fill="#000" fontSize="12">ONT-2205-MNO</text>
                  
                  <rect x="835" y="530" width="90" height="30" rx="5" ry="5" fill="#F9F0FF" stroke="#A855F7" strokeWidth="2" />
                  <text x="880" y="545" textAnchor="middle" dominantBaseline="middle" fill="#000" fontSize="12">ONT-2206-PQR</text>
                  
                  <rect x="935" y="530" width="90" height="30" rx="5" ry="5" fill="#F9F0FF" stroke="#A855F7" strokeWidth="2" />
                  <text x="980" y="545" textAnchor="middle" dominantBaseline="middle" fill="#000" fontSize="12">ONT-2207-STU</text>
                </svg>
              )}

              {activeView === 'physical' && (
                /* Physical View Diagram */
                <svg width="100%" height="100%" className="absolute inset-0">
                  {/* Rack representations */}
                  <rect x="300" y="150" width="200" height="350" rx="2" ry="2" fill="#F5F5F5" stroke="#D1D5DB" strokeWidth="2" />
                  <text x="400" y="130" textAnchor="middle" fill="#000" fontWeight="bold">Data Center 1 - Rack B12</text>
                  
                  <rect x="700" y="150" width="200" height="350" rx="2" ry="2" fill="#F5F5F5" stroke="#D1D5DB" strokeWidth="2" />
                  <text x="800" y="130" textAnchor="middle" fill="#000" fontWeight="bold">Data Center 2 - Rack A08</text>

                  {/* Equipment in Rack 1 */}
                  <rect x="310" y="180" width="180" height="40" rx="2" ry="2" fill="#E6F0FF" stroke="#3B82F6" strokeWidth="2" />
                  <text x="400" y="200" textAnchor="middle" dominantBaseline="middle" fill="#000">Core Switch DCR-01</text>
                  
                  <rect x="310" y="230" width="180" height="40" rx="2" ry="2" fill="#E6F0FF" stroke="#3B82F6" strokeWidth="2" />
                  <text x="400" y="250" textAnchor="middle" dominantBaseline="middle" fill="#000">Router R-01</text>
                  
                  <rect x="310" y="280" width="180" height="40" rx="2" ry="2" fill="#E6FFEF" stroke="#22C55E" strokeWidth="2" />
                  <text x="400" y="300" textAnchor="middle" dominantBaseline="middle" fill="#000">OLT-East-01 (Unit 5-6)</text>
                  
                  <rect x="310" y="330" width="180" height="40" rx="2" ry="2" fill="#E6FFEF" stroke="#22C55E" strokeWidth="2" />
                  <text x="400" y="350" textAnchor="middle" dominantBaseline="middle" fill="#000">OLT-East-02 (Unit 7-8)</text>
                  
                  <rect x="310" y="380" width="180" height="40" rx="2" ry="2" fill="#FFEBEB" stroke="#EF4444" strokeWidth="2" />
                  <text x="400" y="400" textAnchor="middle" dominantBaseline="middle" fill="#000">OLT-North-03 (Unit 9-10)</text>
                  
                  <rect x="310" y="430" width="180" height="40" rx="2" ry="2" fill="#FFF9DB" stroke="#F59E0B" strokeWidth="2" />
                  <text x="400" y="450" textAnchor="middle" dominantBaseline="middle" fill="#000">Fiber Patch Panel</text>
                  
                  {/* Equipment in Rack 2 */}
                  <rect x="710" y="180" width="180" height="40" rx="2" ry="2" fill="#E6F0FF" stroke="#3B82F6" strokeWidth="2" />
                  <text x="800" y="200" textAnchor="middle" dominantBaseline="middle" fill="#000">Core Switch DCR-02</text>
                  
                  <rect x="710" y="230" width="180" height="40" rx="2" ry="2" fill="#E6F0FF" stroke="#3B82F6" strokeWidth="2" />
                  <text x="800" y="250" textAnchor="middle" dominantBaseline="middle" fill="#000">Router R-02</text>
                  
                  <rect x="710" y="280" width="180" height="40" rx="2" ry="2" fill="#E6FFEF" stroke="#22C55E" strokeWidth="2" />
                  <text x="800" y="300" textAnchor="middle" dominantBaseline="middle" fill="#000">OLT-West-05 (Unit 3-4)</text>
                  
                  <rect x="710" y="330" width="180" height="40" rx="2" ry="2" fill="#FFF9DB" stroke="#F59E0B" strokeWidth="2" />
                  <text x="800" y="350" textAnchor="middle" dominantBaseline="middle" fill="#000">Fiber Patch Panel</text>
                  
                  {/* Rack connections */}
                  <path d="M 500 200 L 700 200" stroke="#9AA5B1" strokeWidth="2" fill="none" />
                  <path d="M 500 250 L 700 250" stroke="#9AA5B1" strokeWidth="2" fill="none" />
                  
                  {/* Legend */}
                  <rect x="400" y="520" width="400" height="30" rx="5" ry="5" fill="white" stroke="#D1D5DB" strokeWidth="1" />
                  <rect x="410" y="525" width="20" height="20" rx="2" ry="2" fill="#E6FFEF" stroke="#22C55E" strokeWidth="2" />
                  <text x="445" y="535" dominantBaseline="middle" fill="#000">Active</text>
                  
                  <rect x="490" y="525" width="20" height="20" rx="2" ry="2" fill="#FFEBEB" stroke="#EF4444" strokeWidth="2" />
                  <text x="525" y="535" dominantBaseline="middle" fill="#000">Critical</text>
                  
                  <rect x="570" y="525" width="20" height="20" rx="2" ry="2" fill="#FFF9DB" stroke="#F59E0B" strokeWidth="2" />
                  <text x="605" y="535" dominantBaseline="middle" fill="#000">Warning</text>
                  
                  <rect x="650" y="525" width="20" height="20" rx="2" ry="2" fill="#E6F0FF" stroke="#3B82F6" strokeWidth="2" />
                  <text x="685" y="535" dominantBaseline="middle" fill="#000">Network</text>
                </svg>
              )}

              {activeView === 'geographical' && (
                /* OpenStreetMap Geographical View */
                <div className="h-[500px] relative">
                  {loading ? (
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-50">
                      <div className="flex flex-col items-center">
                        <RotateCw className="h-8 w-8 text-green-500 animate-spin mb-2" />
                        <span className="text-black">Loading network map...</span>
                      </div>
                    </div>
                  ) : error ? (
                    <div className="absolute inset-0 flex items-center justify-center bg-red-50">
                      <div className="max-w-md p-4 text-center">
                        <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
                        <h3 className="text-lg font-bold text-red-700 mb-2">Error Loading Map</h3>
                        <p className="text-red-600 mb-4">{error}</p>
                        <Button 
                          onClick={handleRefresh} 
                          className="bg-green-500 hover:bg-green-600"
                        >
                          <RotateCw className="h-4 w-4 mr-2" />
                          Retry
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <MapComponent devices={devices} connections={connections} />
                  )}
                  
                  {/* Map Overlay - Legend */}
                  {!loading && !error && devices.length > 0 && (
                    <div className="absolute top-4 right-4 bg-white p-3 rounded shadow-md z-10">
                      <h4 className="font-bold text-sm mb-2">Network Elements</h4>
                      <div className="space-y-2">
                        <div className="flex items-center">
                          <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                          <span className="text-xs">OLT ({oltDevices.length})</span>
                        </div>
                        <div className="flex items-center">
                          <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                          <span className="text-xs">ONU ({onuDevices.length})</span>
                        </div>
                        <div className="flex items-center">
                          <div className="w-5 h-0.5 bg-gray-400 border-dashed mr-2"></div>
                          <span className="text-xs">Connections ({connections.length})</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
          
          <div className="bg-white rounded-md shadow-sm p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <span className="font-medium text-black mr-2">Network Alerts:</span>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center">
                    <div className="h-4 w-4 rounded-full bg-red-500 mr-2"></div>
                    <span className="text-black">OLT-North-03 connection failure</span>
                    </div>
                  <div className="flex items-center ml-4">
                    <div className="h-4 w-4 rounded-full bg-yellow-500 mr-2"></div>
                    <span className="text-black">2 ONUs offline</span>
                  </div>
                </div>
              </div>
              <Button variant="link" className="text-green-500">
                View All Alerts
              </Button>
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

export default NetworkMaps;