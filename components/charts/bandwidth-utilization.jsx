"use client";

import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { useNetworkData } from '@/contexts/data-context';

export function BandwidthUtilizationChart() {
  const data = useNetworkData();
  
  // Convert raw bandwidth values to percentages for the chart
  const total = data.bandwidth.distribution.video + 
                data.bandwidth.distribution.data + 
                data.bandwidth.distribution.voice || 0.1;
                
  // Calculate percentages
  const videoPercent = Math.round((data.bandwidth.distribution.video / total) * 100);
  const dataPercent = Math.round((data.bandwidth.distribution.data / total) * 100);
  const voicePercent = Math.round((data.bandwidth.distribution.voice / total) * 100);
  
  // Ensure percentages add up to 100%
  const adjustedVoicePercent = 100 - videoPercent - dataPercent;
  
  const chartData = [
    { name: 'Video', value: videoPercent, color: '#3b82f6' },
    { name: 'Data', value: dataPercent, color: '#f97316' },
    { name: 'Voice', value: adjustedVoicePercent > 0 ? adjustedVoicePercent : 0, color: '#22c55e' },
  ].filter(item => item.value > 0); // Only include non-zero values
  
  // If no data, provide placeholder
  if (chartData.length === 0) {
    chartData.push(
      { name: 'No Data', value: 100, color: '#cbd5e1' }
    );
  }
  
  // Calculate bandwidth utilization percentage (0-100)
  // This would typically be based on your total available bandwidth
  // For now we'll use the utilized value directly from the data context
  const utilizedPercent = Math.min(Math.round(data.bandwidth.utilized), 100);
  
  return (
    <div className="relative w-full h-full">
      <div className="flex justify-center items-center">
        <div className="absolute inset-0 flex items-center justify-center flex-col">
          <p className="text-3xl font-bold text-black">{utilizedPercent}%</p>
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