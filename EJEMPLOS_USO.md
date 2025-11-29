# 📚 Ejemplos de Uso de los Servicios

## 🏢 Servicios de Empresa

### 1. Registrar una Empresa

```typescript
import { empresaService } from '@/services/empresaService';
import { ApiError } from '@/config/api';

const registrarEmpresa = async () => {
  try {
    const response = await empresaService.registrar({
      nombre_empresa: "TechCorp SAS",
      nit: "900123456",
      industria: "Tecnología",
      tamaño_empresa: "11-50",
      descripcion: "Empresa de desarrollo de software",
      ciudad: "Bogotá",
      email: "contacto@techcorp.com"
    });
    
    console.log("Empresa registrada:", response.empresa_id);
    // Guardar empresa_id para usarlo después
    localStorage.setItem('empresa_id', response.empresa_id);
    
  } catch (error) {
    const apiError = error as ApiError;
    console.error("Error:", apiError.message);
  }
};
```

### 2. Crear una Vacante

```typescript
import { empresaService } from '@/services/empresaService';

const crearVacante = async () => {
  const empresaId = localStorage.getItem('empresa_id');
  
  try {
    const response = await empresaService.crearVacante({
      empresa_id: empresaId!,
      titulo: "Desarrollador Full Stack",
      descripcion: "Buscamos desarrollador con experiencia en React y Node.js",
      cargo: "Desarrollador",
      tipo_contrato: "Tiempo completo",
      modalidad: "Remoto",
      habilidades_requeridas: ["React", "Node.js", "PostgreSQL", "TypeScript"],
      experiencia_min: 2,
      experiencia_max: 5,
      salario_min: 3000000,
      salario_max: 5000000,
      ciudad: "Bogotá"
    });
    
    console.log("Vacante creada:", response.vacante_id);
    console.log("Preguntas sugeridas:", response.preguntas_sugeridas);
    
    // Guardar para aprobar preguntas
    localStorage.setItem('vacante_id', response.vacante_id);
    
  } catch (error) {
    const apiError = error as ApiError;
    console.error("Error:", apiError.message);
  }
};
```

### 3. Aprobar Preguntas y Publicar

```typescript
import { empresaService } from '@/services/empresaService';

const aprobarYPublicar = async (preguntasIds: string[]) => {
  const vacanteId = localStorage.getItem('vacante_id');
  
  try {
    // Aprobar todas las preguntas
    const preguntasAprobadas = preguntasIds.map(id => ({
      pregunta_id: id,
      aprobada: true
    }));
    
    const response = await empresaService.aprobarPreguntas({
      vacante_id: vacanteId!,
      preguntas_aprobadas: preguntasAprobadas
    });
    
    console.log("Vacante publicada:", response.mensaje);
    
  } catch (error) {
    const apiError = error as ApiError;
    console.error("Error:", apiError.message);
  }
};
```

### 4. Ver Aplicaciones Recibidas

```typescript
import { empresaService } from '@/services/empresaService';

const verAplicaciones = async () => {
  const empresaId = localStorage.getItem('empresa_id');
  
  try {
    const response = await empresaService.obtenerAplicaciones(empresaId!);
    
    console.log("Total de aplicaciones:", response.aplicaciones.length);
    
    response.aplicaciones.forEach(app => {
      console.log(`
        Candidato: ${app.candidato_nombre}
        Vacante: ${app.vacante_titulo}
        Puntuación: ${app.puntuacion_ia}/100
        Compatibilidad: ${app.compatibilidad_porcentaje}%
        Estado: ${app.estado}
      `);
    });
    
  } catch (error) {
    const apiError = error as ApiError;
    console.error("Error:", apiError.message);
  }
};
```

## 📋 Servicios de Vacantes

### 1. Listar Vacantes Publicadas

```typescript
import { vacantesService } from '@/services/vacantesService';

const buscarVacantes = async () => {
  try {
    const response = await vacantesService.listarPublicadas({
      ciudad: "Bogotá",
      modalidad: "Remoto",
      limit: 10,
      offset: 0
    });
    
    console.log(`Encontradas ${response.total} vacantes`);
    
    response.vacantes.forEach(vacante => {
      console.log(`
        ${vacante.titulo} - ${vacante.empresa_nombre}
        Ubicación: ${vacante.ciudad}
        Salario: $${vacante.salario_min} - $${vacante.salario_max}
        Modalidad: ${vacante.modalidad}
      `);
    });
    
  } catch (error) {
    const apiError = error as ApiError;
    console.error("Error:", apiError.message);
  }
};
```

