import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Property, Tenant, Payment, MaintenanceTicket } from '../types';

export interface Notification {
  id: string;
  type: 'info' | 'warning' | 'error' | 'success';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
}

interface AppState {
  properties: Property[];
  tenants: Tenant[];
  payments: Payment[];
  maintenance: MaintenanceTicket[];
  currency: 'USD' | 'SOS';
  exchangeRate: number; // 1 USD to SOS
  notifications: Notification[];
  
  // Actions
  setCurrency: (currency: 'USD' | 'SOS') => void;
  setExchangeRate: (rate: number) => void;
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => void;
  markNotificationRead: (id: string) => void;
  clearNotifications: () => void;
  
  addProperty: (property: Property) => void;
  updateProperty: (id: string, property: Partial<Property>) => void;
  deleteProperty: (id: string) => void;
  
  addTenant: (tenant: Tenant) => void;
  addPayment: (payment: Payment) => void;
  addMaintenance: (ticket: MaintenanceTicket) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      properties: [
        {
          id: '1',
          name: 'Hodan Villa Complex',
          type: 'Villa',
          district: 'Hodan',
          address: 'KM4 Area, near Digfer Hospital',
          rentAmount: 1200,
          currency: 'USD',
          status: 'Occupied',
          units: 1,
          beds: 4,
          toilets: 3,
          kitchens: 1,
          floors: 2,
        },
        {
          id: '2',
          name: 'Liido View Apartments',
          type: 'Apartment',
          district: 'Abdiaziz',
          address: 'Liido Beach Road',
          rentAmount: 800,
          currency: 'USD',
          status: 'Occupied',
          units: 1,
          beds: 2,
          toilets: 2,
          kitchens: 1,
        },
        {
          id: '3',
          name: 'Hamar Weyne Retail Hub',
          type: 'Shop',
          district: 'Hamar Weyne',
          address: 'Maka Al Mukarama Road',
          rentAmount: 2500,
          currency: 'USD',
          status: 'Available',
          units: 4,
        },
        {
          id: '4',
          name: 'Waberi Heights',
          type: 'Apartment',
          district: 'Waberi',
          address: 'Near 21 October Square',
          rentAmount: 600,
          currency: 'USD',
          status: 'Maintenance',
          units: 1,
          beds: 1,
          toilets: 1,
          kitchens: 1,
        }
      ],
      tenants: [
        {
          id: 't1',
          name: 'Mohamed Hussein',
          phone: '+252 61 123 4567',
          email: 'mohamed.h@example.com',
          propertyId: '1',
          leaseStart: '2025-01-01',
          leaseEnd: '2026-01-01',
          status: 'Active',
        },
        {
          id: 't2',
          name: 'Amina Abdi',
          phone: '+252 61 765 4321',
          propertyId: '2',
          leaseStart: '2025-03-01',
          leaseEnd: '2026-03-01',
          status: 'Active',
        }
      ],
      payments: [
        {
          id: 'p1',
          propertyId: '1',
          tenantId: 't1',
          amount: 1200,
          date: '2026-04-01',
          month: 'April 2026',
          status: 'Paid',
        }
      ],
      maintenance: [
        {
          id: 'm1',
          propertyId: '4',
          description: 'Water leak in Unit B level 2',
          priority: 'High',
          status: 'Open',
          createdAt: '2026-04-10',
        }
      ],
      currency: 'USD',
      exchangeRate: 26000,
      notifications: [
        {
          id: 'n1',
          type: 'warning',
          title: 'Lease Expiry',
          message: 'Hodan Villa Complex lease for Mohamed Hussein expires in 15 days.',
          timestamp: new Date().toISOString(),
          read: false
        },
        {
          id: 'n2',
          type: 'error',
          title: 'Late Payment',
          message: 'Tenant Amina Abdi is 2 days late on April rent.',
          timestamp: new Date().toISOString(),
          read: false
        }
      ],

      setCurrency: (currency) => set({ currency }),
      setExchangeRate: (exchangeRate) => set({ exchangeRate }),
      addNotification: (n) => set((state) => ({
        notifications: [
          {
            ...n,
            id: Math.random().toString(36).substr(2, 9),
            timestamp: new Date().toISOString(),
            read: false
          },
          ...state.notifications
        ]
      })),
      markNotificationRead: (id) => set((state) => ({
        notifications: state.notifications.map(n => n.id === id ? { ...n, read: true } : n)
      })),
      clearNotifications: () => set({ notifications: [] }),
      
      addProperty: (property) => set((state) => ({ properties: [...state.properties, property] })),
      updateProperty: (id, updated) => set((state) => ({
        properties: state.properties.map((p) => (p.id === id ? { ...p, ...updated } : p))
      })),
      deleteProperty: (id) => set((state) => ({
        properties: state.properties.filter((p) => p.id !== id)
      })),
      
      addTenant: (tenant) => set((state) => ({ tenants: [...state.tenants, tenant] })),
      addPayment: (payment) => set((state) => ({ payments: [...state.payments, payment] })),
      addMaintenance: (ticket) => set((state) => ({ maintenance: [...state.maintenance, ticket] })),
    }),
    {
      name: 'm-prms-storage',
    }
  )
);
