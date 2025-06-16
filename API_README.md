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

## Ejemplos de uso

### Crear un usuario

```bash
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "fullName": "Juan Pérez",
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
    "userId": "123e4567-e89b-12d3-a456-426614174000"
  }'
```

### Crear una ubicación

```bash
curl -X POST http://localhost:3000/api/locations \
  -H "Content-Type: application/json" \
  -d '{
    "latitude": -34.6037,
    "longitude": -58.3816,
    "address": "Buenos Aires, Argentina"
  }'
```

### Crear un sensor

```bash
curl -X POST http://localhost:3000/api/sensors \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Sensor Temperatura",
    "dataType": "temperature",
    "unit": "°C",
    "deviceId": "device-uuid-here"
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
- `location_id` (UUID) - Foreign Key a locations (opcional)
- `created_at` (TIMESTAMP)
- `updated_at` (TIMESTAMP)

### devices
- `id` (UUID) - Primary Key
- `name` (TEXT) - Nombre del dispositivo
- `type` (TEXT) - Tipo de dispositivo
- `user_id` (UUID) - Foreign Key a profiles
- `created_at` (TIMESTAMP)

### locations
- `id` (UUID) - Primary Key
- `latitude` (DOUBLE) - Latitud
- `longitude` (DOUBLE) - Longitud
- `address` (TEXT) - Dirección (opcional)
- `created_at` (TIMESTAMP)

### sensors
- `id` (UUID) - Primary Key
- `name` (TEXT) - Nombre del sensor
- `data_type` (TEXT) - Tipo de datos
- `unit` (TEXT) - Unidad de medida
- `device_id` (UUID) - Foreign Key a devices
- `created_at` (TIMESTAMP)

## Arquitectura

La aplicación sigue una arquitectura modular con:

- **Controladores**: Manejan las rutas HTTP y validan las peticiones
- **Servicios**: Contienen la lógica de negocio
- **Repositorios**: Encapsulan el acceso a datos de Supabase
- **DTOs**: Definen la estructura de datos para validación
- **Modelos**: Representan las entidades del dominio

Cada módulo (devices, profiles, locations, sensors) tiene su propia estructura independiente, lo que facilita el mantenimiento y la escalabilidad.
