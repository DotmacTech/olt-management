"use client";

import React, { useState } from 'react';
import { X, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const AddOLTModal = ({ isOpen, onClose, onAdd }) => {
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    ipAddress: '',
    dataCenter: 'Data Center 1',
    location: '',
    model: 'GPON-8800',
    manufacturer: 'CiscoFi',
    serialNumber: '',
    firmware: 'v4.2.17',
    macAddress: '',
    managementVlan: '100',
    dataVlanRange: '500-599',
    voiceVlanRange: '600-699',
    videoVlanRange: '700-799',
    routingProtocol: 'OSPF',
    portCount: 4
  });
  
  const [activeTab, setActiveTab] = useState('basic');
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(formData);
    onClose();
  };
  
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center overflow-y-auto">
      <div className="bg-white rounded-lg shadow-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-2xl font-bold text-black">Add New OLT</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="p-6">
            <div className="flex border-b mb-6">
              <button
                type="button"
                className={`px-6 py-3 text-sm font-medium ${
                  activeTab === 'basic' 
                    ? 'text-green-600 border-b-2 border-green-600' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setActiveTab('basic')}
              >
                Basic Info
              </button>
              <button
                type="button"
                className={`px-6 py-3 text-sm font-medium ${
                  activeTab === 'system' 
                    ? 'text-green-600 border-b-2 border-green-600' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setActiveTab('system')}
              >
                System
              </button>
              <button
                type="button"
                className={`px-6 py-3 text-sm font-medium ${
                  activeTab === 'network' 
                    ? 'text-green-600 border-b-2 border-green-600' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setActiveTab('network')}
              >
                Network
              </button>
              <button
                type="button"
                className={`px-6 py-3 text-sm font-medium ${
                  activeTab === 'ports' 
                    ? 'text-green-600 border-b-2 border-green-600' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setActiveTab('ports')}
              >
                Ports
              </button>
            </div>
            
            {/* Basic Info Tab */}
            {activeTab === 'basic' && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-black mb-4">Basic Information</h3>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">OLT ID *</label>
                    <input
                      type="text"
                      name="id"
                      value={formData.id}
                      onChange={handleChange}
                      placeholder="e.g., OLT-East-01"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">OLT Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g., East Zone Primary OLT"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">IP Address *</label>
                    <input
                      type="text"
                      name="ipAddress"
                      value={formData.ipAddress}
                      onChange={handleChange}
                      placeholder="e.g., 192.168.1.10"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Data Center</label>
                    <div className="relative">
                      <select
                        name="dataCenter"
                        value={formData.dataCenter}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 appearance-none"
                      >
                        <option value="Data Center 1">Data Center 1</option>
                        <option value="Data Center 2">Data Center 2</option>
                        <option value="Data Center 3">Data Center 3</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <ChevronRight className="rotate-90 h-4 w-4" />
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="e.g., Rack B12, Unit 5-8"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <div className="flex justify-end pt-4">
                  <Button 
                    type="button" 
                    onClick={() => setActiveTab('system')}
                    className="bg-green-600 hover:bg-green-700 text-white"
                  >
                    Next
                  </Button>
                </div>
              </div>
            )}
            
            {/* System Tab */}
            {activeTab === 'system' && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-black mb-4">System Information</h3>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Model</label>
                    <input
                      type="text"
                      name="model"
                      value={formData.model}
                      onChange={handleChange}
                      placeholder="e.g., GPON-8800"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Manufacturer</label>
                    <input
                      type="text"
                      name="manufacturer"
                      value={formData.manufacturer}
                      onChange={handleChange}
                      placeholder="e.g., CiscoFi"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Serial Number *</label>
                    <input
                      type="text"
                      name="serialNumber"
                      value={formData.serialNumber}
                      onChange={handleChange}
                      placeholder="e.g., CFI-8800-E1-763254"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Firmware Version</label>
                    <input
                      type="text"
                      name="firmware"
                      value={formData.firmware}
                      onChange={handleChange}
                      placeholder="e.g., v4.2.17"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">MAC Address</label>
                  <input
                    type="text"
                    name="macAddress"
                    value={formData.macAddress}
                    onChange={handleChange}
                    placeholder="e.g., 00:1A:2B:3C:4D:5E"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <div className="flex justify-between pt-4">
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => setActiveTab('basic')}
                  >
                    Back
                  </Button>
                  <Button 
                    type="button" 
                    onClick={() => setActiveTab('network')}
                    className="bg-green-600 hover:bg-green-700 text-white"
                  >
                    Next
                  </Button>
                </div>
              </div>
            )}
            
            {/* Network Tab */}
            {activeTab === 'network' && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-black mb-4">Network Configuration</h3>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Management VLAN</label>
                    <input
                      type="text"
                      name="managementVlan"
                      value={formData.managementVlan}
                      onChange={handleChange}
                      placeholder="e.g., 100"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Routing Protocol</label>
                    <div className="relative">
                      <select
                        name="routingProtocol"
                        value={formData.routingProtocol}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 appearance-none"
                      >
                        <option value="OSPF">OSPF</option>
                        <option value="BGP">BGP</option>
                        <option value="Static">Static</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <ChevronRight className="rotate-90 h-4 w-4" />
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Data VLAN Range</label>
                    <input
                      type="text"
                      name="dataVlanRange"
                      value={formData.dataVlanRange}
                      onChange={handleChange}
                      placeholder="e.g., 500-599"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Voice VLAN Range</label>
                    <input
                      type="text"
                      name="voiceVlanRange"
                      value={formData.voiceVlanRange}
                      onChange={handleChange}
                      placeholder="e.g., 600-699"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Video VLAN Range</label>
                  <input
                    type="text"
                    name="videoVlanRange"
                    value={formData.videoVlanRange}
                    onChange={handleChange}
                    placeholder="e.g., 700-799"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <div className="flex justify-between pt-4">
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => setActiveTab('system')}
                  >
                    Back
                  </Button>
                  <Button 
                    type="button" 
                    onClick={() => setActiveTab('ports')}
                    className="bg-green-600 hover:bg-green-700 text-white"
                  >
                    Next
                  </Button>
                </div>
              </div>
            )}
            
            {/* Ports Tab */}
            {activeTab === 'ports' && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-black mb-4">Ports Configuration</h3>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Number of Ports</label>
                    <div className="relative">
                      <select
                        name="portCount"
                        value={formData.portCount}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 appearance-none"
                      >
                        <option value="4">4 Ports</option>
                        <option value="8">8 Ports</option>
                        <option value="16">16 Ports</option>
                        <option value="24">24 Ports</option>
                        <option value="48">48 Ports</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <ChevronRight className="rotate-90 h-4 w-4" />
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 p-4 bg-gray-50 rounded-md">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Default Port Settings</h4>
                  <p className="text-sm text-gray-500 mb-4">
                    These settings will be applied to all ports. You can modify individual port settings after creating the OLT.
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center">
                      <input 
                        type="checkbox" 
                        id="port-admin-up" 
                        className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                        defaultChecked={true}
                      />
                      <label htmlFor="port-admin-up" className="ml-2 block text-sm text-gray-700">
                        Set ports as admin up
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input 
                        type="checkbox" 
                        id="auto-config" 
                        className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                        defaultChecked={true}
                      />
                      <label htmlFor="auto-config" className="ml-2 block text-sm text-gray-700">
                        Enable auto-configuration
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input 
                        type="checkbox" 
                        id="port-monitoring" 
                        className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                        defaultChecked={true}
                      />
                      <label htmlFor="port-monitoring" className="ml-2 block text-sm text-gray-700">
                        Enable port monitoring
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input 
                        type="checkbox" 
                        id="rogue-ont-detection" 
                        className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                        defaultChecked={true}
                      />
                      <label htmlFor="rogue-ont-detection" className="ml-2 block text-sm text-gray-700">
                        Enable rogue ONT detection
                      </label>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-between pt-4">
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => setActiveTab('network')}
                  >
                    Back
                  </Button>
                  <div className="flex space-x-2">
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={onClose}
                    >
                      Cancel
                    </Button>
                    <Button 
                      type="submit"
                      className="bg-green-600 hover:bg-green-700 text-white"
                    >
                      Add OLT
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddOLTModal;