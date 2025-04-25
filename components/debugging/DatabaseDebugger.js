"use client";

import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// Initialize Supabase client directly in this component for testing
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export function DatabaseDebugger() {
  const [envVars, setEnvVars] = useState({ 
    url: !!supabaseUrl, 
    key: !!supabaseKey 
  });
  const [testResults, setTestResults] = useState([]);
  const [isWorking, setIsWorking] = useState(false);
  const [testStatus, setTestStatus] = useState('idle');
  
  // Test database tables
  const runTests = async () => {
    setIsWorking(true);
    setTestStatus('running');
    const results = [];
    
    try {
      // Log environment variables status (not the values)
      results.push({
        name: 'Environment Variables',
        status: (supabaseUrl && supabaseKey) ? 'success' : 'error',
        message: (supabaseUrl && supabaseKey) 
          ? 'Both URL and API key are defined' 
          : `Missing: ${!supabaseUrl ? 'URL ' : ''}${!supabaseKey ? 'API Key' : ''}`
      });
      
      // Test basic Supabase connection
      try {
        // We'll try to get server time which should work with any valid connection
        const { data, error } = await supabase.rpc('get_service_role');
        
        // If we get an error about function not existing, that's still a successful connection
        const isConnected = data || (error && error.code === 'P0001');
        
        results.push({
          name: 'Supabase Connection',
          status: isConnected ? 'success' : 'error',
          message: isConnected 
            ? 'Successfully connected to Supabase' 
            : `Connection failed: ${error?.message || 'Unknown error'}`
        });
      } catch (err) {
        results.push({
          name: 'Supabase Connection',
          status: 'error',
          message: `Exception: ${err.message}`
        });
      }
      
      // Test each table
      const tables = ['OLTs', 'MonitoringMetrics', 'Alerts'];
      
      for (const table of tables) {
        try {
          const { data, error } = await supabase.from(table).select('count');
          
          if (error) {
            results.push({
              name: `${table} Table`,
              status: 'error',
              message: `Error: ${error.message} (${error.code})`
            });
          } else {
            const { data: tableData, error: tableError } = await supabase
              .from(table)
              .select('*')
              .limit(3);
              
            if (tableError) {
              results.push({
                name: `${table} Table`,
                status: 'warning',
                message: `Table exists but error fetching data: ${tableError.message}`,
                data: null
              });
            } else {
              results.push({
                name: `${table} Table`,
                status: 'success',
                message: `${tableData.length} records found (showing first 3)`,
                data: tableData
              });
            }
          }
        } catch (err) {
          results.push({
            name: `${table} Table`,
            status: 'error',
            message: `Exception: ${err.message}`,
            data: null
          });
        }
      }
      
      setTestResults(results);
      
      // Determine overall status
      const hasErrors = results.some(r => r.status === 'error');
      const hasSuccess = results.some(r => r.status === 'success' && r.data && r.data.length > 0);
      
      setTestStatus(hasErrors ? 'failed' : (hasSuccess ? 'success' : 'warning'));
    } catch (err) {
      console.error("Error running tests:", err);
      setTestStatus('failed');
    } finally {
      setIsWorking(false);
    }
  };
  
  // Create sample data
  const createSampleData = async () => {
    setIsWorking(true);
    
    try {
      // Create a test OLT
      const { data: olt, error: oltError } = await supabase
        .from('OLTs')
        .insert([{
          name: `Debug-OLT-${Math.floor(Math.random() * 1000)}`,
          location: 'Diagnostic Location',
          status: 'Active',
          ip_address: '192.168.1.1',
          model: 'Debug Model'
        }])
        .select();
      
      if (oltError) throw new Error(`Error creating OLT: ${oltError.message}`);
      if (!olt || olt.length === 0) throw new Error('OLT created but no data returned');
      
      // Create test metrics
      const { error: metricError } = await supabase
        .from('MonitoringMetrics')
        .insert([{
          olt_id: olt[0].id,
          total_onus: '64',
          active_onus: '60',
          down_onus: '4',
          bandwidth_used: '120.5'
        }]);
      
      if (metricError) throw new Error(`Error creating Metric: ${metricError.message}`);
      
      // Create test alert
      const { error: alertError } = await supabase
        .from('Alerts')
        .insert([{
          type: 'Test Alert',
          message: 'This is a diagnostic test alert',
          device: olt[0].name,
          olt_id: olt[0].id,
          olt_name: olt[0].name,
          severity: 'warning'
        }]);
      
      if (alertError) throw new Error(`Error creating Alert: ${alertError.message}`);
      
      alert('Sample data created successfully! Refresh to see it in your dashboard.');
      
      // Run tests after creating data
      runTests();
    } catch (err) {
      console.error("Error creating sample data:", err);
      alert(`Error creating sample data: ${err.message}`);
    } finally {
      setIsWorking(false);
    }
  };
  
  // Run tests on mount
  useEffect(() => {
    runTests();
  }, []);
  
  return (
    <Card className="mb-6 border-2 border-red-300">
      <CardHeader className="bg-red-50">
        <CardTitle className="text-red-700">Database Connection Debugger</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex space-x-2">
            <Button 
              onClick={runTests} 
              disabled={isWorking}
              className="bg-blue-600"
            >
              {isWorking ? 'Testing...' : 'Test Database Connection'}
            </Button>
            <Button 
              onClick={createSampleData} 
              disabled={isWorking}
              className="bg-green-600"
            >
              Create Sample Data
            </Button>
            <div className="ml-auto">
              <Badge className={
                testStatus === 'success' ? 'bg-green-100 text-green-600' :
                testStatus === 'failed' ? 'bg-red-100 text-red-600' :
                testStatus === 'warning' ? 'bg-orange-100 text-orange-600' :
                'bg-gray-100 text-gray-600'
              }>
                {testStatus === 'success' ? 'All Tests Passed' :
                 testStatus === 'failed' ? 'Tests Failed' :
                 testStatus === 'warning' ? 'Some Issues Found' :
                 testStatus === 'running' ? 'Running Tests...' : 'Not Tested'}
              </Badge>
            </div>
          </div>
          
          <div className="space-y-3">
            {testResults.map((result, index) => (
              <div key={index} className="border rounded p-3">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-medium text-black">{result.name}</h3>
                  <Badge className={
                    result.status === 'success' ? 'bg-green-100 text-green-600' :
                    result.status === 'error' ? 'bg-red-100 text-red-600' :
                    'bg-orange-100 text-orange-600'
                  }>
                    {result.status}
                  </Badge>
                </div>
                <p className="text-sm text-black">{result.message}</p>
                {result.data && (
                  <div className="mt-2 text-xs overflow-auto max-h-40 bg-gray-50 p-2 rounded">
                    <pre>{JSON.stringify(result.data, null, 2)}</pre>
                  </div>
                )}
              </div>
            ))}
          </div>
          
          <div className="mt-4 p-3 bg-gray-50 rounded text-sm">
            <p className="font-medium text-black">Troubleshooting Tips:</p>
            <ul className="list-disc pl-5 space-y-1 mt-2 text-black">
              <li>Make sure you have a <code>.env.local</code> file with the correct Supabase credentials</li>
              <li>Verify that your API keys have the correct permissions</li>
              <li>Check that your database tables exist and are named correctly: <code>OLTs</code>, <code>MonitoringMetrics</code>, <code>Alerts</code></li>
              <li>Try creating sample data with the button above to populate your tables</li>
              <li>If using RLS (Row Level Security), ensure your policies allow access</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}