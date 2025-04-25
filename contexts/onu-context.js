"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// Initial data structure
const initialData = {
  onus: [],
  customers: [],
  ponPorts: [],
  onuModels: [],
  profiles: [],
  selectedOnu: null,
  totalOnus: 0,
  loading: true,
  error: null
};

const OnuContext = createContext(initialData);

export function OnuProvider({ children }) {
  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Helper function to normalize ONU status
  function normalizeStatus(status) {
    if (!status) return 'inactive';
    
    const lowerStatus = String(status).toLowerCase();
    
    if (lowerStatus === 'active') {
      return 'active';
    } else if (lowerStatus === 'warning' || lowerStatus === 'alert') {
      return 'warning';
    } else if (lowerStatus === 'inactive' || lowerStatus === 'down' || lowerStatus === 'offline') {
      return 'inactive';
    } else if (lowerStatus === 'pending') {
      return 'pending';
    } else if (lowerStatus === 'critical') {
      return 'critical';
    } else {
      return 'inactive'; // Default unknown statuses to Inactive
    }
  }
  
  // Fetch ONUs and related data
  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        console.log("Starting ONU data fetch...");
        
        // 1. Fetch ONUs from the Onu table
        console.log("Fetching ONUs...");
        const { data: onus, error: onusError, count: onusCount } = await supabase
          .from('Onu')
          .select('*', { count: 'exact' });
          
        if (onusError) {
          console.error("Error fetching ONUs:", onusError);
          throw onusError;
        }
        
        console.log("Fetched ONUs:", onus);
        
        // 2. Fetch customers (we'll need to join with customer data)
        const { data: customers, error: customersError } = await supabase
          .from('Customer')
          .select('*');
          
        if (customersError) {
          console.error("Error fetching customers:", customersError);
          // Continue without customer data
        }
        
        // 3. Fetch PON ports
        const { data: ponPorts, error: ponPortsError } = await supabase
          .from('PonPort')
          .select('*');
          
        if (ponPortsError) {
          console.error("Error fetching PON ports:", ponPortsError);
          // Continue without PON port data
        }
        
        // 4. Fetch ONU models
        const { data: onuModels, error: onuModelsError } = await supabase
          .from('OnuModel')
          .select('*');
          
        if (onuModelsError) {
          console.error("Error fetching ONU models:", onuModelsError);
          // Continue without ONU model data
        }
        
        // 5. Fetch profiles
        const { data: profiles, error: profilesError } = await supabase
          .from('Profile')
          .select('*');
          
        if (profilesError) {
          console.error("Error fetching profiles:", profilesError);
          // Continue without profile data
        }
        
        // Process ONUs data with related information
        const processedOnus = onus.map(onu => {
          // Find related customer
          const customer = customers?.find(c => c.id === onu.customerid);
          
          // Find related PON port
          const ponPort = ponPorts?.find(p => p.id === onu.ponportid);
          
          // Find related ONU model
          const onuModel = onuModels?.find(m => m.id === onu.onumodelid);
          
          // Find related profile
          const profile = profiles?.find(p => p.id === onu.profileid);
          
          // Get OLT information from PON port if available
          const oltInfo = ponPort ? `${ponPort.name || 'Unknown OLT'}` : 'Unknown OLT';
          const oltPort = ponPort ? `${ponPort.name || ''} P${ponPort.port_number || '?'}` : 'Unknown Port';
          
          return {
            ...onu,
            normalizedStatus: normalizeStatus(onu.status),
            customerName: customer?.name || customer?.company_name || 'Unknown',
            oltPort: oltPort,
            oltInfo: oltInfo,
            modelName: onuModel?.name || onu.model || 'Unknown Model',
            profileName: profile?.name || 'Default Profile',
            // Use provided values or defaults for missing data
            name: onu.name || `ONT-${onu.serialnumber?.substring(0, 6) || '?????'}`,
            model: onu.model || onuModel?.name || 'Unknown Model',
            manufacturer: onuModel?.manufacturer || 'Unknown Manufacturer',
            // Convert last update time to relative time
            lastUpdated: onu.updatedat ? getRelativeTime(new Date(onu.updatedat)) : 'Unknown',
            // Calculate uptime if available
            uptime: onu.uptimeSeconds ? formatUptime(onu.uptimeSeconds) : 'Unknown',
            // Signal strength
            signal: onu.rxPower ? `${onu.rxPower} dBm` : 'N/A',
            packetLoss: '0.02%', // Default if not available
            // Connection details
            connection: {
              olt: oltInfo,
              oltPort: oltPort,
              provisionedSpeed: profile?.bandwidth || '1 Gbps',
              dataVlan: profile?.data_vlan || '500',
              voiceVlan: profile?.voice_vlan || '600'
            },
            // Device details
            device: {
              model: onu.model || onuModel?.name || 'Unknown Model',
              manufacturer: onuModel?.manufacturer || 'Unknown Manufacturer',
              serialNumber: onu.serialnumber || onu.deviceSerial || 'Unknown',
              firmware: onu.firmwareVersion || 'Unknown',
              macAddress: onu.mac_address || onu.macAddress || 'Unknown'
            },
            // Default services
            services: [
              { name: "Internet", type: "Residential", status: "active", speed: profile?.bandwidth || "1 Gbps" },
              { name: "Voice", type: "VoIP", status: "active", speed: "10 Mbps" },
              { name: "TV", type: "IPTV", status: "inactive", speed: "N/A" }
            ],
            // Diagnostics data
            diagnostics: {
              lastTest: {
                type: "Signal Test",
                date: onu.lastSyncAt || '2023-04-08 14:23',
                result: onu.rxPower ? `${onu.rxPower} dBm (Good)` : "N/A"
              }
            }
          };
        });
        
        // Set the initial selected ONU if there are any ONUs
        const selectedOnu = processedOnus.length > 0 ? processedOnus[0] : null;
        
        // Update state with all the fetched data
        setData({
          onus: processedOnus,
          customers: customers || [],
          ponPorts: ponPorts || [],
          onuModels: onuModels || [],
          profiles: profiles || [],
          selectedOnu,
          totalOnus: onusCount || processedOnus.length,
          loading: false,
          error: null
        });
        
        setLoading(false);
        setError(null);
      } catch (err) {
        console.error("Error in fetchData:", err);
        setError(err.message);
        setLoading(false);
        
        // Set dummy data in case of error
        setData({
          ...initialData,
          onus: getDummyOnus(),
          selectedOnu: getDummyOnus()[0],
          totalOnus: 7,
          loading: false,
          error: err.message
        });
      }
    }
    
    fetchData();
    // Refresh every 30 seconds
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, []);
  
  // Function to select a specific ONU
  const selectOnu = (onuId) => {
    const selectedOnu = data.onus.find(onu => onu.id === onuId);
    if (selectedOnu) {
      setData({ ...data, selectedOnu });
    }
  };
  
  // Helper function to format uptime
  function formatUptime(seconds) {
    if (!seconds) return 'Unknown';
    
    const days = Math.floor(seconds / 86400);
    const hours = Math.floor((seconds % 86400) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    
    if (days > 0) {
      return `${days} days ${hours} hours`;
    } else if (hours > 0) {
      return `${hours} hours ${minutes} minutes`;
    } else {
      return `${minutes} minutes`;
    }
  }
  
  // Helper function to calculate relative time
  function getRelativeTime(date) {
    const now = new Date();
    const diff = Math.floor((now - date) / 1000); // seconds
    
    if (diff < 60) return 'just now';
    if (diff < 3600) return `${Math.floor(diff / 60)} min ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)} hr ago`;
    return `${Math.floor(diff / 86400)} days ago`;
  }
  
  // Dummy data for fallback
  function getDummyOnus() {
    return [
      { 
        id: "1", 
        name: "ONT-2201-ABC", 
        customerName: "John Smith",
        oltPort: "OLT-East-01 P1", 
        normalizedStatus: "active",
        lastUpdated: "2 min ago",
        uptime: "23 days 7 hours",
        signal: "-18 dBm",
        packetLoss: "0.02%",
        address: "123 Main St, Apt 4B, Cityville",
        device: {
          model: "ONT-G-4220",
          manufacturer: "FiberTech",
          serialNumber: "FT-2201-835271",
          firmware: "v3.5.12",
          macAddress: "12:34:56:78:9A:BC"
        },
        connection: {
          olt: "OLT-East-01",
          oltPort: "Port 1",
          provisionedSpeed: "1 Gbps",
          dataVlan: "510",
          voiceVlan: "610"
        },
        services: [
          { name: "Internet", type: "Residential", status: "active", speed: "1 Gbps" },
          { name: "Voice", type: "VoIP", status: "active", speed: "10 Mbps" },
          { name: "TV", type: "IPTV", status: "inactive", speed: "N/A" }
        ],
        diagnostics: {
          lastTest: {
            type: "Signal Test",
            date: "2023-04-08 14:23",
            result: "-18 dBm (Good)"
          }
        }
      },
      { 
        id: "2",
        name: "ONT-2202-DEF",
        customerName: "",
        oltPort: "OLT-East-01 P1", 
        normalizedStatus: "active" 
      },
      // Add more dummy ONUs...
    ];
  }
  
  return (
    <OnuContext.Provider value={{ ...data, loading, error, selectOnu }}>
      {children}
    </OnuContext.Provider>
  );
}

export function useOnuData() {
  const context = useContext(OnuContext);
  if (!context) {
    throw new Error("useOnuData must be used within an OnuProvider");
  }
  return context;
}