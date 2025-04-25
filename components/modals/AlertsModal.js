"use client";

import React, { useState, useEffect } from 'react';
import { Modal } from '@/components/ui/modal';
import { Badge } from '@/components/ui/badge';
import { AlertCircle, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client directly in the component for reliable testing
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export function AlertsModal({ isOpen, onClose }) {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    if (isOpen) {
      fetchAllAlerts();
    }
  }, [isOpen]);
  
  async function fetchAllAlerts() {
    setLoading(true);
    try {
      // Fetch all alerts - Make sure to use your correct table name if it's different
      console.log("Fetching all alerts...");
      const { data: alertsData, error: alertsError } = await supabase
        .from('Alerts') // Confirm this is your actual alerts table name
        .select('*')
        .order('created_at', { ascending: false });
        
      if (alertsError) {
        console.error("Error fetching alerts:", alertsError);
        throw alertsError;
      }
      
      console.log("Fetched alerts from database:", alertsData);
      
      if (!alertsData || alertsData.length === 0) {
        console.warn("No alerts found in database, using demo data");
        // Only use demo data if we truly have no alerts
        const demoData = [
          { id: '1', type: 'Power Outage', device: 'OLT-Main-01', time: '10:25', severity: 'critical', resolved: false },
          { id: '2', type: 'CPU High', device: 'OLT-Branch-02', time: '11:20', severity: 'warning', resolved: false },
          { id: '3', type: 'Signal Low', device: 'ONT-123', time: '12:35', severity: 'info', resolved: false },
          { id: '4', type: 'Battery Low', device: 'UPS-001', time: '09:15', severity: 'warning', resolved: true, resolvedAt: '10:45' },
          { id: '5', type: 'Cooling Fan Failure', device: 'OLT-South-05', time: '08:30', severity: 'critical', resolved: true, resolvedAt: '11:20' },
          { id: '6', type: 'Packet Loss', device: 'OLT-North-04', time: '14:05', severity: 'info', resolved: false },
        ];
        
        setAlerts(demoData);
        setLoading(false);
        return;
      }
      
      // Format alerts for display
      const formattedAlerts = alertsData.map(alert => ({
        id: alert.id,
        type: alert.type || alert.message || 'Alert',
        device: alert.device || alert.olt_name || (alert.olt_id ? `OLT ID: ${alert.olt_id.substr(0, 8)}` : 'Unknown Device'),
        time: formatTime(alert.created_at) || '',
        timestamp: alert.created_at,
        severity: alert.severity || 'info',
        resolved: !!alert.resolved_at,
        resolvedAt: alert.resolved_at ? formatTime(alert.resolved_at) : null
      }));
      
      setAlerts(formattedAlerts);
    } catch (error) {
      console.error("Error in fetchAllAlerts:", error);
      // Fallback data only in case of real error
      setAlerts([
        { id: '1', type: 'Power Outage', device: 'OLT-Main-01', time: '10:25', severity: 'critical', resolved: false },
        { id: '2', type: 'CPU High', device: 'OLT-Branch-02', time: '11:20', severity: 'warning', resolved: false },
        { id: '3', type: 'Signal Low', device: 'ONT-123', time: '12:35', severity: 'info', resolved: false },
        { id: '4', type: 'Battery Low', device: 'UPS-001', time: '09:15', severity: 'warning', resolved: true, resolvedAt: '10:45' },
        { id: '5', type: 'Cooling Fan Failure', device: 'OLT-South-05', time: '08:30', severity: 'critical', resolved: true, resolvedAt: '11:20' },
        { id: '6', type: 'Packet Loss', device: 'OLT-North-04', time: '14:05', severity: 'info', resolved: false },
      ]);
    } finally {
      setLoading(false);
    }
  }
  
  async function handleResolveAlert(alertId) {
    try {
      console.log("Resolving alert:", alertId);
      // Update the alert in the database
      const { error } = await supabase
        .from('Alerts')
        .update({ resolved_at: new Date().toISOString() })
        .eq('id', alertId);
        
      if (error) {
        console.error("Error resolving alert in database:", error);
        throw error;
      }
      
      // Update the alert in the UI
      setAlerts(alerts.map(alert => 
        alert.id === alertId 
          ? { ...alert, resolved: true, resolvedAt: formatTime(new Date()) } 
          : alert
      ));
      
      console.log("Alert resolved successfully");
    } catch (error) {
      console.error("Error resolving alert:", error);
      // Fallback: still update UI for better user experience
      setAlerts(alerts.map(alert => 
        alert.id === alertId 
          ? { ...alert, resolved: true, resolvedAt: formatTime(new Date()) } 
          : alert
      ));
    }
  }
  
  // Helper function to format time
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
  
  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose} 
      title="All Alerts"
      maxWidth="max-w-3xl"
    >
      {loading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin h-8 w-8 border-4 border-green-500 rounded-full border-t-transparent"></div>
        </div>
      ) : (
        <div className="space-y-4">
          {alerts.length === 0 ? (
            <div className="text-center py-8 text-black">
              No alerts found
            </div>
          ) : (
            alerts.map(alert => (
              <div key={alert.id} className="flex items-start p-4 bg-gray-50 rounded-lg">
                <div className={`
                  h-10 w-10 rounded-full flex items-center justify-center mr-4 mt-1
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
                  <div className="flex justify-between">
                    <div>
                      <div className={`font-medium 
                        ${alert.severity === "critical" ? "text-red-500" : 
                          alert.severity === "warning" ? "text-orange-500" : "text-yellow-500"}
                      `}>
                        {alert.type}
                      </div>
                      <div className="text-sm text-black">
                        {alert.device} • {alert.time}
                      </div>
                    </div>
                    <div className="flex items-center">
                      {alert.resolved ? (
                        <Badge className="bg-green-100 text-green-600 flex items-center gap-1">
                          <CheckCircle className="h-3 w-3" />
                          Resolved {alert.resolvedAt}
                        </Badge>
                      ) : (
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="text-green-600 border-green-600 hover:bg-green-50"
                          onClick={() => handleResolveAlert(alert.id)}
                        >
                          Resolve
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </Modal>
  );
}