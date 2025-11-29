// Configuración de la API
export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_URL || 'http://localhost:8000',
  ENDPOINTS: {
    // Empresa
    EMPRESA_REGISTRAR: '/api/empresa/registrar',
    EMPRESA_CREAR_VACANTE: '/api/empresa/crear-vacante',
    EMPRESA_APROBAR_PREGUNTAS: '/api/empresa/aprobar-preguntas',
    EMPRESA_APLICACIONES: '/api/empresa/:empresaId/aplicaciones',
    
    // Vacantes
    VACANTES_PUBLICADAS: '/api/vacantes/publicadas',
    VACANTE_DETALLES: '/api/vacantes/:vacanteId/detalles',
    
    // Candidato
    CANDIDATO_APLICAR: '/api/candidato/aplicar',
    CANDIDATO_RESPONDER: '/api/candidato/responder',
    CANDIDATO_CHATBOT_INICIAR: '/api/candidato/chatbot/iniciar',
    CANDIDATO_CHATBOT_SIGUIENTE: '/api/candidato/chatbot/siguiente',
    CANDIDATO_CHATBOT_FINALIZAR: '/api/candidato/chatbot/finalizar',
  }
};

// Headers por defecto
export const getHeaders = (includeAuth = false) => {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };
  
  // Si implementas autenticación en el futuro
  if (includeAuth) {
    const token = localStorage.getItem('auth_token');
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
  }
  
  return headers;
};

// Manejo de errores
export class ApiError extends Error {
  constructor(
    public status: number,
    public message: string,
    public data?: any
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

// Función helper para manejar respuestas
export const handleResponse = async <T>(response: Response): Promise<T> => {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new ApiError(
      response.status,
      errorData.detail || errorData.message || 'Error en la petición',
      errorData
    );
  }
  return response.json();
};
