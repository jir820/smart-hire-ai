import { API_CONFIG, handleResponse } from '@/config/api';

// Tipos
export interface AplicarVacanteData {
  vacante_id: string;
  nombre_anonimo: string;
  email: string;
  telefono: string;
  ciudad: string;
  años_experiencia: number;
  cv_pdf: File;
}

export interface ResponderPreguntasData {
  aplicacion_id: string;
  respuestas: Array<{
    pregunta_id: string;
    respuesta: string;
  }>;
}

export interface ChatbotIniciarData {
  aplicacion_id: string;
  candidato_nombre: string;
  vacante_titulo: string;
  preguntas: string[];
}

export interface ChatbotSiguienteData {
  aplicacion_id: string;
  respuesta_anterior: string;
  preguntas_restantes: string[];
}

// Servicios
export const candidatoService = {
  // Aplicar a vacante con CV
  aplicar: async (data: AplicarVacanteData) => {
    const formData = new FormData();
    formData.append('vacante_id', data.vacante_id);
    formData.append('nombre_anonimo', data.nombre_anonimo);
    formData.append('email', data.email);
    formData.append('telefono', data.telefono);
    formData.append('ciudad', data.ciudad);
    formData.append('años_experiencia', data.años_experiencia.toString());
    formData.append('cv_pdf', data.cv_pdf);

    const response = await fetch(
      `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.CANDIDATO_APLICAR}`,
      {
        method: 'POST',
        body: formData,
        // NO incluir Content-Type header, el navegador lo establece automáticamente con boundary
      }
    );
    return handleResponse<{
      candidato_id: number;
      aplicacion_id: string;
      preguntas: Array<{
        pregunta_id: string;
        pregunta: string;
        tipo_pregunta: string;
      }>;
    }>(response);
  },

  // Responder preguntas
  responder: async (data: ResponderPreguntasData) => {
    const response = await fetch(
      `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.CANDIDATO_RESPONDER}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      }
    );
    return handleResponse<{
      mensaje: string;
      puntuacion_ia: number;
      compatibilidad_porcentaje: number;
      email_enviado: boolean;
    }>(response);
  },

  // Chatbot - Iniciar conversación
  chatbotIniciar: async (data: ChatbotIniciarData) => {
    const response = await fetch(
      `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.CANDIDATO_CHATBOT_INICIAR}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      }
    );
    return handleResponse<{
      mensaje: string;
      aplicacion_id: string;
      estado: string;
    }>(response);
  },

  // Chatbot - Siguiente pregunta
  chatbotSiguiente: async (data: ChatbotSiguienteData) => {
    const response = await fetch(
      `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.CANDIDATO_CHATBOT_SIGUIENTE}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      }
    );
    return handleResponse<{
      mensaje: string;
      quedan_preguntas: boolean;
      preguntas_restantes: number;
    }>(response);
  },

  // Chatbot - Finalizar
  chatbotFinalizar: async (aplicacionId: string) => {
    const response = await fetch(
      `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.CANDIDATO_CHATBOT_FINALIZAR}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ aplicacion_id: aplicacionId }),
      }
    );
    return handleResponse<{
      mensaje: string;
      finalizado: boolean;
      aplicacion_id: string;
    }>(response);
  },
};
