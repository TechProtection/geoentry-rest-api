import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { UserService } from '../services/ProfileService';
import { User } from '../models/ProfileModel';
import { CreateUserDto, UpdateUserDto } from '../dto/profile.dto';

@ApiTags('profiles')
@Controller('api/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiOperation({ summary: 'Obtener todos los usuarios' })
  @ApiResponse({ status: 200, description: 'Lista de usuarios', type: [User] })
  async getAllUsers(): Promise<User[]> {
    return await this.userService.getAllUsers();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener usuario por ID' })
  @ApiParam({ name: 'id', description: 'ID del usuario' })
  @ApiResponse({ status: 200, description: 'Usuario encontrado', type: User })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado' })
  async getUserById(@Param('id') id: string): Promise<User> {
    return await this.userService.getUserById(id);
  }

  @Get('email/:email')
  @ApiOperation({ summary: 'Obtener usuario por email' })
  @ApiParam({ name: 'email', description: 'Email del usuario' })
  @ApiResponse({ status: 200, description: 'Usuario encontrado', type: User })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado' })
  async getUserByEmail(@Param('email') email: string): Promise<User> {
    return await this.userService.getUserByEmail(email);
  }

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo usuario' })
  @ApiResponse({ status: 201, description: 'Usuario creado exitosamente', type: User })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  @ApiResponse({ status: 409, description: 'Email ya existe' })
  async createUser(@Body() userDto: CreateUserDto): Promise<User> {
    const userData = {
      id: userDto.id,
      fullName: userDto.fullName,
      email: userDto.email,
      avatarUrl: userDto.avatarUrl,
      role: userDto.role,
      location: userDto.locationId ? { id: userDto.locationId } as any : undefined
    };
    return await this.userService.createUser(userData);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar un usuario' })
  @ApiParam({ name: 'id', description: 'ID del usuario' })
  @ApiResponse({ status: 200, description: 'Usuario actualizado exitosamente', type: User })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado' })
  async updateUser(
    @Param('id') id: string,
    @Body() userDto: UpdateUserDto
  ): Promise<User> {
    const userData: any = {};
    if (userDto.fullName) userData.fullName = userDto.fullName;
    if (userDto.email) userData.email = userDto.email;
    if (userDto.avatarUrl !== undefined) userData.avatarUrl = userDto.avatarUrl;
    if (userDto.role) userData.role = userDto.role;
    if (userDto.locationId !== undefined) {
      userData.location = userDto.locationId ? { id: userDto.locationId } : null;
    }
    
    return await this.userService.updateUser(id, userData);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un usuario' })
  @ApiParam({ name: 'id', description: 'ID del usuario' })
  @ApiResponse({ status: 200, description: 'Usuario eliminado exitosamente' })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado' })
  async deleteUser(@Param('id') id: string): Promise<void> {
    return await this.userService.deleteUser(id);
  }
}