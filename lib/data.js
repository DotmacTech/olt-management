// lib/data.js

export function getNetworkData() {
    return {
      total: {
        olts: 34,
        activeOlts: 28,
        inactiveOlts: 6,
        onts: 1248,
        activeOnts: 1189,
        inactiveOnts: 59,
      },
      network: {
        availability: 99.8,
        downtime: 3, // hours
      },
      alerts: {
        total: 8,
        critical: 2,
        warning: 3,
        info: 3,
      },
      traffic: {
        // Sample data for the chart
        download: [25, 28, 32, 45, 56, 65, 60, 55, 58, 62, 58, 55],
        upload: [15, 18, 22, 28, 32, 35, 32, 30, 31, 34, 32, 30],
        times: ["00:00", "02:00", "04:00", "06:00", "08:00", "10:00", "12:00", "14:00", "16:00", "18:00", "20:00", "22:00"],
      },
      bandwidth: {
        utilized: 75,
        distribution: {
          video: 45,
          data: 30,
          voice: 25,
        },
      },
      oltStatus: [
        { name: "OLT-East-01", location: "Data Center 1", status: "Active", load: 80 },
        { name: "OLT-West-05", location: "Data Center 2", status: "Active", load: 67 },
        { name: "OLT-North-03", location: "Data Center 1", status: "Warning", load: 90 },
        { name: "OLT-South-07", location: "Data Center 3", status: "Degraded", load: 58 },
      ],
      recentAlerts: [
        { type: "High Latency Detected", device: "OLT-North-03", time: "25 minutes ago", severity: "critical" },
        { type: "Bandwidth Threshold", device: "OLT-East-01", time: "1 hour ago", severity: "warning" },
        { type: "ONT Signal Degraded", device: "OLT-South-07", time: "2 hours ago", severity: "info" },
      ],
    };
  }