### 2. Ver Detalle de Vacante

```typescript
import { vacantesService } from '@/services/vacantesService';

const verDetalleVacante = async (vacanteId: string) => {
  try {
    const detalle = await vacantesService.obtenerDetalle(vacanteId);
    
    console.log("Vacante:", detalle.vacante.titulo);
    console.log("Empresa:", detalle.empresa.nombre_empresa);
    console.log("Descripción:", detalle.vacante.descripcion);
    console.log("Habilidades:", detalle.vacante.habilidades_requeridas);
    console.log("Experiencia:", `${detalle.vacante.experiencia_min}-${detalle.vacante.experiencia_max} años`);
    console.log("Preguntas:", detalle.preguntas.length);
    console.log("Aplicaciones:", detalle.numero_aplicaciones);
    
  } catch (error) {
    const apiError = error as ApiError;
    console.error("Error:", apiError.message);
  }
};
```

## 👤 Servicios de Candidato

### 1. Aplicar a una Vacante

```typescript
import { candidatoService } from '@/services/candidatoService';

const aplicarVacante = async (cvFile: File) => {
  try {
    const response = await candidatoService.aplicar({
      vacante_id: "uuid-de-la-vacante",
      nombre_anonimo: "Juan Pérez",
      email: "juan@example.com",
      telefono: "3001234567",
      ciudad: "Bogotá",
      años_experiencia: 3,
      cv_pdf: cvFile
    });
    
    console.log("Aplicación creada:", response.aplicacion_id);
    console.log("Candidato ID:", response.candidato_id);
    console.log("Preguntas a responder:", response.preguntas.length);
    
    // Guardar para responder preguntas
    localStorage.setItem('aplicacion_id', response.aplicacion_id);
    
    return response.preguntas;
    
  } catch (error) {
    const apiError = error as ApiError;
    console.error("Error:", apiError.message);
  }
};

// Uso con input file
const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0];
  if (file && file.type === 'application/pdf') {
    const preguntas = await aplicarVacante(file);
    console.log("Preguntas recibidas:", preguntas);
  }
};
```

### 2. Responder Preguntas

```typescript
import { candidatoService } from '@/services/candidatoService';

const responderPreguntas = async (preguntas: any[]) => {
  const aplicacionId = localStorage.getItem('aplicacion_id');
  
  try {
    const respuestas = [
      {
        pregunta_id: preguntas[0].pregunta_id,
        respuesta: "Tengo 3 años de experiencia con React, trabajando en proyectos de e-commerce..."
      },
      {
        pregunta_id: preguntas[1].pregunta_id,
        respuesta: "Sí, he trabajado con microservicios usando Node.js y Docker..."
      }
    ];
    
    const response = await candidatoService.responder({
      aplicacion_id: aplicacionId!,
      respuestas: respuestas
    });
    
    console.log("Respuestas enviadas");
    console.log("Puntuación IA:", response.puntuacion_ia);
    console.log("Compatibilidad:", response.compatibilidad_porcentaje + "%");
    console.log("Email enviado:", response.email_enviado);
    
  } catch (error) {
    const apiError = error as ApiError;
    console.error("Error:", apiError.message);
  }
};
```

### 3. Chatbot - Flujo Completo

