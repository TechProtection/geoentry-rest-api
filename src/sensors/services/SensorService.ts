import { Injectable, NotFoundException } from '@nestjs/common';
import { supabase } from '../../supabase/supabase-client';
import { Sensor } from '../models/SensorModel';
import { Database } from '../../types/supabase';

type SensorRow = Database['public']['Tables']['sensors']['Row'];
type SensorInsert = Database['public']['Tables']['sensors']['Insert'];
type SensorUpdate = Database['public']['Tables']['sensors']['Update'];

@Injectable()
export class SensorService {
  async getAllSensors(): Promise<Sensor[]> {
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

  async getSensorById(id: string): Promise<Sensor> {
    const { data, error } = await supabase
      .from('sensors')
      .select(`
        *,
        device:devices(*)
      `)
      .eq('id', id)
      .single();

    if (error || !data) {
      throw new NotFoundException(`Sensor with ID ${id} not found`);
    }

    return data as any;
  }

  async createSensor(sensorData: Partial<Sensor>): Promise<Sensor> {
    if (!sensorData.name || !sensorData.dataType || !sensorData.unit || !sensorData.device?.id) {
      throw new Error('Missing required fields: name, dataType, unit, device');
    }

    const insertData: SensorInsert = {
      name: sensorData.name,
      data_type: sensorData.dataType,
      unit: sensorData.unit,
      device_id: sensorData.device.id,
    };

    const { data, error } = await supabase
      .from('sensors')
      .insert(insertData)
      .select()
      .single();

    if (error) {
      throw new Error(`Error creating sensor: ${error.message}`);
    }

    return this.getSensorById(data.id);
  }

  async updateSensor(id: string, sensorData: Partial<Sensor>): Promise<Sensor> {
    const updateData: SensorUpdate = {};

    if (sensorData.name) updateData.name = sensorData.name;
    if (sensorData.dataType) updateData.data_type = sensorData.dataType;
    if (sensorData.unit) updateData.unit = sensorData.unit;
    if (sensorData.device?.id) updateData.device_id = sensorData.device.id;

    const { error } = await supabase
      .from('sensors')
      .update(updateData)
      .eq('id', id);

    if (error) {
      throw new Error(`Error updating sensor: ${error.message}`);
    }

    return await this.getSensorById(id);
  }

  async deleteSensor(id: string): Promise<void> {
    const { error } = await supabase
      .from('sensors')
      .delete()
      .eq('id', id);

    if (error) {
      throw new NotFoundException(`Sensor with ID ${id} not found`);
    }
  }
}
