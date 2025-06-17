# Geoentry REST API

Esta API REST está construida con NestJS y utiliza Supabase como base de datos. Permite gestionar dispositivos IoT, usuarios, ubicaciones y sensores.

## Configuración

### Variables de entorno

Las siguientes variables de entorno deben estar configuradas en el archivo `.env`:

```env
SUPABASE_URL=https://njrccrvfsnmvnbwvlvey.supabase.co
SUPABASE_ANON_KEY=tu_clave_anonima
SUPABASE_SERVICE_ROLE_KEY=tu_clave_de_servicio
```

### Instalación y ejecución

```bash
# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm run start:dev

# Ejecutar en modo producción
npm run start:prod
```

La API estará disponible en `http://localhost:3000`

## Documentación de la API

La documentación completa de la API está disponible en Swagger UI en:
`http://localhost:3000/api`

## Endpoints principales

### Usuarios (Profiles)
- `GET /api/users` - Obtener todos los usuarios
- `GET /api/users/:id` - Obtener usuario por ID
- `GET /api/users/email/:email` - Obtener usuario por email
- `POST /api/users` - Crear nuevo usuario
- `PUT /api/users/:id` - Actualizar usuario
- `DELETE /api/users/:id` - Eliminar usuario

### Dispositivos
- `GET /api/devices` - Obtener todos los dispositivos
- `GET /api/devices/:id` - Obtener dispositivo por ID
- `POST /api/devices` - Crear nuevo dispositivo
- `PUT /api/devices/:id` - Actualizar dispositivo
- `DELETE /api/devices/:id` - Eliminar dispositivo

### Ubicaciones
- `GET /api/locations` - Obtener todas las ubicaciones
- `GET /api/locations/:id` - Obtener ubicación por ID
- `POST /api/locations` - Crear nueva ubicación
- `PUT /api/locations/:id` - Actualizar ubicación
- `DELETE /api/locations/:id` - Eliminar ubicación

### Sensores
- `GET /api/sensors` - Obtener todos los sensores
- `GET /api/sensors/:id` - Obtener sensor por ID
- `POST /api/sensors` - Crear nuevo sensor
- `PUT /api/sensors/:id` - Actualizar sensor
- `DELETE /api/sensors/:id` - Eliminar sensor

### Eventos de Proximidad
- `GET /api/proximity-events` - Obtener todos los eventos de proximidad
- `GET /api/proximity-events/:id` - Obtener evento de proximidad por ID
- `GET /api/proximity-events/user/:userId` - Obtener eventos por ID de usuario
- `GET /api/proximity-events/device/:deviceId` - Obtener eventos por ID de dispositivo
- `GET /api/proximity-events/location/:locationId` - Obtener eventos por ID de ubicación
- `POST /api/proximity-events` - Crear nuevo evento de proximidad
- `PUT /api/proximity-events/:id` - Actualizar evento de proximidad
- `DELETE /api/proximity-events/:id` - Eliminar evento de proximidad

## Ejemplos de uso

### Crear un usuario

```bash
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "full_name": "Juan Pérez",
    "email": "juan@example.com",
    "role": "USER"
  }'
```

### Crear un dispositivo

```bash
curl -X POST http://localhost:3000/api/devices \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Sensor de Temperatura",
    "type": "IoT Device",
    "profile_id": "123e4567-e89b-12d3-a456-426614174000"
  }'
```

### Crear una ubicación

```bash
curl -X POST http://localhost:3000/api/locations \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Casa",
    "latitude": -34.6037,
    "longitude": -58.3816,
    "address": "Buenos Aires, Argentina",
    "radius": 100,
    "is_active": true
  }'
```

### Crear un sensor

```bash
curl -X POST http://localhost:3000/api/sensors \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Sensor Temperatura",
    "data_type": "temperature",
    "unit": "°C",
    "device_id": "device-uuid-here"
  }'
### Crear un evento de proximidad

```bash
curl -X POST http://localhost:3000/api/proximity-events \
  -H "Content-Type: application/json" \
  -d '{
    "type": "ENTER",
    "latitude": -34.6037,
    "longitude": -58.3816,
    "distance": 50,
    "home_location_id": "location-uuid-here",
    "home_location_name": "Casa",
    "device_id": "device-uuid-here",
    "user_id": "123e4567-e89b-12d3-a456-426614174000"
  }'
```

## Estructura de la base de datos

La aplicación utiliza las siguientes tablas en Supabase:

### profiles
- `id` (UUID) - Primary Key
- `full_name` (TEXT) - Nombre completo
- `email` (TEXT) - Email único
- `avatar_url` (TEXT) - URL del avatar (opcional)
- `role` (user_role) - Rol del usuario (USER/ADMIN)
- `created_at` (TIMESTAMP)
- `updated_at` (TIMESTAMP)

### devices
- `id` (UUID) - Primary Key
- `name` (TEXT) - Nombre del dispositivo
- `type` (TEXT) - Tipo de dispositivo
- `profile_id` (UUID) - Foreign Key a profiles
- `created_at` (TIMESTAMP)

### locations
- `id` (UUID) - Primary Key
- `name` (TEXT) - Nombre de la ubicación
- `latitude` (DOUBLE) - Latitud
- `longitude` (DOUBLE) - Longitud
- `address` (TEXT) - Dirección
- `radius` (NUMBER) - Radio en metros
- `is_active` (BOOLEAN) - Si la ubicación está activa
- `profile_id` (UUID) - Foreign Key a profiles (opcional)
- `created_at` (TIMESTAMP)

### sensors
- `id` (UUID) - Primary Key
- `name` (TEXT) - Nombre del sensor
- `data_type` (TEXT) - Tipo de datos
- `unit` (TEXT) - Unidad de medida
- `device_id` (UUID) - Foreign Key a devices
- `created_at` (TIMESTAMP)

### proximity_events
- `id` (UUID) - Primary Key
- `type` (TEXT) - Tipo de evento (ENTER/EXIT)
- `latitude` (DOUBLE) - Latitud del evento
- `longitude` (DOUBLE) - Longitud del evento
- `distance` (NUMBER) - Distancia en metros
- `home_location_id` (UUID) - Foreign Key a locations
- `home_location_name` (TEXT) - Nombre de la ubicación de casa
- `device_id` (UUID) - Foreign Key a devices (opcional)
- `user_id` (UUID) - Foreign Key a profiles (opcional)
- `created_at` (TIMESTAMP)

## Arquitectura

La aplicación sigue una arquitectura modular con:

- **Controladores**: Manejan las rutas HTTP y validan las peticiones
- **Servicios**: Contienen la lógica de negocio
- **Repositorios**: Encapsulan el acceso a datos de Supabase
- **DTOs**: Definen la estructura de datos para validación
- **Modelos**: Representan las entidades del dominio

Cada módulo (devices, profiles, locations, sensors) tiene su propia estructura independiente, lo que facilita el mantenimiento y la escalabilidad.
