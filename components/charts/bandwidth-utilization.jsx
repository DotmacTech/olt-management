"use client";

import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { useNetworkData } from '@/contexts/data-context';

export function BandwidthUtilizationChart() {
  const data = useNetworkData();
  
  const chartData = [
    { name: 'Video', value: data.bandwidth.distribution.video, color: '#3b82f6' },
    { name: 'Data', value: data.bandwidth.distribution.data, color: '#f97316' },
    { name: 'Voice', value: data.bandwidth.distribution.voice, color: '#22c55e' },
  ];
  
  const COLORS = ['#3b82f6', '#f97316', '#22c55e'];
  
  return (
    <div className="relative w-full h-full">
      <div className="flex justify-center items-center">
        <div className="absolute inset-0 flex items-center justify-center flex-col">
          <p className="text-3xl font-bold text-black">{data.bandwidth.utilized}%</p>
          <p className="text-sm text-black">Utilized</p>
        </div>
        <ResponsiveContainer width="100%" height={220}>
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={2}
              dataKey="value"
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} strokeWidth={1} stroke="#fff" />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{ backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', border: 'none', color: '#000000' }}
              formatter={(value) => [`${value}%`, 'Usage']}
              labelStyle={{ color: '#000000' }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="flex justify-center space-x-6 mt-4">
        {chartData.map((entry) => (
          <div key={entry.name} className="flex items-center">
            <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: entry.color }}></div>
            <span className="text-sm text-black">{entry.name} ({entry.value}%)</span>
          </div>
        ))}
      </div>
    </div>
  );
}