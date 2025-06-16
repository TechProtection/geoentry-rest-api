import { Injectable } from '@nestjs/common';
import { supabase } from '../../supabase/supabase-client';
import { User } from '../models/ProfileModel';
import { Database } from '../../types/supabase';

type ProfileRow = Database['public']['Tables']['profiles']['Row'];
type ProfileInsert = Database['public']['Tables']['profiles']['Insert'];
type ProfileUpdate = Database['public']['Tables']['profiles']['Update'];

@Injectable()
export class ProfileRepository {
  async findAll(): Promise<User[]> {
    const { data, error } = await supabase
      .from('profiles')
      .select(`
        *,
        location:locations(*),
        devices(*)
      `);

    if (error) {
      throw new Error(`Error fetching profiles: ${error.message}`);
    }

    return data as any[];
  }

  async findById(id: string): Promise<User | null> {
    const { data, error } = await supabase
      .from('profiles')
      .select(`
        *,
        location:locations(*),
        devices(*)
      `)
      .eq('id', id)
      .single();

    if (error) {
      return null;
    }

    return data as any;
  }

  async findByEmail(email: string): Promise<User | null> {
    const { data, error } = await supabase
      .from('profiles')
      .select(`
        *,
        location:locations(*),
        devices(*)
      `)
      .eq('email', email)
      .single();

    if (error) {
      return null;
    }

    return data as any;
  }

  async create(profileData: ProfileInsert): Promise<User> {
    const { data, error } = await supabase
      .from('profiles')
      .insert(profileData)
      .select(`
        *,
        location:locations(*),
        devices(*)
      `)
      .single();

    if (error) {
      throw new Error(`Error creating profile: ${error.message}`);
    }

    return data as any;
  }

  async update(id: string, profileData: ProfileUpdate): Promise<User | null> {
    const { data, error } = await supabase
      .from('profiles')
      .update(profileData)
      .eq('id', id)
      .select(`
        *,
        location:locations(*),
        devices(*)
      `)
      .single();

    if (error) {
      return null;
    }

    return data as any;
  }

  async delete(id: string): Promise<boolean> {
    const { error } = await supabase
      .from('profiles')
      .delete()
      .eq('id', id);

    return !error;
  }

  async findByRole(role: Database['public']['Enums']['user_role']): Promise<User[]> {
    const { data, error } = await supabase
      .from('profiles')
      .select(`
        *,
        location:locations(*),
        devices(*)
      `)
      .eq('role', role);

    if (error) {
      throw new Error(`Error fetching profiles by role: ${error.message}`);
    }

    return data as any[];
  }

  async findByLocationId(locationId: string): Promise<User[]> {
    const { data, error } = await supabase
      .from('profiles')
      .select(`
        *,
        location:locations(*),
        devices(*)
      `)
      .eq('location_id', locationId);

    if (error) {
      throw new Error(`Error fetching profiles by location: ${error.message}`);
    }

    return data as any[];
  }
}
