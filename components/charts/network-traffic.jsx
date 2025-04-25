"use client";

import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useNetworkData } from '@/contexts/data-context';

export function NetworkTrafficChart() {
  const data = useNetworkData();
  
  // Format data for the chart
  const chartData = data.traffic.times.map((time, index) => ({
    time,
    download: data.traffic.download[index],
    upload: data.traffic.upload[index],
  }));
  
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e5e5" />
        <XAxis 
          dataKey="time" 
          axisLine={false}
          tickLine={false}
          tick={{ fill: '#000000', fontSize: 12 }}
        />
        <YAxis 
          label={{ value: 'Gbps', angle: -90, position: 'insideLeft', fill: '#000000', fontSize: 12 }}
          axisLine={false}
          tickLine={false}
          tick={{ fill: '#000000', fontSize: 12 }}
        />
        <Tooltip 
          contentStyle={{ backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', border: 'none', color: '#000000' }}
          labelStyle={{ fontWeight: 'bold', color: '#000000' }}
        />
        <Legend 
          wrapperStyle={{ paddingTop: 10 }} 
          formatter={(value) => <span style={{ color: '#000000' }}>{value}</span>}
        />
        <Line 
          type="monotone" 
          dataKey="download" 
          stroke="#3b82f6" 
          strokeWidth={3}
          name="Online"
          dot={false}
          activeDot={{ r: 6, fill: '#3b82f6', stroke: 'white', strokeWidth: 2 }}
        />
        <Line 
          type="monotone" 
          dataKey="upload" 
          stroke="#f97316" 
          strokeWidth={3}
          name="Offline"
          dot={false}
          activeDot={{ r: 6, fill: '#f97316', stroke: 'white', strokeWidth: 2 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}