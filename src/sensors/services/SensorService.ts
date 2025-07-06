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
      .select('*');

    if (error) {
      throw new Error(`Error fetching sensors: ${error.message}`);
    }

    return data as Sensor[];
  }

  async getSensorById(id: string): Promise<Sensor> {
    const { data, error } = await supabase
      .from('sensors')
      .select('*')
      .eq('id', id)
      .single();

    if (error || !data) {
      throw new NotFoundException(`Sensor with ID ${id} not found`);
    }

    return data as Sensor;
  }
  async createSensor(sensorData: Partial<Sensor>): Promise<Sensor> {
    if (!sensorData.name || !sensorData.sensor_type || sensorData.isActive === undefined || !sensorData.user_id) {
      throw new Error('Missing required fields: name, sensor_type, isActive, user_id');
    }

    const insertData: SensorInsert = {
      name: sensorData.name,
      sensor_type: sensorData.sensor_type,
      isActive: sensorData.isActive,
      user_id: sensorData.user_id,
      updated_at: new Date().toISOString(),
    };

    const { data, error } = await supabase
      .from('sensors')
      .insert(insertData)
      .select()
      .single();

    if (error) {
      throw new Error(`Error creating sensor: ${error.message}`);
    }

    return data as Sensor;
  }

  async createSensorForUser(userId: string, sensorData: Partial<Sensor>): Promise<Sensor> {
    if (!sensorData.name || !sensorData.sensor_type || sensorData.isActive === undefined) {
      throw new Error('Missing required fields: name, sensor_type, isActive');
    }

    const insertData: SensorInsert = {
      name: sensorData.name,
      sensor_type: sensorData.sensor_type,
      isActive: sensorData.isActive,
      user_id: userId,
      updated_at: new Date().toISOString(),
    };

    const { data, error } = await supabase
      .from('sensors')
      .insert(insertData)
      .select('*')
      .single();

    if (error) {
      throw new Error(`Error creating sensor for user: ${error.message}`);
    }

    return data as Sensor;
  }

  async updateSensor(id: string, sensorData: Partial<Sensor>): Promise<Sensor> {
    const updateData: SensorUpdate = {
      updated_at: new Date().toISOString(),
    };

    if (sensorData.name) updateData.name = sensorData.name;
    if (sensorData.sensor_type) updateData.sensor_type = sensorData.sensor_type;
    if (sensorData.isActive !== undefined) updateData.isActive = sensorData.isActive;
    if (sensorData.user_id) updateData.user_id = sensorData.user_id;

    const { error } = await supabase
      .from('sensors')
      .update(updateData)
      .eq('id', id);

    if (error) {
      throw new Error(`Error updating sensor: ${error.message}`);
    }

    return await this.getSensorById(id);
  }

  async updateSensorStatus(id: string, isActive: boolean): Promise<Sensor> {
    const updateData: SensorUpdate = {
      isActive: isActive,
      updated_at: new Date().toISOString(),
    };

    const { error } = await supabase
      .from('sensors')
      .update(updateData)
      .eq('id', id);

    if (error) {
      throw new Error(`Error updating sensor status: ${error.message}`);
    }

    return await this.getSensorById(id);
  }

  async getSensorsByUserAndType(userId: string, sensorType: 'led_tv' | 'smart_light' | 'air_conditioner' | 'coffee_maker'): Promise<Sensor[]> {
    const { data, error } = await supabase
      .from('sensors')
      .select('*')
      .eq('user_id', userId)
      .eq('sensor_type', sensorType);

    if (error) {
      throw new Error(`Error fetching sensors by user and type: ${error.message}`);
    }

    return data as Sensor[];
  }

  async getSensorsByUser(userId: string): Promise<Sensor[]> {
    const { data, error } = await supabase
      .from('sensors')
      .select('*')
      .eq('user_id', userId);

    if (error) {
      throw new Error(`Error fetching sensors by user: ${error.message}`);
    }

    return data as Sensor[];
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
