import { Injectable } from '@nestjs/common';
import { supabase } from '../../supabase/supabase-client';
import { Location } from '../models/LocationModel';
import { Database } from '../../types/supabase';

type LocationRow = Database['public']['Tables']['locations']['Row'];
type LocationInsert = Database['public']['Tables']['locations']['Insert'];
type LocationUpdate = Database['public']['Tables']['locations']['Update'];

@Injectable()
export class LocationRepository {
  async findAll(): Promise<Location[]> {
    const { data, error } = await supabase
      .from('locations')
      .select('*');

    if (error) {
      throw new Error(`Error fetching locations: ${error.message}`);
    }

    return data as any[];
  }

  async findById(id: string): Promise<Location | null> {
    const { data, error } = await supabase
      .from('locations')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      return null;
    }

    return data as any;
  }

  async create(locationData: LocationInsert): Promise<Location> {
    const { data, error } = await supabase
      .from('locations')
      .insert(locationData)
      .select('*')
      .single();

    if (error) {
      throw new Error(`Error creating location: ${error.message}`);
    }

    return data as any;
  }

  async update(id: string, locationData: LocationUpdate): Promise<Location | null> {
    const { data, error } = await supabase
      .from('locations')
      .update(locationData)
      .eq('id', id)
      .select('*')
      .single();

    if (error) {
      return null;
    }

    return data as any;
  }

  async delete(id: string): Promise<boolean> {
    const { error } = await supabase
      .from('locations')
      .delete()
      .eq('id', id);

    return !error;
  }

  async findByCoordinates(latitude: number, longitude: number): Promise<Location[]> {
    const { data, error } = await supabase
      .from('locations')
      .select('*')
      .eq('latitude', latitude)
      .eq('longitude', longitude);

    if (error) {
      throw new Error(`Error fetching locations by coordinates: ${error.message}`);
    }

    return data as any[];
  }
}

