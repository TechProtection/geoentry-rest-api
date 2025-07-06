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
        profiles(*)
      `);

    if (error) {
      throw new Error(`Error fetching sensors: ${error.message}`);
    }

    // Agregar status por defecto a cada sensor
    const sensorsWithStatus = (data as any[]).map(sensor => ({
      ...sensor,
      status: 'off' // Por defecto todos los sensores están apagados
    }));

    return sensorsWithStatus;
  }

  async getSensorById(id: string): Promise<Sensor> {
    const { data, error } = await supabase
      .from('sensors')
      .select(`
        *,
        profiles(*)
      `)
      .eq('id', id)
      .single();

    if (error || !data) {
      throw new NotFoundException(`Sensor with ID ${id} not found`);
    }

    // Agregar status por defecto
    const sensorWithStatus = {
      ...data,
      status: 'off' // Por defecto el sensor está apagado
    };

    return sensorWithStatus as any;
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

    // Crear un objeto con el status por defecto
    const sensorWithStatus = {
      ...data,
      status: sensorData.status || 'off'
    };

    return sensorWithStatus as any;
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
      .select(`
        *,
        profiles(*)
      `)
      .single();

    if (error) {
      throw new Error(`Error creating sensor for user: ${error.message}`);
    }

    // Crear un objeto con el status por defecto
    const sensorWithStatus = {
      ...data,
      status: sensorData.status || 'off'
    };

    return sensorWithStatus as any;
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

    const updatedSensor = await this.getSensorById(id);
    
    // Si se está actualizando el status, agregarlo al resultado
    if (sensorData.status !== undefined) {
      (updatedSensor as any).status = sensorData.status;
    }

    return updatedSensor;
  }

  async updateSensorStatus(id: string, status: string): Promise<Sensor> {
    // Verificar que el sensor existe
    const sensor = await this.getSensorById(id);
    
    // Simular la actualización del status (ya que no está en la BD)
    const sensorWithStatus = {
      ...sensor,
      status: status
    };

    return sensorWithStatus as any;
  }

  async getSensorsByUserAndType(userId: string, sensorType: 'led_tv' | 'smart_light' | 'air_conditioner' | 'coffee_maker'): Promise<Sensor[]> {
    const { data, error } = await supabase
      .from('sensors')
      .select(`
        *,
        profiles(*)
      `)
      .eq('user_id', userId)
      .eq('sensor_type', sensorType);

    if (error) {
      throw new Error(`Error fetching sensors by user and type: ${error.message}`);
    }

    // Agregar status por defecto a cada sensor
    const sensorsWithStatus = (data as any[]).map(sensor => ({
      ...sensor,
      status: 'off' // Por defecto todos los sensores están apagados
    }));

    return sensorsWithStatus;
  }

  async getSensorsByUser(userId: string): Promise<Sensor[]> {
    const { data, error } = await supabase
      .from('sensors')
      .select(`
        *,
        profiles(*)
      `)
      .eq('user_id', userId);

    if (error) {
      throw new Error(`Error fetching sensors by user: ${error.message}`);
    }

    // Agregar status por defecto a cada sensor
    const sensorsWithStatus = (data as any[]).map(sensor => ({
      ...sensor,
      status: 'off' // Por defecto todos los sensores están apagados
    }));

    return sensorsWithStatus;
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
