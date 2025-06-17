import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { supabase } from '../../supabase/supabase-client';
import { User } from '../models/ProfileModel';
import { Database } from '../../types/supabase';

type ProfileRow = Database['public']['Tables']['profiles']['Row'];
type ProfileInsert = Database['public']['Tables']['profiles']['Insert'];
type ProfileUpdate = Database['public']['Tables']['profiles']['Update'];

@Injectable()
export class UserService {  async getAllUsers(): Promise<User[]> {
    const { data, error } = await supabase
      .from('profiles')
      .select(`
        *,
        devices(*)
      `);

    if (error) {
      throw new Error(`Error fetching users: ${error.message}`);
    }

    return data as any[];
  }

  async getUserById(id: string): Promise<User> {
    const { data, error } = await supabase
      .from('profiles')
      .select(`
        *,
        devices(*)
      `)
      .eq('id', id)
      .single();

    if (error || !data) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return data as any;
  }

  async getUserByEmail(email: string): Promise<User> {
    const { data, error } = await supabase
      .from('profiles')
      .select(`
        *,
        devices(*)
      `)
      .eq('email', email)
      .single();

    if (error || !data) {
      throw new NotFoundException(`User with email ${email} not found`);
    }

    return data as any;
  }async createUser(userData: Partial<User>): Promise<User> {
    // Check if email already exists
    if (userData.email) {
      const { data: existingUser } = await supabase
        .from('profiles')
        .select('id')
        .eq('email', userData.email)
        .single();

      if (existingUser) {
        throw new ConflictException('Email already exists');
      }
    }

    if (!userData.id || !userData.full_name || !userData.email) {
      throw new Error('Missing required fields: id, full_name, email');
    }

    const insertData: ProfileInsert = {
      id: userData.id,
      full_name: userData.full_name,
      email: userData.email,
      avatar_url: userData.avatar_url || null,
      role: userData.role || 'USER',
    };

    const { data, error } = await supabase
      .from('profiles')
      .insert(insertData)
      .select()
      .single();

    if (error) {
      throw new Error(`Error creating user: ${error.message}`);
    }

    return this.getUserById(data.id);
  }
  async updateUser(id: string, userData: Partial<User>): Promise<User> {
    const updateData: ProfileUpdate = {};

    if (userData.full_name) updateData.full_name = userData.full_name;
    if (userData.email) updateData.email = userData.email;
    if (userData.avatar_url !== undefined) updateData.avatar_url = userData.avatar_url;
    if (userData.role) updateData.role = userData.role;

    const { error } = await supabase
      .from('profiles')
      .update(updateData)
      .eq('id', id);

    if (error) {
      throw new Error(`Error updating user: ${error.message}`);
    }

    return await this.getUserById(id);
  }

  async deleteUser(id: string): Promise<void> {
    const { error } = await supabase
      .from('profiles')
      .delete()
      .eq('id', id);

    if (error) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
  }
}