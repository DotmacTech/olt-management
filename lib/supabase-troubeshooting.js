"use client";

import { createClient } from '@supabase/supabase-js';

// This utility file is for debugging your Supabase connection
// Add this to your project and run the functions to diagnose connection issues

// Initialize the Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

console.log("SUPABASE URL defined:", !!supabaseUrl);
console.log("SUPABASE KEY defined:", !!supabaseKey);

// Test if the URL is valid
let validUrl = false;
try {
  if (supabaseUrl) {
    new URL(supabaseUrl);
    validUrl = true;
  }
} catch (e) {
  console.error("Supabase URL is not a valid URL:", e.message);
}
console.log("SUPABASE URL is valid:", validUrl);

// Create Supabase client if URL and key are available
let supabase = null;
if (supabaseUrl && supabaseKey) {
  supabase = createClient(supabaseUrl, supabaseKey);
}

// Utility functions to test specific tables
export async function testOltsTable() {
  if (!supabase) {
    console.error("Supabase client not initialized");
    return { success: false, error: "Client not initialized" };
  }

  try {
    console.log("Testing OLTs table...");
    const { data, error, count } = await supabase
      .from('OLTs')
      .select('*', { count: 'exact' });

    if (error) {
      console.error("Error querying OLTs table:", error);
      return { success: false, error };
    }

    console.log(`OLTs table test successful, found ${count} records:`, data);
    return { success: true, count, data };
  } catch (error) {
    console.error("Exception during OLTs table test:", error);
    return { success: false, error };
  }
}

export async function testMonitoringMetricsTable() {
  if (!supabase) {
    console.error("Supabase client not initialized");
    return { success: false, error: "Client not initialized" };
  }

  try {
    console.log("Testing MonitoringMetrics table...");
    const { data, error, count } = await supabase
      .from('MonitoringMetrics')
      .select('*', { count: 'exact' })
      .limit(10);

    if (error) {
      console.error("Error querying MonitoringMetrics table:", error);
      return { success: false, error };
    }

    console.log(`MonitoringMetrics table test successful, found ${data.length} records:`, data);
    return { success: true, count: data.length, data };
  } catch (error) {
    console.error("Exception during MonitoringMetrics table test:", error);
    return { success: false, error };
  }
}

export async function testAlertsTable() {
  if (!supabase) {
    console.error("Supabase client not initialized");
    return { success: false, error: "Client not initialized" };
  }

  try {
    console.log("Testing Alerts table...");
    const { data, error, count } = await supabase
      .from('Alerts')
      .select('*', { count: 'exact' })
      .limit(10);

    if (error) {
      console.error("Error querying Alerts table:", error);
      return { success: false, error };
    }

    console.log(`Alerts table test successful, found ${data.length} records:`, data);
    return { success: true, count: data.length, data };
  } catch (error) {
    console.error("Exception during Alerts table test:", error);
    return { success: false, error };
  }
}

// Run all tests together
export async function runAllTests() {
  console.log("=== SUPABASE CONNECTION TESTS ===");
  
  if (!supabase) {
    console.error("❌ Supabase client not initialized - check your environment variables");
    return { success: false };
  }
  
  const oltsResult = await testOltsTable();
  const metricsResult = await testMonitoringMetricsTable();
  const alertsResult = await testAlertsTable();
  
  console.log("=== TEST RESULTS SUMMARY ===");
  console.log("OLTs table:", oltsResult.success ? "✅ Success" : "❌ Failed");
  console.log("MonitoringMetrics table:", metricsResult.success ? "✅ Success" : "❌ Failed");
  console.log("Alerts table:", alertsResult.success ? "✅ Success" : "❌ Failed");
  
  return {
    success: oltsResult.success && metricsResult.success && alertsResult.success,
    olts: oltsResult,
    metrics: metricsResult,
    alerts: alertsResult
  };
}

// Use this function to create test data in your database
export async function createTestData() {
  if (!supabase) {
    console.error("Supabase client not initialized");
    return { success: false };
  }
  
  try {
    console.log("Creating test OLT...");
    
    // Create a test OLT
    const { data: olt, error: oltError } = await supabase
      .from('OLTs')
      .insert([
        {
          name: 'Test-OLT-01',
          location: 'Test Location',
          status: 'Active', 
          ip_address: '192.168.1.1',
          model: 'Test Model'
        }
      ])
      .select();
      
    if (oltError) {
      console.error("Error creating test OLT:", oltError);
      return { success: false, error: oltError };
    }
    
    console.log("Created test OLT:", olt);
    
    if (olt && olt.length > 0) {
      // Create a test metric for this OLT
      console.log("Creating test metric...");
      const { data: metric, error: metricError } = await supabase
        .from('MonitoringMetrics')
        .insert([
          {
            olt_id: olt[0].id,
            total_onus: '128',
            active_onus: '120',
            down_onus: '8',
            bandwidth_used: '145.6'
          }
        ])
        .select();
        
      if (metricError) {
        console.error("Error creating test metric:", metricError);
      } else {
        console.log("Created test metric:", metric);
      }
      
      // Create a test alert for this OLT
      console.log("Creating test alert...");
      const { data: alert, error: alertError } = await supabase
        .from('Alerts')
        .insert([
          {
            type: 'Test Alert',
            message: 'This is a test alert',
            device: 'Test-OLT-01',
            olt_id: olt[0].id,
            olt_name: 'Test-OLT-01',
            severity: 'warning'
          }
        ])
        .select();
        
      if (alertError) {
        console.error("Error creating test alert:", alertError);
      } else {
        console.log("Created test alert:", alert);
      }
      
      return { 
        success: true, 
        created: { 
          olt: olt[0], 
          metric: metric || null, 
          alert: alert || null 
        } 
      };
    }
    
    return { success: false, error: "OLT was not created" };
  } catch (error) {
    console.error("Exception during test data creation:", error);
    return { success: false, error };
  }
}

// Instructions for using this file:
/*
  1. Import this file in your dashboard page temporarily
  2. Call the functions from your useEffect or a button click:
     
     import { runAllTests, createTestData } from '@/lib/supabase-troubleshooting';
     
     // In a component:
     useEffect(() => {
       runAllTests().then(results => {
         console.log("Test results:", results);
       });
     }, []);
     
     // Or with a button:
     <button onClick={() => createTestData()}>Create Test Data</button>
     
  3. Check your browser console for detailed logs
  4. Remove the imports and calls when you're done troubleshooting
*/