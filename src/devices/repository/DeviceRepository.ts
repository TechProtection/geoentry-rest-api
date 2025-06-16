import { Injectable } from '@nestjs/common';
import { supabase } from '../../supabase/supabase-client';
import { Device } from '../models/DeviceModel';
import { Database } from '../../types/supabase';

type DeviceRow = Database['public']['Tables']['devices']['Row'];
type DeviceInsert = Database['public']['Tables']['devices']['Insert'];
type DeviceUpdate = Database['public']['Tables']['devices']['Update'];

@Injectable()
export class DeviceRepository {
  async findAll(): Promise<Device[]> {
    const { data, error } = await supabase
      .from('devices')
      .select(`
        *,
        user:profiles(*),
        sensors(*)
      `);

    if (error) {
      throw new Error(`Error fetching devices: ${error.message}`);
    }

    return data as any[];
  }

  async findById(id: string): Promise<Device | null> {
    const { data, error } = await supabase
      .from('devices')
      .select(`
        *,
        user:profiles(*),
        sensors(*)
      `)
      .eq('id', id)
      .single();

    if (error) {
      return null;
    }

    return data as any;
  }

  async create(deviceData: DeviceInsert): Promise<Device> {
    const { data, error } = await supabase
      .from('devices')
      .insert(deviceData)
      .select(`
        *,
        user:profiles(*),
        sensors(*)
      `)
      .single();

    if (error) {
      throw new Error(`Error creating device: ${error.message}`);
    }

    return data as any;
  }

  async update(id: string, deviceData: DeviceUpdate): Promise<Device | null> {
    const { data, error } = await supabase
      .from('devices')
      .update(deviceData)
      .eq('id', id)
      .select(`
        *,
        user:profiles(*),
        sensors(*)
      `)
      .single();

    if (error) {
      return null;
    }

    return data as any;
  }

  async delete(id: string): Promise<boolean> {
    const { error } = await supabase
      .from('devices')
      .delete()
      .eq('id', id);

    return !error;
  }

  async findByUserId(userId: string): Promise<Device[]> {
    const { data, error } = await supabase
      .from('devices')
      .select(`
        *,
        user:profiles(*),
        sensors(*)
      `)
      .eq('user_id', userId);

    if (error) {
      throw new Error(`Error fetching devices by user: ${error.message}`);
    }

    return data as any[];
  }
}