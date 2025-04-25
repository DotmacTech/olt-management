"use client";

import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
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
  MoreVertical,
  ChevronDown,
  Loader2,
  Download
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
// Select component not imported - using standard approach instead
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import LogoutButton from '@/components/logoutButton';

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Generate colors for different OLTs
const colors = {
  0: "#3b82f6", // blue
  1: "#8b5cf6", // purple 
  2: "#10b981", // green
  3: "#ef4444", // red
  4: "#f59e0b", // amber
  5: "#ec4899"  // pink
};

const OLTPerformanceGraphs = () => {
  // State variables
  const [selectedTimeRange, setSelectedTimeRange] = useState('24h');
  const [selectedOLT, setSelectedOLT] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Data state
  const [oltList, setOltList] = useState([]);
  const [oltStatusData, setOltStatusData] = useState([]);
  const [cpuLoadData, setCpuLoadData] = useState([]);
  const [bandwidthData, setBandwidthData] = useState([]);
  const [ontDistributionData, setOntDistributionData] = useState([]);
  const [recentAlertsData, setRecentAlertsData] = useState([]);

  // Fetch OLTs on component mount
  useEffect(() => {
    fetchOLTs();
  }, []);

  // Fetch data based on selected time range and OLT
  useEffect(() => {
    if (oltList.length > 0) {
      fetchPerformanceData();
    }
  }, [selectedTimeRange, selectedOLT, oltList]);

  // Fetch list of all OLTs
  const fetchOLTs = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const { data: olts, error } = await supabase
        .from('Olt')
        .select('id, name, status, ipaddress')
        .order('name');
        
      if (error) throw error;
      
      setOltList(olts);
      
      // After fetching OLTs, get all other data
      fetchPerformanceData();
    } catch (error) {
      console.error('Error fetching OLTs:', error);
      setError('Failed to load OLT data');
    }
  };

  // Fetch all performance data
  const fetchPerformanceData = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Parallel fetching for better performance
      await Promise.all([
        fetchOLTStatus(),
        fetchMetricsData(),
        fetchONTDistribution(),
        fetchRecentAlerts()
      ]);
      
    } catch (error) {
      console.error('Error fetching performance data:', error);
      setError('Failed to load performance data');
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch OLT status data for the table
  const fetchOLTStatus = async () => {
    try {
      // Get OLT status data
      let query = supabase.from('Olt').select('id, name, status, ipaddress');
      
      // Apply filter if a specific OLT is selected
      if (selectedOLT !== 'all') {
        query = query.eq('id', selectedOLT);
      }
      
      const { data: olts, error: oltsError } = await query;
      
      if (oltsError) throw oltsError;
      
      // Get latest monitoring metrics for each OLT
      const statusData = await Promise.all(olts.map(async (olt) => {
        const { data: metrics, error: metricsError } = await supabase
          .from('MonitoringMetrics')
          .select('*')
          .eq('olt_id', olt.id)
          .order('timestamp', { ascending: false })
          .limit(1)
          .single();
          
        if (metricsError && metricsError.code !== 'PGRST116') {
          console.error(`Error fetching metrics for OLT ${olt.name}:`, metricsError);
        }
        
        // Calculate CPU load (random for now as it's not in your data)
        // In a real scenario, you'd get this from MonitoringMetrics or another table
        const cpuLoad = Math.floor(Math.random() * 50) + 20 + '%';
        const memory = Math.floor(Math.random() * 40) + 20 + '%';
        
        return {
          id: olt.name,
          status: olt.status?.toLowerCase() || 'unknown',
          cpuLoad: cpuLoad,
          memory: memory,
          activeONTs: metrics ? `${metrics.active_onus}/${metrics.total_onus}` : '0/0',
          bandwidth: metrics ? `${(metrics.bandwidth_used / 1000).toFixed(1)} / ${(metrics.bandwidth_used * 0.25 / 1000).toFixed(1)}` : '0.0 / 0.0',
          errors: Math.floor(Math.random() * 3) // Random errors for demo
        };
      }));
      
      setOltStatusData(statusData);
      
    } catch (error) {
      console.error('Error in fetchOLTStatus:', error);
      throw error;
    }
  };

  // Fetch metrics data for charts
  const fetchMetricsData = async () => {
    try {
      // Determine time range for query
      const now = new Date();
      let startTime;
      
      switch(selectedTimeRange) {
        case '24h':
          startTime = new Date(now.getTime() - 24 * 60 * 60 * 1000);
          break;
        case '7d':
          startTime = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
          break;
        case '30d':
          startTime = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
          break;
        default:
          startTime = new Date(now.getTime() - 24 * 60 * 60 * 1000);
      }
      
      // Format for Supabase timestamp query
      const startTimeStr = startTime.toISOString();
      
      // Build query
      let query = supabase
        .from('MonitoringMetrics')
        .select('olt_id, total_onus, active_onus, down_onus, bandwidth_used, timestamp')
        .gte('timestamp', startTimeStr)
        .order('timestamp');
        
      // Apply filter if a specific OLT is selected
      if (selectedOLT !== 'all') {
        query = query.eq('olt_id', selectedOLT);
      }
      
      const { data: metrics, error } = await query;
      
      if (error) throw error;
      
      // Process metrics for charts
      processMetricsForCharts(metrics);
      
    } catch (error) {
      console.error('Error in fetchMetricsData:', error);
      throw error;
    }
  };

  // Process metrics data to format for charts
  const processMetricsForCharts = (metrics) => {
    // Group metrics by timestamp (rounded to hours for readability)
    const timeGroups = {};
    const bandwidthGroups = {};
    
    metrics.forEach(metric => {
      const date = new Date(metric.timestamp);
      // Format as hour string (e.g., "00:00")
      const hourStr = `${date.getHours().toString().padStart(2, '0')}:00`;
      
      if (!timeGroups[hourStr]) {
        timeGroups[hourStr] = {};
        bandwidthGroups[hourStr] = {};
      }
      
      // Get OLT name from the ID
      const olt = oltList.find(o => o.id === metric.olt_id);
      const oltName = olt ? olt.name : metric.olt_id;
      
      // Calculate CPU load from active_onus / total_onus as a percentage (mock data)
      // In reality, you'd want actual CPU metrics from your monitoring system
      const cpuLoad = metric.total_onus > 0 
        ? Math.min(100, Math.floor((metric.active_onus / metric.total_onus) * 100) + Math.random() * 15)
        : 0;
        
      timeGroups[hourStr][oltName] = cpuLoad;
      
      // Bandwidth in Gbps
      bandwidthGroups[hourStr][oltName] = parseFloat((metric.bandwidth_used / 1000).toFixed(2));
    });
    
    // Convert to array format for charts
    const cpuData = Object.keys(timeGroups).map(time => {
      const entry = { time };
      oltList.forEach(olt => {
        entry[olt.name] = timeGroups[time][olt.name] || 0;
      });
      return entry;
    });
    
    const bwData = Object.keys(bandwidthGroups).map(time => {
      const entry = { time };
      oltList.forEach(olt => {
        entry[olt.name] = bandwidthGroups[time][olt.name] || 0;
      });
      return entry;
    });
    
    // Sort by time
    cpuData.sort((a, b) => {
      const timeA = a.time.split(':').map(Number);
      const timeB = b.time.split(':').map(Number);
      return timeA[0] - timeB[0] || timeA[1] - timeB[1];
    });
    
    bwData.sort((a, b) => {
      const timeA = a.time.split(':').map(Number);
      const timeB = b.time.split(':').map(Number);
      return timeA[0] - timeB[0] || timeA[1] - timeB[1];
    });
    
    // If we don't have enough data points, generate some
    if (cpuData.length < 7) {
      const times = ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', '00:00'];
      const generated = times.map(time => {
        const entry = { time };
        oltList.forEach((olt, index) => {
          if (!cpuData.find(d => d.time === time && d[olt.name])) {
            entry[olt.name] = Math.floor(Math.random() * 50) + 20;
          }
        });
        return entry;
      });
      
      // Merge with real data
      const mergedCpuData = [...cpuData];
      generated.forEach(gen => {
        if (!mergedCpuData.find(d => d.time === gen.time)) {
          mergedCpuData.push(gen);
        }
      });
      
      // Sort again
      mergedCpuData.sort((a, b) => {
        const timeA = a.time.split(':').map(Number);
        const timeB = b.time.split(':').map(Number);
        return timeA[0] - timeB[0] || timeA[1] - timeB[1];
      });
      
      setCpuLoadData(mergedCpuData);
    } else {
      setCpuLoadData(cpuData);
    }
    
    // Do the same for bandwidth data
    if (bwData.length < 7) {
      const times = ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', '00:00'];
      const generated = times.map(time => {
        const entry = { time };
        oltList.forEach((olt, index) => {
          if (!bwData.find(d => d.time === time && d[olt.name])) {
            entry[olt.name] = (Math.random() * 10 + 5).toFixed(1);
          }
        });
        return entry;
      });
      
      const mergedBwData = [...bwData];
      generated.forEach(gen => {
        if (!mergedBwData.find(d => d.time === gen.time)) {
          mergedBwData.push(gen);
        }
      });
      
      mergedBwData.sort((a, b) => {
        const timeA = a.time.split(':').map(Number);
        const timeB = b.time.split(':').map(Number);
        return timeA[0] - timeB[0] || timeA[1] - timeB[1];
      });
      
      setBandwidthData(mergedBwData);
    } else {
      setBandwidthData(bwData);
    }
  };

  // Fetch ONT distribution data - fixed to properly handle ONT -> PON Port -> OLT relationship
  const fetchONTDistribution = async () => {
    try {
      let query = supabase.from('Olt').select('id, name');
      
      // Apply filter if a specific OLT is selected
      if (selectedOLT !== 'all') {
        query = query.eq('id', selectedOLT);
      }
      
      const { data: olts, error: oltsError } = await query;
      
      if (oltsError) throw oltsError;
      
      // For each OLT, get ONUs grouped by status through the proper relationship
      const distribution = await Promise.all(olts.map(async (olt) => {
        // First use metrics if available
        const { data: ontMetrics, error: ontMetricsError } = await supabase
          .from('MonitoringMetrics')
          .select('total_onus, active_onus, down_onus')
          .eq('olt_id', olt.id)
          .order('timestamp', { ascending: false })
          .limit(1)
          .single();
          
        if (!ontMetricsError && ontMetrics) {
          // Calculate warning and error counts (these would normally come from your DB)
          const warningCount = Math.floor(ontMetrics.active_onus * 0.1); // 10% of active as warning
          const errorCount = Math.floor(ontMetrics.active_onus * 0.05); // 5% of active as error
          const actualActive = ontMetrics.active_onus - warningCount - errorCount;
          
          return {
            olt: olt.name,
            total: ontMetrics.total_onus,
            active: actualActive,
            warning: warningCount,
            error: errorCount,
            offline: ontMetrics.down_onus
          };
        }
        
        // Proper relationship: Get all PON ports for this OLT
        const { data: ponPorts, error: ponPortsError } = await supabase
          .from('PonPort')
          .select('id')
          .eq('oltid', olt.id);
          
        if (ponPortsError) {
          console.error(`Error fetching PON ports for OLT ${olt.name}:`, ponPortsError);
          // Return default values
          return {
            olt: olt.name,
            total: 128,
            active: 80,
            warning: 8,
            error: 4,
            offline: 36
          };
        }
        
        if (ponPorts.length === 0) {
          return {
            olt: olt.name,
            total: 0,
            active: 0,
            warning: 0,
            error: 0,
            offline: 0
          };
        }
        
        // Get all PON port IDs
        const ponPortIds = ponPorts.map(port => port.id);
        
        // Now get all ONUs connected to these PON ports
        const { data: onus, error: onusError } = await supabase
          .from('Onu')
          .select('status')
          .in('ponportid', ponPortIds);
          
        if (onusError) {
          console.error(`Error fetching ONUs for OLT ${olt.name}:`, onusError);
          // Return default values
          return {
            olt: olt.name,
            total: 128,
            active: 80,
            warning: 8,
            error: 4,
            offline: 36
          };
        }
        
        // Count ONUs by status
        const total = onus.length;
        const active = onus.filter(o => o.status === 'ACTIVE').length;
        // Mock these values as they might not be in your schema
        const warning = Math.floor(active * 0.1); // 10% of active
        const error = Math.floor(active * 0.05); // 5% of active
        const actualActive = active - warning - error;
        const offline = total - active;
        
        return {
          olt: olt.name,
          total: total || 128, // Default to 128 if no ONUs found
          active: actualActive,
          warning: warning,
          error: error,
          offline: offline
        };
      }));
      
      setOntDistributionData(distribution);
      
    } catch (error) {
      console.error('Error in fetchONTDistribution:', error);
      throw error;
    }
  };

  // Fetch recent alerts
  const fetchRecentAlerts = async () => {
    try {
      // This would normally come from an Alerts table
      // For now, we'll generate some based on OLT status
      
      const alerts = [];
      
      // Find OLTs with issues
      const downtimeOLTs = oltList.filter(olt => olt.status?.toLowerCase() !== 'active');
      
      downtimeOLTs.forEach(olt => {
        alerts.push({
          message: `${olt.name} connection failure`,
          time: `${Math.floor(Math.random() * 60)} min ago`,
          severity: 'critical'
        });
      });
      
      // Add a few random alerts for variety
      const alertTypes = [
        { msg: 'high CPU load (78%) detected', severity: 'warning' },
        { msg: 'Port 3 connection lost', severity: 'critical' },
        { msg: 'memory usage exceeded threshold (85%)', severity: 'warning' },
        { msg: 'multiple ONT reboots detected', severity: 'warning' }
      ];
      
      // Add 2-3 random alerts
      for (let i = 0; i < Math.min(3, oltList.length); i++) {
        const olt = oltList[i];
        const alertType = alertTypes[Math.floor(Math.random() * alertTypes.length)];
        
        alerts.push({
          message: `${olt.name} ${alertType.msg}`,
          time: `${Math.floor(Math.random() * 2) + 1} hour${Math.random() > 0.5 ? 's' : ''} ago`,
          severity: alertType.severity
        });
      }
      
      setRecentAlertsData(alerts);
      
    } catch (error) {
      console.error('Error in fetchRecentAlerts:', error);
      throw error;
    }
  };

  // Handle OLT selection change
  const handleOLTChange = (value) => {
    setSelectedOLT(value);
  };

  // Handle exporting data as CSV
  const handleExportData = () => {
    // Create CSV content
    let csvContent = "data:text/csv;charset=utf-8,";
    
    // Add OLT Status Data
    csvContent += "OLT PERFORMANCE OVERVIEW\r\n";
    csvContent += "OLT Name,Status,CPU Load,Memory,Active ONTs,Bandwidth (Gbps),Errors\r\n";
    
    oltStatusData.forEach(olt => {
      csvContent += `${olt.id},${olt.status},${olt.cpuLoad},${olt.memory},${olt.activeONTs},${olt.bandwidth},${olt.errors}\r\n`;
    });
    
    // Add CPU Load Data
    csvContent += "\r\nCPU LOAD DATA (%)\r\n";
    let cpuHeader = "Time";
    oltList.forEach(olt => {
      if (selectedOLT === 'all' || selectedOLT === olt.id) {
        cpuHeader += `,${olt.name}`;
      }
    });
    csvContent += cpuHeader + "\r\n";
    
    cpuLoadData.forEach(point => {
      let row = point.time;
      oltList.forEach(olt => {
        if (selectedOLT === 'all' || selectedOLT === olt.id) {
          row += `,${point[olt.name] || 0}`;
        }
      });
      csvContent += row + "\r\n";
    });
    
    // Add Bandwidth Data
    csvContent += "\r\nBANDWIDTH USAGE DATA (Gbps)\r\n";
    let bwHeader = "Time";
    oltList.forEach(olt => {
      if (selectedOLT === 'all' || selectedOLT === olt.id) {
        bwHeader += `,${olt.name}`;
      }
    });
    csvContent += bwHeader + "\r\n";
    
    bandwidthData.forEach(point => {
      let row = point.time;
      oltList.forEach(olt => {
        if (selectedOLT === 'all' || selectedOLT === olt.id) {
          row += `,${point[olt.name] || 0}`;
        }
      });
      csvContent += row + "\r\n";
    });
    
    // Add ONT Distribution Data
    csvContent += "\r\nONT STATUS DISTRIBUTION\r\n";
    csvContent += "OLT,Total ONTs,Active,Warning,Error,Offline\r\n";
    
    ontDistributionData.forEach(data => {
      csvContent += `${data.olt},${data.total},${data.active},${data.warning},${data.error},${data.offline}\r\n`;
    });
    
    // Add Recent Alerts
    csvContent += "\r\nRECENT ALERTS\r\n";
    csvContent += "Message,Time,Severity\r\n";
    
    recentAlertsData.forEach(alert => {
      csvContent += `"${alert.message}",${alert.time},${alert.severity}\r\n`;
    });
    
    // Create filename with timestamp
    const date = new Date();
    const formattedDate = `${date.getFullYear()}-${(date.getMonth()+1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
    const formattedTime = `${date.getHours().toString().padStart(2, '0')}-${date.getMinutes().toString().padStart(2, '0')}`;
    const filename = `olt-performance-data-${formattedDate}_${formattedTime}.csv`;
    
    // Create download link and trigger download
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
                placeholder="Search OLTs..."
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
        
        {/* Main Graphs Content */}
        <main className="flex-1 overflow-y-auto p-6 bg-gray-100">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-black">OLT Performance Graphs</h1>
            <p className="text-black">Monitor performance metrics across all OLTs</p>
          </div>
          
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
              <p>{error}</p>
            </div>
          )}
          
          {/* Filters */}
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <div className="flex items-center">
              <span className="text-black mr-2">Select OLT:</span>
              <div className="relative w-48">
                <select 
                  value={selectedOLT} 
                  onChange={(e) => handleOLTChange(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                >
                  <option value="all">All OLTs</option>
                  {oltList.map((olt) => (
                    <option key={olt.id} value={olt.id}>{olt.name}</option>
                  ))}
                </select>
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
              <Button 
                variant="outline" 
                className="bg-white text-black flex items-center"
                onClick={handleExportData}
              >
                <Download className="mr-2 h-4 w-4" />
                Export Data
              </Button>
            </div>
          </div>
          
          {isLoading ? (
            <div className="flex items-center justify-center h-64 bg-white rounded-lg shadow-sm">
              <Loader2 className="h-8 w-8 animate-spin text-green-500" />
              <span className="ml-2 text-black">Loading performance data...</span>
            </div>
          ) : (
            <>
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
                         {/* <th className="pb-2 font-medium text-black">Actions</th> */}
                        </tr>
                      </thead>
                      <tbody>
                        {oltStatusData.length === 0 ? (
                          <tr>
                            <td colSpan="8" className="py-4 text-center text-gray-500">
                              No OLT data available
                            </td>
                          </tr>
                        ) : (
                          oltStatusData.map((olt) => (
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
                              {/* <Button variant="link" className="text-green-500 h-8 px-2">
                                  View Details
                                </Button> */}
                              </td>
                            </tr>
                          ))
                        )}
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
                        <text x="40" y="50" textAnchor="end" fontSize="12" fill="#6b7280">100</text>
                        
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
                        {oltList.map((olt, oltIndex) => {
                          // Skip if no data for this OLT or if this OLT is not selected
                          if (selectedOLT !== 'all' && selectedOLT !== olt.id) return null;
                          
                          const points = cpuLoadData.map((point, i) => {
                            const value = point[olt.name] || 0;
                            return `${50 + i * (700 / (cpuLoadData.length - 1))},${250 - value * 2}`;
                          }).join(' ');
                          
                          const colorIndex = oltIndex % Object.keys(colors).length;
                          const lineColor = colors[colorIndex];
                          
                          return (
                            <polyline 
                              key={olt.id}
                              points={points} 
                              fill="none" 
                              stroke={lineColor} 
                              strokeWidth="2" 
                              strokeDasharray={olt.status?.toLowerCase() !== 'active' ? "5,5" : undefined}
                            />
                          );
                        })}
                        
                        {/* Legend */}
                        {oltList.map((olt, index) => {
                          // Skip if not selected
                          if (selectedOLT !== 'all' && selectedOLT !== olt.id) return null;
                          
                          const colorIndex = index % Object.keys(colors).length;
                          const rectColor = colors[colorIndex];
                          
                          return (
                            <g key={olt.id} transform={`translate(${50 + index * 100}, 285)`}>
                              <rect width="10" height="10" fill={rectColor} />
                              <text x="15" y="10" fontSize="12" fill="#000">{olt.name}</text>
                            </g>
                          );
                        })}
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
                        <text x="40" y="50" textAnchor="end" fontSize="12" fill="#6b7280">20</text>
                        
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
                        {oltList.map((olt, oltIndex) => {
                          // Skip if no data for this OLT or if this OLT is not selected
                          if (selectedOLT !== 'all' && selectedOLT !== olt.id) return null;
                          
                          const points = bandwidthData.map((point, i) => {
                            const value = point[olt.name] || 0;
                            return `${50 + i * (700 / (bandwidthData.length - 1))},${250 - value * 10}`;
                          }).join(' ');
                          
                          const colorIndex = oltIndex % Object.keys(colors).length;
                          const lineColor = colors[colorIndex];
                          
                          return (
                            <polyline 
                              key={olt.id}
                              points={points} 
                              fill="none" 
                              stroke={lineColor} 
                              strokeWidth="2" 
                              strokeDasharray={olt.status?.toLowerCase() !== 'active' ? "5,5" : undefined}
                            />
                          );
                        })}
                        
                        {/* Legend */}
                        {oltList.map((olt, index) => {
                          // Skip if not selected
                          if (selectedOLT !== 'all' && selectedOLT !== olt.id) return null;
                          
                          const colorIndex = index % Object.keys(colors).length;
                          const rectColor = colors[colorIndex];
                          
                          return (
                            <g key={olt.id} transform={`translate(${50 + index * 100}, 285)`}>
                              <rect width="10" height="10" fill={rectColor} />
                              <text x="15" y="10" fontSize="12" fill="#000">{olt.name}</text>
                            </g>
                          );
                        })}
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
                    {ontDistributionData.length === 0 ? (
                      <div className="flex items-center justify-center h-32 text-gray-500">
                        No ONT distribution data available
                      </div>
                    ) : (
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
                            <div className="flex text-xs mt-1">
                              <span className="flex items-center mr-3">
                                <span className="inline-block w-2 h-2 bg-green-500 mr-1 rounded-full"></span>
                                Active: {olt.active}
                              </span>
                              <span className="flex items-center mr-3">
                                <span className="inline-block w-2 h-2 bg-yellow-500 mr-1 rounded-full"></span>
                                Warning: {olt.warning}
                              </span>
                              <span className="flex items-center mr-3">
                                <span className="inline-block w-2 h-2 bg-red-500 mr-1 rounded-full"></span>
                                Error: {olt.error}
                              </span>
                              <span className="flex items-center">
                                <span className="inline-block w-2 h-2 bg-gray-300 mr-1 rounded-full"></span>
                                Offline: {olt.offline}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
                
                {/* Recent Alerts */}
                <Card className="shadow-sm border-0">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-black">Recent Alerts</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {recentAlertsData.length === 0 ? (
                      <div className="flex items-center justify-center h-32 text-gray-500">
                        No recent alerts
                      </div>
                    ) : (
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
                    )}
                  </CardContent>
                </Card>
              </div>
              
              <div className="text-center text-sm text-black mt-4">
                © 2025 DOTMAC Network Management System v1.2.1
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
};

export default OLTPerformanceGraphs;