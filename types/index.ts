export type VendorType = 'ZTE' | 'HUAWEI';
export type OnuStatus = 'ACTIVE' | 'INACTIVE' | 'PENDING' | 'DISABLED';

export interface DeviceModel {
  id: string;
  vendor: VendorType;
  name: string;
  capabilities?: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
}

export interface Olt {
  id: string;
  name: string;
  ipAddress: string;
  modelId: string;
  username?: string;
  password?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface PonPort {
  id: string;
  oltId: string;
  portIndex: number;
  alias?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Customer {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ServiceProfile {
  id: string;
  name: string;
  upstream: number;
  downstream: number;
  vlan: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface OnuModel {
  id: string;
  vendor: VendorType;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Onu {
  id: string;
  ponPortId: string;
  serialNumber: string;
  description?: string;
  status: OnuStatus;
  customerId?: string;
  profileId?: string;
  onuModelId?: string;
  createdAt: Date;
  updatedAt: Date;
}