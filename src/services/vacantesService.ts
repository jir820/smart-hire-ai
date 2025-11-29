import { API_CONFIG, getHeaders, handleResponse } from '@/config/api';

// Tipos
export interface FiltrosVacantes {
  ciudad?: string;
  cargo?: string;
  modalidad?: string;
  limit?: number;
  offset?: number;
}

export interface Vacante {
  id: string;
  titulo: string;
  empresa_nombre: string;
  ciudad: string;
  salario_min: number;
  salario_max: number;
  modalidad: string;
  habilidades_requeridas: string[];
  fecha_publicacion: string;
}

export interface DetalleVacante {
  vacante: {
    id: string;
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
    numero_vacantes: number;
    beneficios: string[];
    fecha_publicacion: string;
    fecha_cierre: string;
  };
  empresa: {
    nombre_empresa: string;
    ciudad: string;
    industria: string;
    descripcion: string;
    tamaño_empresa: string;
  };
  preguntas: Array<{
    id: string;
    pregunta: string;
    tipo_pregunta: string;
  }>;
  numero_aplicaciones: number;
}

// Servicios
export const vacantesService = {
  // Listar vacantes publicadas
  listarPublicadas: async (filtros: FiltrosVacantes = {}) => {
    const params = new URLSearchParams();
    
    if (filtros.ciudad) params.append('ciudad', filtros.ciudad);
    if (filtros.cargo) params.append('cargo', filtros.cargo);
    if (filtros.modalidad) params.append('modalidad', filtros.modalidad);
    if (filtros.limit) params.append('limit', filtros.limit.toString());
    if (filtros.offset) params.append('offset', filtros.offset.toString());

    const response = await fetch(
      `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.VACANTES_PUBLICADAS}?${params}`,
      {
        method: 'GET',
        headers: getHeaders(),
      }
    );
    return handleResponse<{
      vacantes: Vacante[];
      total: number;
      limit: number;
      offset: number;
    }>(response);
  },

  // Ver detalle de vacante
  obtenerDetalle: async (vacanteId: string) => {
    const url = API_CONFIG.ENDPOINTS.VACANTE_DETALLES.replace(':vacanteId', vacanteId);
    const response = await fetch(
      `${API_CONFIG.BASE_URL}${url}`,
      {
        method: 'GET',
        headers: getHeaders(),
      }
    );
    return handleResponse<DetalleVacante>(response);
  },
};
