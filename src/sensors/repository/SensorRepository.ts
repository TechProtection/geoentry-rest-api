import { Injectable } from '@nestjs/common';
import { supabase } from '../../supabase/supabase-client';
import { Sensor } from '../models/SensorModel';
import { Database } from '../../types/supabase';

type SensorRow = Database['public']['Tables']['sensors']['Row'];
type SensorInsert = Database['public']['Tables']['sensors']['Insert'];
type SensorUpdate = Database['public']['Tables']['sensors']['Update'];

@Injectable()
export class SensorRepository {
  async findAll(): Promise<Sensor[]> {
    const { data, error } = await supabase
      .from('sensors')
      .select(`
        *,
        device:devices(*)
      `);

    if (error) {
      throw new Error(`Error fetching sensors: ${error.message}`);
    }

    return data as any[];
  }

  async findById(id: string): Promise<Sensor | null> {
    const { data, error } = await supabase
      .from('sensors')
      .select(`
        *,
        device:devices(*)
      `)
      .eq('id', id)
      .single();

    if (error) {
      return null;
    }

    return data as any;
  }

  async create(sensorData: SensorInsert): Promise<Sensor> {
    const { data, error } = await supabase
      .from('sensors')
      .insert(sensorData)
      .select(`
        *,
        device:devices(*)
      `)
      .single();

    if (error) {
      throw new Error(`Error creating sensor: ${error.message}`);
    }

    return data as any;
  }

  async update(id: string, sensorData: SensorUpdate): Promise<Sensor | null> {
    const { data, error } = await supabase
      .from('sensors')
      .update(sensorData)
      .eq('id', id)
      .select(`
        *,
        device:devices(*)
      `)
      .single();

    if (error) {
      return null;
    }

    return data as any;
  }

  async delete(id: string): Promise<boolean> {
    const { error } = await supabase
      .from('sensors')
      .delete()
      .eq('id', id);

    return !error;
  }

  async findByDeviceId(deviceId: string): Promise<Sensor[]> {
    const { data, error } = await supabase
      .from('sensors')
      .select(`
        *,
        device:devices(*)
      `)
      .eq('device_id', deviceId);

    if (error) {
      throw new Error(`Error fetching sensors by device: ${error.message}`);
    }

    return data as any[];
  }

  async findByDataType(dataType: string): Promise<Sensor[]> {
    const { data, error } = await supabase
      .from('sensors')
      .select(`
        *,
        device:devices(*)
      `)
      .eq('data_type', dataType);

    if (error) {
      throw new Error(`Error fetching sensors by data type: ${error.message}`);
    }

    return data as any[];
  }
}