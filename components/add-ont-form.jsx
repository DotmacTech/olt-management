"use client";

import React, { useState } from 'react';
import { X, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// Mock data for dropdowns
const OLT_OPTIONS = ["Karasana OLT 1", "Karasana OLT 2"];
const ONU_TYPE_OPTIONS = ["EG8145V5", "ZXHN F660", "HG8245H"];
const VLAN_OPTIONS = ["202 - Management", "203 - Data", "204 - Voice"];
const ZONE_OPTIONS = ["Zone 1", "Zone 2"];
const ODB_OPTIONS = ["None", "Splitter 1", "Splitter 2"];
const ODB_PORT_OPTIONS = ["None", "Port 1", "Port 2"];
const SPEED_OPTIONS = ["1G", "500M", "100M"];

const AddONTModal = ({ isOpen, onClose, onAdd }) => {
  const [formData, setFormData] = useState({
    olt: OLT_OPTIONS[0],
    ponType: "GPON",
    board: "",
    port: "",
    sn: "",
    onuType: ONU_TYPE_OPTIONS[0],
    customProfile: false,
    onuMode: "Routing",
    vlan: VLAN_OPTIONS[0],
    zone: ZONE_OPTIONS[0],
    odb: ODB_OPTIONS[0],
    odbPort: ODB_PORT_OPTIONS[0],
    downloadSpeed: SPEED_OPTIONS[0],
    uploadSpeed: SPEED_OPTIONS[0],
    name: "",
    address: "",
    externalId: "",
    useGps: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(formData);
    onClose();
  };
if (!isOpen) return null;

return (
  <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
    <div className="relative pointer-events-auto bg-white rounded-2xl shadow-2xl border border-gray-200 max-w-2xl w-full max-h-[90vh] overflow-y-auto p-8 transition-transform scale-100">
      <div className="flex justify-between items-center mb-6 border-b pb-4">
        <h2 className="text-2xl font-bold text-black">Add New ONT</h2>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700 rounded-full p-1 transition">
          <X className="h-6 w-6" />
        </button>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* OLT */}
        <div className="mb-4">
          <label className="block font-medium mb-1">OLT</label>
          <select
            name="olt"
            value={formData.olt}
            onChange={handleChange}
            className="rounded-lg border border-gray-300 px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            {OLT_OPTIONS.map((opt) => (
              <option key={opt}>{opt}</option>
            ))}
          </select>
        </div>
        {/* PON type */}
        <div className="mb-4">
          <label className="block font-medium mb-1">PON type</label>
          <div className="flex gap-4">
            <label>
              <input type="radio" name="ponType" value="GPON" checked={formData.ponType === "GPON"} onChange={handleChange} />
              <span className="ml-2">GPON</span>
            </label>
            <label>
              <input type="radio" name="ponType" value="EPON" checked={formData.ponType === "EPON"} onChange={handleChange} />
              <span className="ml-2">EPON</span>
            </label>
          </div>
        </div>
        {/* Board */}
        <div className="mb-4">
          <label className="block font-medium mb-1">Board</label>
          <input
            type="text"
            name="board"
            value={formData.board}
            onChange={handleChange}
            className="rounded-lg border border-gray-300 px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Board (optional)"
          />
        </div>
        {/* Port */}
        <div className="mb-4">
          <label className="block font-medium mb-1">Port</label>
          <input
            type="text"
            name="port"
            value={formData.port}
            onChange={handleChange}
            className="rounded-lg border border-gray-300 px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Port (optional)"
          />
        </div>
        {/* SN */}
        <div className="mb-4">
          <label className="block font-medium mb-1">SN</label>
          <input
            type="text"
            name="sn"
            value={formData.sn}
            onChange={handleChange}
            className="rounded-lg border border-gray-300 px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
        {/* ONU type */}
        <div className="mb-4">
          <label className="block font-medium mb-1">ONU type</label>
          <select
            name="onuType"
            value={formData.onuType}
            onChange={handleChange}
            className="rounded-lg border border-gray-300 px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            {ONU_TYPE_OPTIONS.map((opt) => (
              <option key={opt}>{opt}</option>
            ))}
          </select>
          <label className="flex items-center mt-2">
            <input type="checkbox" name="customProfile" checked={formData.customProfile} onChange={handleChange} />
            <span className="ml-2">Use custom profile (For better compatibility with generic ONUs)</span>
          </label>
        </div>
        {/* ONU mode */}
        <div className="mb-4">
          <label className="block font-medium mb-1">ONU mode</label>
          <div className="flex gap-4">
            <label>
              <input type="radio" name="onuMode" value="Routing" checked={formData.onuMode === "Routing"} onChange={handleChange} />
              <span className="ml-2">Routing</span>
            </label>
            <label>
              <input type="radio" name="onuMode" value="Bridging" checked={formData.onuMode === "Bridging"} onChange={handleChange} />
              <span className="ml-2">Bridging</span>
            </label>
          </div>
        </div>
        {/* User VLAN-ID */}
        <div className="mb-4">
          <label className="block font-medium mb-1">User VLAN-ID</label>
          <select
            name="vlan"
            value={formData.vlan}
            onChange={handleChange}
            className="rounded-lg border border-gray-300 px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            {VLAN_OPTIONS.map((opt) => (
              <option key={opt}>{opt}</option>
            ))}
          </select>
        </div>
        {/* Zone */}
        <div className="mb-4">
          <label className="block font-medium mb-1">Zone</label>
          <select
            name="zone"
            value={formData.zone}
            onChange={handleChange}
            className="rounded-lg border border-gray-300 px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            {ZONE_OPTIONS.map((opt) => (
              <option key={opt}>{opt}</option>
            ))}
          </select>
        </div>
        {/* ODB (Splitter) */}
        <div className="mb-4">
          <label className="block font-medium mb-1">ODB (Splitter)</label>
          <select
            name="odb"
            value={formData.odb}
            onChange={handleChange}
            className="rounded-lg border border-gray-300 px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            {ODB_OPTIONS.map((opt) => (
              <option key={opt}>{opt}</option>
            ))}
          </select>
        </div>
        {/* ODB port */}
        <div className="mb-4">
          <label className="block font-medium mb-1">ODB port</label>
          <select
            name="odbPort"
            value={formData.odbPort}
            onChange={handleChange}
            className="rounded-lg border border-gray-300 px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            {ODB_PORT_OPTIONS.map((opt) => (
              <option key={opt}>{opt}</option>
            ))}
          </select>
        </div>
        {/* Download speed */}
        <div className="mb-4">
          <label className="block font-medium mb-1">Download speed</label>
          <select
            name="downloadSpeed"
            value={formData.downloadSpeed}
            onChange={handleChange}
            className="rounded-lg border border-gray-300 px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            {SPEED_OPTIONS.map((opt) => (
              <option key={opt}>{opt}</option>
            ))}
          </select>
        </div>
        {/* Upload speed */}
        <div className="mb-4">
          <label className="block font-medium mb-1">Upload speed</label>
          <select
            name="uploadSpeed"
            value={formData.uploadSpeed}
            onChange={handleChange}
            className="rounded-lg border border-gray-300 px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            {SPEED_OPTIONS.map((opt) => (
              <option key={opt}>{opt}</option>
            ))}
          </select>
        </div>
        {/* Name */}
        <div className="mb-4">
          <label className="block font-medium mb-1">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="rounded-lg border border-gray-300 px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
        {/* Address or comment */}
        <div className="mb-4">
          <label className="block font-medium mb-1">Address or comment</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="rounded-lg border border-gray-300 px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Address or comment (optional)"
          />
        </div>
        {/* ONU external ID */}
        <div className="mb-4">
          <label className="block font-medium mb-1">ONU external ID</label>
          <input
            type="text"
            name="externalId"
            value={formData.externalId}
            onChange={handleChange}
            className="rounded-lg border border-gray-300 px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Use the unique ONU external ID with API or billing systems"
          />
        </div>
        {/* Use GPS */}
        <div className="mb-4">
          <label className="flex items-center">
            <input type="checkbox" name="useGps" checked={formData.useGps} onChange={handleChange} />
            <span className="ml-2">Use GPS</span>
          </label>
        </div>
        {/* Buttons */}
        <div className="flex gap-4 mt-6">
          <Button type="submit" className="bg-green-600 text-white rounded-lg px-6 py-2 hover:bg-green-700 shadow">
            Save
          </Button>
          <Button type="button" variant="outline" onClick={onClose} className="rounded-lg px-6 py-2">
            Cancel
          </Button>
        </div>
      </form>
    </div>
  </div>
);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center overflow-y-auto">
      <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-2xl font-bold text-black">Add New ONT</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="h-6 w-6" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* OLT */}
          <div>
            <label className="block font-medium mb-1">OLT</label>
            <select name="olt" value={formData.olt} onChange={handleChange} className="input w-full">
              {OLT_OPTIONS.map((opt) => (
                <option key={opt}>{opt}</option>
              ))}
            </select>
          </div>
          {/* PON type */}
          <div>
            <label className="block font-medium mb-1">PON type</label>
            <div className="flex gap-4">
              <label>
                <input type="radio" name="ponType" value="GPON" checked={formData.ponType === "GPON"} onChange={handleChange} />
                GPON
              </label>
              <label>
                <input type="radio" name="ponType" value="EPON" checked={formData.ponType === "EPON"} onChange={handleChange} />
                EPON
              </label>
            </div>
          </div>
          {/* Board */}
          <div>
            <label className="block font-medium mb-1">Board</label>
            <input type="text" name="board" value={formData.board} onChange={handleChange} className="input w-full" placeholder="Board (optional)" />
          </div>
          {/* Port */}
          <div>
            <label className="block font-medium mb-1">Port</label>
            <input type="text" name="port" value={formData.port} onChange={handleChange} className="input w-full" placeholder="Port (optional)" />
          </div>
          {/* SN */}
          <div>
            <label className="block font-medium mb-1">SN</label>
            <input type="text" name="sn" value={formData.sn} onChange={handleChange} className="input w-full" />
          </div>
          {/* ONU type */}
          <div>
            <label className="block font-medium mb-1">ONU type</label>
            <select name="onuType" value={formData.onuType} onChange={handleChange} className="input w-full">
              {ONU_TYPE_OPTIONS.map((opt) => (
                <option key={opt}>{opt}</option>
              ))}
            </select>
            <label className="flex items-center mt-2">
              <input type="checkbox" name="customProfile" checked={formData.customProfile} onChange={handleChange} />
              <span className="ml-2">Use custom profile (For better compatibility with generic ONUs)</span>
            </label>
          </div>
          {/* ONU mode */}
          <div>
            <label className="block font-medium mb-1">ONU mode</label>
            <div className="flex gap-4">
              <label>
                <input type="radio" name="onuMode" value="Routing" checked={formData.onuMode === "Routing"} onChange={handleChange} />
                Routing
              </label>
              <label>
                <input type="radio" name="onuMode" value="Bridging" checked={formData.onuMode === "Bridging"} onChange={handleChange} />
                Bridging
              </label>
            </div>
          </div>
          {/* User VLAN-ID */}
          <div>
            <label className="block font-medium mb-1">User VLAN-ID</label>
            <select name="vlan" value={formData.vlan} onChange={handleChange} className="input w-full">
              {VLAN_OPTIONS.map((opt) => (
                <option key={opt}>{opt}</option>
              ))}
            </select>
          </div>
          {/* Zone */}
          <div>
            <label className="block font-medium mb-1">Zone</label>
            <select name="zone" value={formData.zone} onChange={handleChange} className="input w-full">
              {ZONE_OPTIONS.map((opt) => (
                <option key={opt}>{opt}</option>
              ))}
            </select>
          </div>
          {/* ODB (Splitter) */}
          <div>
            <label className="block font-medium mb-1">ODB (Splitter)</label>
            <select name="odb" value={formData.odb} onChange={handleChange} className="input w-full">
              {ODB_OPTIONS.map((opt) => (
                <option key={opt}>{opt}</option>
              ))}
            </select>
          </div>
          {/* ODB port */}
          <div>
            <label className="block font-medium mb-1">ODB port</label>
            <select name="odbPort" value={formData.odbPort} onChange={handleChange} className="input w-full">
              {ODB_PORT_OPTIONS.map((opt) => (
                <option key={opt}>{opt}</option>
              ))}
            </select>
          </div>
          {/* Download speed */}
          <div>
            <label className="block font-medium mb-1">Download speed</label>
            <select name="downloadSpeed" value={formData.downloadSpeed} onChange={handleChange} className="input w-full">
              {SPEED_OPTIONS.map((opt) => (
                <option key={opt}>{opt}</option>
              ))}
            </select>
          </div>
          {/* Upload speed */}
          <div>
            <label className="block font-medium mb-1">Upload speed</label>
            <select name="uploadSpeed" value={formData.uploadSpeed} onChange={handleChange} className="input w-full">
              {SPEED_OPTIONS.map((opt) => (
                <option key={opt}>{opt}</option>
              ))}
            </select>
          </div>
          {/* Name */}
          <div>
            <label className="block font-medium mb-1">Name</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} className="input w-full" />
          </div>
          {/* Address or comment */}
          <div>
            <label className="block font-medium mb-1">Address or comment</label>
            <input type="text" name="address" value={formData.address} onChange={handleChange} className="input w-full" placeholder="Address or comment (optional)" />
          </div>
          {/* ONU external ID */}
          <div>
            <label className="block font-medium mb-1">ONU external ID</label>
            <input type="text" name="externalId" value={formData.externalId} onChange={handleChange} className="input w-full" placeholder="Use the unique ONU external ID with API or billing systems" />
          </div>
          {/* Use GPS */}
          <div>
            <label className="flex items-center">
              <input type="checkbox" name="useGps" checked={formData.useGps} onChange={handleChange} />
              <span className="ml-2">Use GPS</span>
            </label>
          </div>
          {/* Buttons */}
          <div className="flex gap-4 mt-4">
            <Button type="submit" className="bg-green-600 text-white">Save</Button>
            <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddONTModal;

