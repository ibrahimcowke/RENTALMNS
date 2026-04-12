import { create } from 'zustand';
import { supabase } from '../lib/supabase';
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
  currency: 'USD';
  notifications: Notification[];
  loading: boolean;
  error: string | null;
  
  // Actions
  fetchInitialData: () => Promise<void>;
  
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => Promise<void>;
  markNotificationRead: (id: string) => Promise<void>;
  clearNotifications: () => Promise<void>;
  
  addProperty: (property: Omit<Property, 'id'>) => Promise<void>;
  updateProperty: (id: string, property: Partial<Property>) => Promise<void>;
  deleteProperty: (id: string) => Promise<void>;
  
  addTenant: (tenant: Omit<Tenant, 'id'>) => Promise<void>;
  updateTenant: (id: string, tenant: Partial<Tenant>) => Promise<void>;
  deleteTenant: (id: string) => Promise<void>;

  addPayment: (payment: Omit<Payment, 'id'>) => Promise<void>;
  
  addMaintenance: (ticket: Omit<MaintenanceTicket, 'id' | 'createdAt'>) => Promise<void>;
  updateMaintenance: (id: string, ticket: Partial<MaintenanceTicket>) => Promise<void>;
  deleteMaintenance: (id: string) => Promise<void>;
}

export const useAppStore = create<AppState>((set, get) => ({
  properties: [],
  tenants: [],
  payments: [],
  maintenance: [],
  currency: 'USD',
  notifications: [],
  loading: false,
  error: null,

  fetchInitialData: async () => {
    set({ loading: true, error: null });
    try {
      const { data: properties, error: pError } = await supabase.from('properties').select('*').order('created_at', { ascending: false });
      const { data: tenants, error: tError } = await supabase.from('tenants').select('*').order('created_at', { ascending: false });
      const { data: payments, error: payError } = await supabase.from('payments').select('*').order('created_at', { ascending: false });
      const { data: maintenance, error: mError } = await supabase.from('maintenance_tickets').select('*').order('created_at', { ascending: false });
      const { data: notifications, error: nError } = await supabase.from('notifications').select('*').order('timestamp', { ascending: false });

      if (pError || tError || payError || mError || nError) {
        throw new Error('Failed to fetch data from Supabase');
      }

      set({ 
        properties: (properties as Property[]) || [],
        tenants: (tenants as Tenant[]) || [],
        payments: (payments as Payment[]) || [],
        maintenance: (maintenance as MaintenanceTicket[]) || [],
        notifications: (notifications as Notification[]) || [],
        loading: false 
      });
    } catch (err: any) {
      set({ error: err.message, loading: false });
    }
  },

  addNotification: async (n) => {
    const { data, error } = await supabase
      .from('notifications')
      .insert([{ ...n, read: false }])
      .select()
      .single();

    if (!error && data) {
      set((state) => ({ notifications: [data, ...state.notifications] }));
    }
  },

  markNotificationRead: async (id) => {
    const { error } = await supabase
      .from('notifications')
      .update({ read: true })
      .eq('id', id);

    if (!error) {
      set((state) => ({
        notifications: state.notifications.map(n => n.id === id ? { ...n, read: true } : n)
      }));
    }
  },

  clearNotifications: async () => {
    const { error } = await supabase.from('notifications').delete().neq('id', '00000000-0000-0000-0000-000000000000');
    if (!error) set({ notifications: [] });
  },
  
  addProperty: async (property) => {
    const { data, error } = await supabase
      .from('properties')
      .insert([property])
      .select()
      .single();

    if (!error && data) {
      set((state) => ({ properties: [data, ...state.properties] }));
    }
  },

  updateProperty: async (id, updated) => {
    const { error } = await supabase
      .from('properties')
      .update(updated)
      .eq('id', id);

    if (!error) {
      set((state) => ({
        properties: state.properties.map((p) => (p.id === id ? { ...p, ...updated } : p))
      }));
    }
  },

  deleteProperty: async (id) => {
    const { error } = await supabase.from('properties').delete().eq('id', id);
    if (!error) {
      set((state) => ({
        properties: state.properties.filter((p) => p.id !== id)
      }));
    }
  },
  
  addTenant: async (tenant) => {
    const { data, error } = await supabase
      .from('tenants')
      .insert([tenant])
      .select()
      .single();

    if (!error && data) {
      set((state) => ({ tenants: [data, ...state.tenants] }));
    }
  },

  updateTenant: async (id, updated) => {
    const { error } = await supabase
      .from('tenants')
      .update(updated)
      .eq('id', id);

    if (!error) {
      set((state) => ({
        tenants: state.tenants.map((t) => (t.id === id ? { ...t, ...updated } : t))
      }));
    }
  },

  deleteTenant: async (id) => {
    const { error } = await supabase.from('tenants').delete().eq('id', id);
    if (!error) {
      set((state) => ({
        tenants: state.tenants.filter((t) => t.id !== id)
      }));
    }
  },

  addPayment: async (payment) => {
    const { data, error } = await supabase
      .from('payments')
      .insert([payment])
      .select()
      .single();

    if (!error && data) {
      set((state) => ({ payments: [data, ...state.payments] }));
    }
  },
  
  addMaintenance: async (ticket) => {
    const { data, error } = await supabase
      .from('maintenance_tickets')
      .insert([ticket])
      .select()
      .single();

    if (!error && data) {
      set((state) => ({ maintenance: [data, ...state.maintenance] }));
    }
  },

  updateMaintenance: async (id, updated) => {
    const { error } = await supabase
      .from('maintenance_tickets')
      .update(updated)
      .eq('id', id);

    if (!error) {
      set((state) => ({
        maintenance: state.maintenance.map((m) => (m.id === id ? { ...m, ...updated } : m))
      }));
    }
  },

  deleteMaintenance: async (id) => {
    const { error } = await supabase.from('maintenance_tickets').delete().eq('id', id);
    if (!error) {
      set((state) => ({
        maintenance: state.maintenance.filter((m) => m.id !== id)
      }));
    }
  },
}));
