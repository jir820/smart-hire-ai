import { API_CONFIG, getHeaders, handleResponse } from '@/config/api';

// Tipos
export interface RegistrarEmpresaData {
  nombre_empresa: string;
  nit: string;
  industria: string;
  tamaño_empresa: string;
  descripcion: string;
  ciudad: string;
  email: string;
}

export interface CrearVacanteData {
  empresa_id: string;
  titulo: string;
  descripcion: string;
  cargo: string;
  tipo_contrato: string;
  modalidad: string;
  habilidades_requeridas: string[];
  experiencia_min: number;
  experiencia_max: number;
  salario_min: number;
  salario_max: number;
  ciudad: string;
}

export interface PreguntaSugerida {
  pregunta_id?: string;
  pregunta: string;
  tipo_pregunta: string;
}

export interface AprobarPreguntasData {
  vacante_id: string;
  preguntas_aprobadas: {
    pregunta_id: string;
    aprobada: boolean;
  }[];
}

// Servicios
export const empresaService = {
  // Registrar empresa
  registrar: async (data: RegistrarEmpresaData) => {
    const response = await fetch(
      `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.EMPRESA_REGISTRAR}`,
      {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(data),
      }
    );
    return handleResponse<{ empresa_id: string; mensaje: string }>(response);
  },

  // Crear vacante
  crearVacante: async (data: CrearVacanteData) => {
    const response = await fetch(
      `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.EMPRESA_CREAR_VACANTE}`,
      {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(data),
      }
    );
    return handleResponse<{
      vacante_id: string;
      preguntas_sugeridas: PreguntaSugerida[];
    }>(response);
  },

  // Aprobar preguntas y publicar
  aprobarPreguntas: async (data: AprobarPreguntasData) => {
    const response = await fetch(
      `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.EMPRESA_APROBAR_PREGUNTAS}`,
      {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(data),
      }
    );
    return handleResponse<{ mensaje: string; vacante_id: string }>(response);
  },

  // Ver aplicaciones recibidas
  obtenerAplicaciones: async (empresaId: string) => {
    const url = API_CONFIG.ENDPOINTS.EMPRESA_APLICACIONES.replace(':empresaId', empresaId);
    const response = await fetch(
      `${API_CONFIG.BASE_URL}${url}`,
      {
        method: 'GET',
        headers: getHeaders(),
      }
    );
    return handleResponse<{
      aplicaciones: Array<{
        aplicacion_id: string;
        candidato_nombre: string;
        vacante_titulo: string;
        puntuacion_ia: number;
        compatibilidad_porcentaje: number;
        estado: string;
        fecha_aplicacion: string;
      }>;
    }>(response);
  },
};
