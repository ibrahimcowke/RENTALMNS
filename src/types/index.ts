export type District = 
  | 'Abdiaziz' 
  | 'Bondhere' 
  | 'Daynile' 
  | 'Dharkenley' 
  | 'Hamar Jajab' 
  | 'Hamar Weyne' 
  | 'Heliwa' 
  | 'Hodan' 
  | 'Howlwadag' 
  | 'Karan' 
  | 'Shangani' 
  | 'Shibis' 
  | 'Waberi' 
  | 'Wadajir' 
  | 'Wardhigley' 
  | 'Yaqshid' 
  | 'Kahda';

export type PropertyType = 'Villa' | 'Apartment' | 'Shop' | 'Office' | 'Warehouse';

export interface Property {
  id: string;
  name: string;
  type: PropertyType;
  district: District;
  address: string;
  rentAmount: number;
  currency: 'USD' | 'SOS';
  status: 'Available' | 'Occupied' | 'Maintenance';
  units: number;
  image?: string;
}

export interface Tenant {
  id: string;
  name: string;
  phone: string;
  email?: string;
  propertyId: string;
  leaseStart: string;
  leaseEnd: string;
  status: 'Active' | 'Notice' | 'Past';
}

export interface Payment {
  id: string;
  propertyId: string;
  tenantId: string;
  amount: number;
  date: string;
  month: string;
  status: 'Paid' | 'Pending' | 'Overdue';
}

export interface MaintenanceTicket {
  id: string;
  propertyId: string;
  description: string;
  priority: 'Low' | 'Medium' | 'High';
  status: 'Open' | 'In Progress' | 'Resolved';
  createdAt: string;
}
