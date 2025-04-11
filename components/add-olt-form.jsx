// components/add-olt-form.jsx
"use client";

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function AddOLTForm() {
  const [formData, setFormData] = useState({
    id: '',
    dataCenter: '',
    ipAddress: '',
    model: '',
    manufacturer: '',
  });
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit the form data to your API
    console.log('Form data:', formData);
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="id">OLT ID</Label>
          <Input 
            id="id" 
            value={formData.id}
            onChange={(e) => setFormData({...formData, id: e.target.value})}
            placeholder="e.g., OLT-East-01"
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="dataCenter">Data Center</Label>
          <Select 
            value={formData.dataCenter}
            onValueChange={(value) => setFormData({...formData, dataCenter: value})}
            required
          >
            <SelectTrigger id="dataCenter">
              <SelectValue placeholder="Select data center" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Data Center 1">Data Center 1</SelectItem>
              <SelectItem value="Data Center 2">Data Center 2</SelectItem>
              <SelectItem value="Data Center 3">Data Center 3</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="ipAddress">IP Address</Label>
          <Input 
            id="ipAddress" 
            value={formData.ipAddress}
            onChange={(e) => setFormData({...formData, ipAddress: e.target.value})}
            placeholder="e.g., 192.168.1.10"
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="model">Model</Label>
          <Input 
            id="model" 
            value={formData.model}
            onChange={(e) => setFormData({...formData, model: e.target.value})}
            placeholder="e.g., GPON-8800"
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="manufacturer">Manufacturer</Label>
          <Input 
            id="manufacturer" 
            value={formData.manufacturer}
            onChange={(e) => setFormData({...formData, manufacturer: e.target.value})}
            placeholder="e.g., CiscoFi"
            required
          />
        </div>
      </div>
      
      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline">Cancel</Button>
        <Button type="submit">Add OLT</Button>
      </div>
    </form>
  );
}