```typescript
import { candidatoService } from '@/services/candidatoService';

// Paso 1: Iniciar chatbot
const iniciarChatbot = async (aplicacionId: string, nombre: string, vacanteTitulo: string, preguntas: string[]) => {
  try {
    const response = await candidatoService.chatbotIniciar({
      aplicacion_id: aplicacionId,
      candidato_nombre: nombre,
      vacante_titulo: vacanteTitulo,
      preguntas: preguntas
    });
    
    console.log("Bot:", response.mensaje);
    return response;
    
  } catch (error) {
    const apiError = error as ApiError;
    console.error("Error:", apiError.message);
  }
};

// Paso 2: Siguiente pregunta
const siguientePregunta = async (aplicacionId: string, respuesta: string, preguntasRestantes: string[]) => {
  try {
    const response = await candidatoService.chatbotSiguiente({
      aplicacion_id: aplicacionId,
      respuesta_anterior: respuesta,
      preguntas_restantes: preguntasRestantes
    });
    
    console.log("Bot:", response.mensaje);
    console.log("Quedan preguntas:", response.quedan_preguntas);
    
    return response;
    
  } catch (error) {
    const apiError = error as ApiError;
    console.error("Error:", apiError.message);
  }
};

// Paso 3: Finalizar
const finalizarChatbot = async (aplicacionId: string) => {
  try {
    const response = await candidatoService.chatbotFinalizar(aplicacionId);
    
    console.log("Bot:", response.mensaje);
    console.log("Finalizado:", response.finalizado);
    
  } catch (error) {
    const apiError = error as ApiError;
    console.error("Error:", apiError.message);
  }
};

// Ejemplo de uso completo
const flujoCompletoChatbot = async () => {
  const aplicacionId = "uuid-aplicacion";
  const preguntas = ["Pregunta 1", "Pregunta 2", "Pregunta 3"];
  
  // Iniciar
  await iniciarChatbot(aplicacionId, "Juan Pérez", "Desarrollador Full Stack", preguntas);
  
  // Responder pregunta 1
  await siguientePregunta(aplicacionId, "Mi respuesta a pregunta 1", preguntas.slice(1));
  
  // Responder pregunta 2
  await siguientePregunta(aplicacionId, "Mi respuesta a pregunta 2", preguntas.slice(2));
  
  // Responder pregunta 3 (última)
  await siguientePregunta(aplicacionId, "Mi respuesta a pregunta 3", []);
  
  // Finalizar
  await finalizarChatbot(aplicacionId);
};
```

## 🎯 Ejemplo Completo: Componente React

```typescript
import { useState } from 'react';
import { vacantesService, Vacante } from '@/services/vacantesService';
import { candidatoService } from '@/services/candidatoService';
import { ApiError } from '@/config/api';
import { useToast } from '@/hooks/use-toast';

const AplicacionVacante = () => {
  const [vacantes, setVacantes] = useState<Vacante[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  // Buscar vacantes
  const buscarVacantes = async () => {
    setLoading(true);
    try {
      const response = await vacantesService.listarPublicadas({
        ciudad: "Bogotá",
        limit: 10
      });
      setVacantes(response.vacantes);
    } catch (error) {
      const apiError = error as ApiError;
      toast({
        title: "Error",
        description: apiError.message,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  // Aplicar a vacante
  const aplicar = async (vacanteId: string, cvFile: File) => {
    setLoading(true);
    try {
      const response = await candidatoService.aplicar({
        vacante_id: vacanteId,
        nombre_anonimo: "Juan Pérez",
        email: "juan@example.com",
        telefono: "3001234567",
        ciudad: "Bogotá",
        años_experiencia: 3,
        cv_pdf: cvFile
      });
      
      toast({
        title: "¡Aplicación enviada!",
        description: `Tienes ${response.preguntas.length} preguntas por responder`
      });
      
      // Continuar con preguntas...
      
    } catch (error) {
      const apiError = error as ApiError;
      toast({
        title: "Error",
        description: apiError.message,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button onClick={buscarVacantes} disabled={loading}>
        {loading ? "Buscando..." : "Buscar Vacantes"}
      </button>
      
      {vacantes.map(vacante => (
        <div key={vacante.id}>
          <h3>{vacante.titulo}</h3>
          <p>{vacante.empresa_nombre}</p>
          <button onClick={() => {/* aplicar */}}>
            Aplicar
          </button>
        </div>
      ))}
    </div>
  );
};
```

## 🔍 Debugging

### Ver todas las peticiones en la consola

```typescript
// En src/config/api.ts, agrega logging
export const handleResponse = async <T>(response: Response): Promise<T> => {
  console.log('Response:', response.status, response.url);
  
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    console.error('Error data:', errorData);
    throw new ApiError(
      response.status,
      errorData.detail || errorData.message || 'Error en la petición',
      errorData
    );
  }
  
  const data = await response.json();
  console.log('Response data:', data);
  return data;
};
```

### Interceptar errores globalmente

```typescript
// En App.tsx
import { ApiError } from '@/config/api';

window.addEventListener('unhandledrejection', (event) => {
  if (event.reason instanceof ApiError) {
    console.error('API Error:', event.reason.message);
    // Mostrar toast global
  }
});
```
