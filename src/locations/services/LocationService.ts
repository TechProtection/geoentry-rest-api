import { Injectable, NotFoundException } from '@nestjs/common';
import { supabase } from '../../supabase/supabase-client';
import { Location } from '../models/LocationModel';
import { Database } from '../../types/supabase';

type LocationRow = Database['public']['Tables']['locations']['Row'];
type LocationInsert = Database['public']['Tables']['locations']['Insert'];
type LocationUpdate = Database['public']['Tables']['locations']['Update'];

@Injectable()
export class LocationService {
  
  async getLocationsByUser(userId: string): Promise<Location[]> {
    // Obtener ubicaciones del usuario específico
    const { data, error } = await supabase
      .from('locations')
      .select(`
        *,
        profile:profiles(*)
      `)
      .eq('profile_id', userId);

    if (error) {
      throw new Error(`Error fetching user locations: ${error.message}`);
    }

    return data as any[];
  }

  async getAllLocations(): Promise<Location[]> {
    const { data, error } = await supabase
      .from('locations')
      .select('*');

    if (error) {
      throw new Error(`Error fetching locations: ${error.message}`);
    }

    return data as any[];
  }

  async getLocationById(id: string): Promise<Location> {
    const { data, error } = await supabase
      .from('locations')
      .select('*')
      .eq('id', id)
      .single();

    if (error || !data) {
      throw new NotFoundException(`Location with ID ${id} not found`);
    }

    return data as any;
  }  async createLocation(locationData: Partial<Location>): Promise<Location> {
    if (typeof locationData.latitude !== 'number' || typeof locationData.longitude !== 'number') {
      throw new Error('Missing required fields: latitude, longitude');
    }

    const insertData: LocationInsert = {
      latitude: locationData.latitude,
      longitude: locationData.longitude,
      name: locationData.name || 'Ubicación sin nombre',
      address: locationData.address || 'Dirección no especificada',
      radius: locationData.radius || 100, // radio por defecto de 100 metros
      is_active: locationData.is_active !== undefined ? locationData.is_active : true,
      profile_id: locationData.profile_id || null,
    };

    const { data, error } = await supabase
      .from('locations')
      .insert(insertData)
      .select()
      .single();

    if (error) {
      throw new Error(`Error creating location: ${error.message}`);
    }

    return data as any;
  }
  async updateLocation(id: string, locationData: Partial<Location>): Promise<Location> {
    const updateData: LocationUpdate = {};

    if (locationData.name !== undefined) updateData.name = locationData.name;
    if (typeof locationData.latitude === 'number') updateData.latitude = locationData.latitude;
    if (typeof locationData.longitude === 'number') updateData.longitude = locationData.longitude;
    if (locationData.address !== undefined) updateData.address = locationData.address;
    if (typeof locationData.radius === 'number') updateData.radius = locationData.radius;
    if (typeof locationData.is_active === 'boolean') updateData.is_active = locationData.is_active;
    if (locationData.profile_id !== undefined) updateData.profile_id = locationData.profile_id;

    const { error } = await supabase
      .from('locations')
      .update(updateData)
      .eq('id', id);

    if (error) {
      throw new Error(`Error updating location: ${error.message}`);
    }

    return await this.getLocationById(id);
  }

  async deleteLocation(id: string): Promise<void> {
    const { error } = await supabase
      .from('locations')
      .delete()
      .eq('id', id);

    if (error) {
      throw new NotFoundException(`Location with ID ${id} not found`);
    }
  }
}