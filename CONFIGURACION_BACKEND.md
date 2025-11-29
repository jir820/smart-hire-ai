# 🔌 Configuración de Conexión con Backend

## ✅ Archivos Creados

### 1. Configuración de API
- **`src/config/api.ts`**: Configuración central de la API, endpoints y manejo de errores

### 2. Servicios
- **`src/services/empresaService.ts`**: Servicios para empresas (registrar, crear vacante, aprobar preguntas)
- **`src/services/candidatoService.ts`**: Servicios para candidatos (aplicar, responder preguntas, chatbot)
- **`src/services/vacantesService.ts`**: Servicios para vacantes (listar, ver detalles)

### 3. Variables de Entorno
- **`.env`**: Configuración local (ya creado con URL del backend)
- **`.env.example`**: Plantilla de ejemplo

### 4. Componentes Actualizados
- **`src/pages/Company.tsx`**: Conectado con endpoints de empresa
- **`src/pages/Candidate.tsx`**: Conectado con endpoints de vacantes
- **`src/components/ChatbotInterface.tsx`**: Conectado con endpoints de candidato

## 🚀 Configuración Inicial

### 1. Variables de Entorno

El archivo `.env` ya está configurado con:

```env
VITE_API_URL=http://localhost:8000
```

Para producción, cambia la URL:

```env
VITE_API_URL=https://tu-dominio.com
```

### 2. Instalar Dependencias (si es necesario)

```bash
npm install
```

### 3. Iniciar el Frontend

```bash
npm run dev
```

El frontend estará disponible en: `http://localhost:5173`

## 📋 Endpoints Implementados

### Empresas

#### Registrar Empresa
```typescript
POST /api/empresa/registrar
Body: {
  nombre_empresa: string
  nit: string
  industria: string
  tamaño_empresa: string
  descripcion: string
  ciudad: string
  email: string
}
```

#### Crear Vacante
```typescript
POST /api/empresa/crear-vacante
Body: {
  empresa_id: string
  titulo: string
  descripcion: string
  cargo: string
  tipo_contrato: string
  modalidad: string
  habilidades_requeridas: string[]
  experiencia_min: number
  experiencia_max: number
  salario_min: number
  salario_max: number
  ciudad: string
}
```

#### Aprobar Preguntas
```typescript
POST /api/empresa/aprobar-preguntas
Body: {
  vacante_id: string
  preguntas_aprobadas: Array<{
    pregunta_id: string
    aprobada: boolean
  }>
}
```

### Vacantes

#### Listar Vacantes
```typescript
GET /api/vacantes/publicadas?ciudad=&cargo=&modalidad=&limit=50&offset=0
```

#### Ver Detalle
```typescript
GET /api/vacantes/{vacanteId}/detalles
```

### Candidatos

#### Aplicar a Vacante
```typescript
POST /api/candidato/aplicar
Content-Type: multipart/form-data
Body: {
  vacante_id: string
  nombre_anonimo: string
  email: string
  telefono: string
  ciudad: string
  años_experiencia: number
  cv_pdf: File
}
```

#### Responder Preguntas
```typescript
POST /api/candidato/responder
Body: {
  aplicacion_id: string
  respuestas: Array<{
    pregunta_id: string
    respuesta: string
  }>
}
```

## 🔄 Flujos Implementados

### Flujo de Empresa

1. **Registrar Empresa** → Formulario en paso 1
   - Guarda `empresa_id` en el estado
   
2. **Crear Vacante** → Formulario en paso 2
   - Envía datos de la vacante
   - Recibe preguntas generadas por IA
   - Guarda `vacante_id` en el estado
   
3. **Aprobar Preguntas** → Paso 3
   - Muestra preguntas generadas
   - Envía aprobación
   - Publica la vacante

### Flujo de Candidato

1. **Buscar Vacantes** → Página principal
   - Filtros por ciudad, cargo, modalidad
   - Lista de vacantes disponibles
   
2. **Ver Detalle** → Click en vacante
   - Muestra información completa
   - Carga preguntas de la vacante
   
3. **Aplicar** → Formulario en ChatbotInterface
   - Datos personales + CV
   - Envía aplicación
   - Recibe preguntas personalizadas
   
4. **Responder Preguntas** → Chat interactivo
   - Responde cada pregunta
   - Al finalizar, envía todas las respuestas
   - Recibe puntuación y compatibilidad

## 🛠️ Manejo de Errores

Todos los servicios implementan manejo de errores con:

```typescript
try {
  const response = await service.method(data);
  // Éxito
} catch (error) {
  const apiError = error as ApiError;
  toast({
    title: "Error",
    description: apiError.message,
    variant: "destructive",
  });
}
```

## 📝 Notas Importantes

### CORS
Asegúrate de que el backend tenga CORS configurado para permitir peticiones desde:
- `http://localhost:5173` (desarrollo)
- Tu dominio de producción

### Formato de Datos

#### Salarios
Los salarios se envían como números (sin formato):
```typescript
salario_min: 3000000  // No: "3.000.000" o "$3,000,000"
```

#### Habilidades
Las habilidades se envían como array de strings:
```typescript
habilidades_requeridas: ["React", "Node.js", "PostgreSQL"]
```

#### CV
El CV se envía como FormData con el archivo PDF:
```typescript
const formData = new FormData();
formData.append('cv_pdf', file);
```

## 🧪 Pruebas

### Probar Flujo de Empresa

1. Ve a `/company`
2. Completa el formulario de registro
3. Completa el formulario de vacante
4. Revisa las preguntas generadas
5. Publica la vacante

### Probar Flujo de Candidato

1. Ve a `/candidate`
2. Busca vacantes (opcional: usa filtros)
3. Click en "Ver Detalles y Postular"
4. Completa el formulario con tus datos
5. Sube tu CV en PDF
6. Responde las preguntas del chatbot
7. Verifica la puntuación final

## 🔐 Autenticación (Futuro)

El código ya está preparado para autenticación JWT:

```typescript
// En src/config/api.ts
export const getHeaders = (includeAuth = false) => {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };
  
  if (includeAuth) {
    const token = localStorage.getItem('auth_token');
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
  }
  
  return headers;
};
```

Para activar, solo necesitas:
1. Guardar el token en `localStorage` después del login
2. Pasar `includeAuth: true` en las llamadas que lo requieran

## 📞 Soporte

Si encuentras problemas:

1. Verifica que el backend esté corriendo en `http://localhost:8000`
2. Revisa la consola del navegador para errores
3. Verifica que la URL en `.env` sea correcta
4. Asegúrate de que CORS esté configurado en el backend

## ✨ Características Implementadas

- ✅ Registro de empresas
- ✅ Creación de vacantes con IA
- ✅ Aprobación de preguntas
- ✅ Búsqueda de vacantes con filtros
- ✅ Aplicación con CV
- ✅ Chatbot interactivo
- ✅ Evaluación con IA
- ✅ Manejo de errores
- ✅ Loading states
- ✅ Toasts de notificación

## 🎯 Próximos Pasos

1. Implementar autenticación JWT
2. Agregar dashboard de empresa para ver aplicaciones
3. Implementar notificaciones en tiempo real
4. Agregar paginación en lista de vacantes
5. Implementar edición de vacantes
6. Agregar filtros avanzados
