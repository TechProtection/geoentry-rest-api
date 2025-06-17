import { Injectable } from '@nestjs/common';
import { supabase } from '../../supabase/supabase-client';
import { ProximityEvent } from '../models/ProximityEventModel';
import { Database } from '../../types/supabase';

type ProximityEventRow = Database['public']['Tables']['proximity_events']['Row'];
type ProximityEventInsert = Database['public']['Tables']['proximity_events']['Insert'];
type ProximityEventUpdate = Database['public']['Tables']['proximity_events']['Update'];

@Injectable()
export class ProximityEventRepository {
  async findAll(): Promise<ProximityEvent[]> {
    const { data, error } = await supabase
      .from('proximity_events')
      .select(`
        *,
        device:devices(*),
        user:profiles(*),
        location:locations(*)
      `);

    if (error) {
      throw new Error(`Error fetching proximity events: ${error.message}`);
    }

    return data as any[];
  }

  async findById(id: string): Promise<ProximityEvent | null> {
    const { data, error } = await supabase
      .from('proximity_events')
      .select(`
        *,
        device:devices(*),
        user:profiles(*),
        location:locations(*)
      `)
      .eq('id', id)
      .single();

    if (error) {
      return null;
    }

    return data as any;
  }

  async create(proximityEventData: ProximityEventInsert): Promise<ProximityEvent> {
    const { data, error } = await supabase
      .from('proximity_events')
      .insert(proximityEventData)
      .select(`
        *,
        device:devices(*),
        user:profiles(*),
        location:locations(*)
      `)
      .single();

    if (error) {
      throw new Error(`Error creating proximity event: ${error.message}`);
    }

    return data as any;
  }

  async update(id: string, proximityEventData: ProximityEventUpdate): Promise<ProximityEvent | null> {
    const { data, error } = await supabase
      .from('proximity_events')
      .update(proximityEventData)
      .eq('id', id)
      .select(`
        *,
        device:devices(*),
        user:profiles(*),
        location:locations(*)
      `)
      .single();

    if (error) {
      return null;
    }

    return data as any;
  }

  async delete(id: string): Promise<boolean> {
    const { error } = await supabase
      .from('proximity_events')
      .delete()
      .eq('id', id);

    return !error;
  }

  async findByUserId(userId: string): Promise<ProximityEvent[]> {
    const { data, error } = await supabase
      .from('proximity_events')
      .select(`
        *,
        device:devices(*),
        user:profiles(*),
        location:locations(*)
      `)
      .eq('user_id', userId);

    if (error) {
      throw new Error(`Error fetching proximity events by user: ${error.message}`);
    }

    return data as any[];
  }

  async findByDeviceId(deviceId: string): Promise<ProximityEvent[]> {
    const { data, error } = await supabase
      .from('proximity_events')
      .select(`
        *,
        device:devices(*),
        user:profiles(*),
        location:locations(*)
      `)
      .eq('device_id', deviceId);

    if (error) {
      throw new Error(`Error fetching proximity events by device: ${error.message}`);
    }

    return data as any[];
  }

  async findByLocationId(locationId: string): Promise<ProximityEvent[]> {
    const { data, error } = await supabase
      .from('proximity_events')
      .select(`
        *,
        device:devices(*),
        user:profiles(*),
        location:locations(*)
      `)
      .eq('home_location_id', locationId);

    if (error) {
      throw new Error(`Error fetching proximity events by location: ${error.message}`);
    }

    return data as any[];
  }
}
