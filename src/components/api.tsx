import axios from 'axios';

interface ContactForm {
  nombre: string;
  email: string;
  mensaje: string;
}

const API_URL = 'http://localhost:3000/api';

export const saveContact = async (formData: ContactForm) => {
  try {
    const response = await axios.post(`${API_URL}/save`, formData, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    if (response.status === 200 || response.status === 201) {
      return response.data;
    } else {
      throw new Error('Error en la respuesta del servidor');
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorMessage = error.response?.data?.message || 
                          error.response?.data?.error || 
                          'Error al enviar el formulario';
      console.error('Error detallado:', error.response?.data);
      throw new Error(errorMessage);
    }
    throw new Error('Error al conectar con el servidor');
  }
};