import { Injectable, NotFoundException } from '@nestjs/common';
import { supabase } from '../../supabase/supabase-client';
import { Device } from '../models/DeviceModel';
import { Database } from '../../types/supabase';

type DeviceRow = Database['public']['Tables']['devices']['Row'];
type DeviceInsert = Database['public']['Tables']['devices']['Insert'];
type DeviceUpdate = Database['public']['Tables']['devices']['Update'];

@Injectable()
export class DeviceService {
  async getAllDevices(): Promise<Device[]> {
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

  async getDeviceById(id: string): Promise<Device> {
    const { data, error } = await supabase
      .from('devices')
      .select(`
        *,
        user:profiles(*),
        sensors(*)
      `)
      .eq('id', id)
      .single();

    if (error || !data) {
      throw new NotFoundException(`Device with ID ${id} not found`);
    }

    return data as any;
  }

  async createDevice(deviceData: Partial<Device>): Promise<Device> {
    if (!deviceData.name || !deviceData.type || !deviceData.user?.id) {
      throw new Error('Missing required fields: name, type, user');
    }

    const insertData: DeviceInsert = {
      name: deviceData.name,
      type: deviceData.type,
      user_id: deviceData.user.id,
    };

    const { data, error } = await supabase
      .from('devices')
      .insert(insertData)
      .select()
      .single();

    if (error) {
      throw new Error(`Error creating device: ${error.message}`);
    }

    return this.getDeviceById(data.id);
  }

  async updateDevice(id: string, deviceData: Partial<Device>): Promise<Device> {
    const updateData: DeviceUpdate = {};

    if (deviceData.name) updateData.name = deviceData.name;
    if (deviceData.type) updateData.type = deviceData.type;
    if (deviceData.user?.id) updateData.user_id = deviceData.user.id;

    const { error } = await supabase
      .from('devices')
      .update(updateData)
      .eq('id', id);

    if (error) {
      throw new Error(`Error updating device: ${error.message}`);
    }

    return await this.getDeviceById(id);
  }

  async deleteDevice(id: string): Promise<void> {
    const { error } = await supabase
      .from('devices')
      .delete()
      .eq('id', id);

    if (error) {
      throw new NotFoundException(`Device with ID ${id} not found`);
    }
  }
}
