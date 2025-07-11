import { Injectable, NotFoundException } from '@nestjs/common';
import { supabase } from '../../supabase/supabase-client';
import { Device } from '../models/DeviceModel';
import { Database } from '../../types/supabase';

type DeviceRow = Database['public']['Tables']['devices']['Row'];
type DeviceInsert = Database['public']['Tables']['devices']['Insert'];
type DeviceUpdate = Database['public']['Tables']['devices']['Update'];

@Injectable()
export class DeviceService {
  
  async getDevicesByUser(userId: string): Promise<Device[]> {
    // Obtener dispositivos del usuario específico
    const { data, error } = await supabase
      .from('devices')
      .select(`
        *,
        profile:profiles(*)
      `)
      .eq('profile_id', userId);

    if (error) {
      throw new Error(`Error fetching user devices: ${error.message}`);
    }

    return data as any[];
  }

  async getAllDevices(): Promise<Device[]> {
    const { data, error } = await supabase
      .from('devices')
      .select(`
        *,
        profile:profiles(*)
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
        profile:profiles(*)
      `)
      .eq('id', id)
      .single();

    if (error || !data) {
      throw new NotFoundException(`Device with ID ${id} not found`);
    }

    return data as any;
  }
  async createDevice(deviceData: Partial<Device>): Promise<Device> {
    if (!deviceData.name || !deviceData.type || !deviceData.profile_id) {
      throw new Error('Missing required fields: name, type, profile_id');
    }

    const insertData: DeviceInsert = {
      name: deviceData.name,
      type: deviceData.type,
      profile_id: deviceData.profile_id,
    };

    // Si se proporciona un ID personalizado, incluirlo
    if (deviceData.id) {
      (insertData as any).id = deviceData.id;
    }

    const { data, error } = await supabase
      .from('devices')
      .insert(insertData)
      .select()
      .single();

    if (error) {
      throw new Error(`Error creating device: ${error.message}`);
    }

    // Retornar directamente los datos sin hacer join complejo para evitar errores
    return data as Device;
  }

  async updateDevice(id: string, deviceData: Partial<Device>): Promise<Device> {
    const updateData: DeviceUpdate = {};

    if (deviceData.name) updateData.name = deviceData.name;
    if (deviceData.type) updateData.type = deviceData.type;
    if (deviceData.profile_id) updateData.profile_id = deviceData.profile_id;

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
