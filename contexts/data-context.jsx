"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// Initial data structure
const initialData = {
  total: {
    olts: 0,
    activeOlts: 0,
    inactiveOlts: 0,
    onts: 0,
    activeOnts: 0,
    inactiveOnts: 0,
  },
  network: {
    availability: 0,
    downtime: 0,
  },
  alerts: {
    total: 0,
    critical: 0,
    warning: 0,
    info: 0,
  },
  traffic: {
    download: [0, 0, 0, 0, 0, 0],
    upload: [0, 0, 0, 0, 0, 0],
    times: ["00:00", "04:00", "08:00", "12:00", "16:00", "20:00"],
  },
  bandwidth: {
    utilized: 0,
    distribution: {
      video: 0,
      data: 0,
      voice: 0,
    },
  },
  oltStatus: [],
  recentAlerts: [],
};

const DataContext = createContext(initialData);

export function DataProvider({ children }) {
  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Helper function to normalize OLT status
  function normalizeStatus(status) {
    if (!status) return 'Inactive'; // Null status is considered inactive
    
    const lowerStatus = status.toLowerCase();
    
    if (lowerStatus === 'active') {
      return 'Active';
    } else if (lowerStatus === 'warning' || lowerStatus === 'alert') {
      return 'Warning';
    } else if (lowerStatus === 'inactive') {
      return 'Inactive';
    } else {
      return 'Inactive'; // Default unknown statuses to Inactive
    }
  }
  
  // Fetch live data from Supabase
  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        console.log("Starting data fetch...");
        
        // 1. Fetch OLTs - USING THE CORRECT TABLE NAME "Olt" (singular)
        console.log("Fetching OLTs...");
        const { data: olts, error: oltsError } = await supabase
          .from('Olt')  // Table name fixed to match your database
          .select('*');
          
        if (oltsError) {
          console.error("Error fetching OLTs:", oltsError);
          throw oltsError;
        }
        
        console.log("Fetched OLTs:", olts);
        
        // If no OLTs found, use demo data for development
        const useOlts = olts?.length > 0 ? olts : [
          { id: '99d24c77-9858-4ef2-b7a7-79d0cbf37ea8', name: 'Abuja Core OLT', status: 'ACTIVE' },
          { id: 'demo-olt-2', name: 'Lagos Core OLT', status: 'ACTIVE' },
          { id: 'demo-olt-3', name: 'GARKI OLT', status: null }
        ];
        
        // Normalize OLT statuses
        const normalizedOlts = useOlts.map(olt => ({
          ...olt,
          status: normalizeStatus(olt.status)
        }));
        
        // Calculate OLT metrics with proper categorization
        const totalOlts = normalizedOlts.length;
        const activeOlts = normalizedOlts.filter(o => o.status === 'Active').length;
        const warningOlts = normalizedOlts.filter(o => o.status === 'Warning').length;
        const inactiveOlts = normalizedOlts.filter(o => o.status === 'Inactive').length;
        
        // Verify the counts add up
        console.assert(
          activeOlts + warningOlts + inactiveOlts === totalOlts,
          "OLT counts don't add up correctly", 
          { totalOlts, activeOlts, warningOlts, inactiveOlts }
        );
        
        console.log("OLT counts:", { totalOlts, activeOlts, warningOlts, inactiveOlts });
        console.log("OLT statuses:", normalizedOlts.map(olt => olt.status));

        // 2. Fetch Monitoring Metrics
        console.log("Fetching Monitoring Metrics...");
        const { data: metrics, error: metricsError } = await supabase
          .from('MonitoringMetrics')
          .select('*')
          .order('timestamp', { ascending: false })
          .limit(20);
          
        if (metricsError) {
          console.error("Error fetching metrics:", metricsError);
          throw metricsError;
        }
        
        console.log("Fetched metrics:", metrics);
        
        // If no metrics found, use demo data
        const useMetrics = metrics?.length > 0 ? metrics : [
          { 
            id: '99a78b07-2570-4917-ad6e-a704d1ffa569', 
            olt_id: '99d24c77-9858-4ef2-b7a7-79d0cbf37ea8', 
            total_onus: '128', 
            active_onus: '120', 
            down_onus: '8', 
            bandwidth_used: '145.6',
            timestamp: '2025-04-12 10:09:16.793563+00'
          },
          { 
            id: 'dc1e23ca-2125-43cc-b63b-98ea2b5ae2b9', 
            olt_id: '99d24c77-9858-4ef2-b7a7-79d0cbf37ea8', 
            total_onus: '128', 
            active_onus: '120', 
            down_onus: '8', 
            bandwidth_used: '145.6',
            timestamp: '2025-04-12 10:09:18.45668+00'
          }
        ];
        
        // Process metrics data
        let totalOnts = 0;
        let activeOnts = 0;
        let inactiveOnts = 0;
        let bandwidthUtilized = 0;
        
        // Get the most recent metrics for each OLT
        const latestMetricsByOlt = {};
        useMetrics.forEach(metric => {
          const oltId = metric.olt_id;
          if (!latestMetricsByOlt[oltId] || new Date(metric.timestamp) > new Date(latestMetricsByOlt[oltId].timestamp)) {
            latestMetricsByOlt[oltId] = metric;
          }
        });
        
        console.log("Latest metrics by OLT:", latestMetricsByOlt);
        
        // Sum up the totals from the latest metrics of each OLT
        Object.values(latestMetricsByOlt).forEach(metric => {
          totalOnts += parseInt(metric.total_onus) || 0;
          activeOnts += parseInt(metric.active_onus) || 0;
          inactiveOnts += parseInt(metric.down_onus) || 0;
          bandwidthUtilized += parseFloat(metric.bandwidth_used) || 0;
        });
        
        // Calculate bandwidth utilization percentage (0-100)
        // Assuming bandwidth_used is in Mbps and represents current utilization
        const maxBandwidth = 1000; // Example: 1 Gbps total capacity
        const utilizationPercent = Math.min(Math.round((bandwidthUtilized / maxBandwidth) * 100), 100);
        
        console.log("Calculated ONT totals:", { totalOnts, activeOnts, inactiveOnts });
        console.log("Bandwidth utilized:", bandwidthUtilized, "Utilization percent:", utilizationPercent);
        
        // 3. Fetch Alerts
        console.log("Fetching Alerts...");
        const { data: alertsData, error: alertsError } = await supabase
          .from('Alerts')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(10);
          
        if (alertsError) {
          console.error("Error fetching alerts:", alertsError);
        }
        
        const alertsArr = alertsError ? [] : (alertsData || []);
        console.log("Fetched alerts:", alertsArr);
        
        // If no alerts found, use demo data
        const useAlerts = alertsArr.length > 0 ? alertsArr : [
          { id: '1', type: 'Power Outage', device: 'OLT-Main-01', severity: 'critical', created_at: new Date().toISOString() },
          { id: '2', type: 'High CPU', device: 'OLT-Branch-02', severity: 'warning', created_at: new Date().toISOString() },
          { id: '3', type: 'Signal Loss', device: 'ONT-123', severity: 'info', created_at: new Date().toISOString() }
        ];
        
        // Process alerts
        const totalAlerts = useAlerts.length;
        const critical = useAlerts.filter(a => a.severity === 'critical').length;
        const warning = useAlerts.filter(a => a.severity === 'warning').length;
        const info = useAlerts.filter(a => a.severity === 'info').length;
        
        // 4. Generate traffic data from metrics history
        // Sort metrics by timestamp
        const sortedMetrics = [...useMetrics].sort((a, b) => 
          new Date(a.timestamp) - new Date(b.timestamp)
        );
        
        // Group metrics by hour for the traffic chart
        const trafficByHour = {};
        sortedMetrics.forEach(metric => {
          const date = new Date(metric.timestamp);
          const hour = date.getHours();
          const timeKey = `${hour.toString().padStart(2, '0')}:00`;
          
          if (!trafficByHour[timeKey]) {
            trafficByHour[timeKey] = {
              download: 0,
              upload: 0,
              count: 0
            };
          }
          
          trafficByHour[timeKey].download += parseFloat(metric.bandwidth_used) || 0;
          trafficByHour[timeKey].upload += (parseFloat(metric.bandwidth_used) * 0.4) || 0; // Assuming upload is 40% of bandwidth
          trafficByHour[timeKey].count += 1;
        });
        
        console.log("Traffic by hour:", trafficByHour);
        
        // Calculate averages and prepare chart data
        let times = Object.keys(trafficByHour).sort();
        let download = times.map(time => 
          trafficByHour[time].count > 0 ? 
          trafficByHour[time].download / trafficByHour[time].count : 0
        );
        let upload = times.map(time => 
          trafficByHour[time].count > 0 ? 
          trafficByHour[time].upload / trafficByHour[time].count : 0
        );
        
        // If we don't have enough data points, fill in with default times
        if (times.length < 6) {
          const defaultTimes = ["00:00", "04:00", "08:00", "12:00", "16:00", "20:00"];
          
          // Use default data if we have very few data points
          if (times.length <= 1) {
            console.log("Not enough time data points, using defaults");
            times = defaultTimes;
            // Generate some dummy data for the chart based on bandwidth_used
            const baseValue = bandwidthUtilized > 0 ? bandwidthUtilized / 2 : 50;
            download = [
              baseValue * 0.6, 
              baseValue * 0.9, 
              baseValue * 1.2, 
              baseValue * 1.5, 
              baseValue * 1.3, 
              baseValue * 1.0
            ];
            upload = download.map(d => d * 0.4); // Upload is 40% of download
          } else {
            // Fill in missing times with zeros
            const missingTimes = defaultTimes.filter(t => !times.includes(t));
            
            missingTimes.forEach(time => {
              times.push(time);
              download.push(0);
              upload.push(0);
            });
            
            // Sort all the time data
            const sortedIndices = times.map((_, i) => i).sort((a, b) => {
              const timeA = times[a].split(':').map(Number);
              const timeB = times[b].split(':').map(Number);
              return timeA[0] * 60 + timeA[1] - (timeB[0] * 60 + timeB[1]);
            });
            
            times = [...times].sort((a, b) => {
              const timeA = a.split(':').map(Number);
              const timeB = b.split(':').map(Number);
              return timeA[0] * 60 + timeA[1] - (timeB[0] * 60 + timeB[1]);
            });
            
            const sortedDownload = sortedIndices.map(i => download[i]);
            const sortedUpload = sortedIndices.map(i => upload[i]);
            
            download = sortedDownload;
            upload = sortedUpload;
          }
        }
        
        console.log("Chart data:", { times, download, upload });
        
        // 5. Calculate network availability based on active OLTs and ONTs
        const availability = totalOlts > 0 
          ? Math.round((activeOlts / totalOlts) * 1000) / 10 
          : 99.5; // Fallback value
        
        // 6. Prepare OLT status data for dashboard
        // Use normalized OLTs with consistent status values
        const oltStatus = normalizedOlts.map(o => {
          // Calculate load based on metrics if available, or use placeholder
          const metric = latestMetricsByOlt[o.id];
          let load = 75; // Default load
          
          if (metric) {
            const total = parseInt(metric.total_onus) || 1;
            const active = parseInt(metric.active_onus) || 0;
            load = Math.min(
              Math.round((active / total) * 100 + (parseFloat(metric.bandwidth_used) / 2)),
              100
            );
          }
          
          // Use location or ipaddress as fallback for missing location
          const location = o.location || o.region || o.ipaddress || 'Unknown';
          
          return {
            name: o.name || `OLT-${o.id?.substr(0, 8)}`,
            location: location,
            status: o.status, // Use the normalized status
            load: load,
          };
        }).slice(0, 5); // Show only first 5 OLTs on dashboard
        
        // 7. Prepare recent alerts for dashboard
        const recentAlerts = useAlerts.slice(0, 3).map(a => ({
          type: a.type || a.message || 'Alert',
          device: a.device || a.olt_name || 'Unknown Device',
          time: formatTime(a.created_at) || '12:30',
          severity: a.severity || 'info',
        }));
        
        // 8. Calculate bandwidth distribution (example values, adjust based on your data)
        const bandwidthDistribution = {
          video: Math.round(utilizationPercent * 0.4) || 40, // 40% for video
          data: Math.round(utilizationPercent * 0.5) || 50,  // 50% for data
          voice: Math.round(utilizationPercent * 0.1) || 10   // 10% for voice
        };
        
        // Update state with all the calculated data
        const newData = {
          total: {
            olts: totalOlts,
            activeOlts,
            inactiveOlts,
            onts: totalOnts,
            activeOnts,
            inactiveOnts,
          },
          network: {
            availability,
            downtime: calculateDowntime(useMetrics),
          },
          alerts: {
            total: totalAlerts,
            critical,
            warning,
            info,
          },
          traffic: {
            download,
            upload,
            times,
          },
          bandwidth: {
            utilized: utilizationPercent || 65, // Use the calculated percentage here with fallback
            distribution: bandwidthDistribution,
          },
          oltStatus,
          recentAlerts,
        };
        
        console.log("Setting new data:", newData);
        setData(newData);
        setLoading(false);
        setError(null);
      } catch (err) {
        console.error("Error in fetchData:", err);
        setError(err.message);
        setLoading(false);
        
        // Still update with fallback demo data so UI doesn't show all zeros
        setData({
          total: {
            olts: 3,
            activeOlts: 2,
            inactiveOlts: 1,
            onts: 128,
            activeOnts: 120,
            inactiveOnts: 8,
          },
          network: {
            availability: 96.5,
            downtime: 2.5,
          },
          alerts: {
            total: 5,
            critical: 1,
            warning: 2,
            info: 2,
          },
          traffic: {
            download: [30, 45, 60, 75, 65, 50],
            upload: [15, 25, 35, 40, 30, 20],
            times: ["00:00", "04:00", "08:00", "12:00", "16:00", "20:00"],
          },
          bandwidth: {
            utilized: 65,
            distribution: {
              video: 40,
              data: 50,
              voice: 10,
            },
          },
          oltStatus: [
            { name: 'OLT-Main-01', location: 'Data Center 1', status: 'Active', load: 85 },
            { name: 'OLT-Branch-02', location: 'Data Center 2', status: 'Active', load: 65 },
            { name: 'OLT-Edge-03', location: 'Remote Site', status: 'Warning', load: 95 }
          ],
          recentAlerts: [
            { type: 'Power Outage', device: 'OLT-Edge-03', time: '10:25', severity: 'critical' },
            { type: 'CPU High', device: 'OLT-Main-01', time: '11:20', severity: 'warning' },
            { type: 'Signal Low', device: 'ONT-123', time: '12:35', severity: 'info' }
          ],
        });
      }
    }
    
    fetchData();
    const interval = setInterval(fetchData, 10000); // Refresh every 10s
    return () => clearInterval(interval);
  }, []);
  
  // Provide loading and error state along with data
  return (
    <DataContext.Provider value={{ ...data, loading, error }}>
      {children}
    </DataContext.Provider>
  );
}

// Helper functions
function calculateDowntime(metrics) {
  // Simplistic calculation based on down ONUs
  if (!metrics || metrics.length === 0) return 0;
  
  let totalDownOnus = 0;
  metrics.forEach(metric => {
    totalDownOnus += parseInt(metric.down_onus) || 0;
  });
  
  // Estimate downtime (hours) based on down ONUs
  return (totalDownOnus / 10).toFixed(1) || 2.5; // Fallback to 2.5
}

function formatTime(timestamp) {
  if (!timestamp) return '';
  
  try {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
  } catch (e) {
    console.error("Error formatting time:", e);
    return '00:00';
  }
}

export function useNetworkData() {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useNetworkData must be used within a DataProvider");
  }
  return context;
}