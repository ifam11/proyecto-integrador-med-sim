import { useState } from 'react';
import './Contactos.css';
import { saveContact } from './api';

const Contactos = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    mensaje: ''
  });

  // Estado unificado para manejar el feedback al usuario
  const [status, setStatus] = useState({
    loading: false,
    error: '',
    success: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Limpiar estados anteriores y empezar a cargar
    setStatus({ loading: true, error: '', success: '' });

    try {
      const response = await saveContact(formData);
      setStatus({ loading: false, error: '', success: response.message || '¡Mensaje enviado con éxito!' });
      setFormData({ nombre: '', email: '', mensaje: '' });

      // Limpiar el mensaje de éxito después de 5 segundos
      setTimeout(() => setStatus(prev => ({ ...prev, success: '' })), 5000);

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Ocurrió un error inesperado.';
      setStatus({ loading: false, error: errorMessage, success: '' });

      // Limpiar el mensaje de error después de 5 segundos
      setTimeout(() => setStatus(prev => ({ ...prev, error: '' })), 5000);
    }
  };

  return (
    <div className="contactos-container">
      <div className="contactos-content">
        <div className="contactos-header">
          <h1>Contáctanos</h1>
          <p className="subtitle">Estamos aquí para ayudarte con cualquier consulta</p>
        </div>

        <form onSubmit={handleSubmit} className="contacto-form" noValidate>
          {/* Contenedor para mensajes de estado */}
          <div className="form-status-messages">
            {status.error && <div className="error-message">{status.error}</div>}
            {status.success && <div className="success-message">{status.success}</div>}
          </div>

          <div className="form-group">
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              required
              placeholder=" " // El placeholder vacío es clave para la animación del label
            />
            <label htmlFor="nombre">Nombre</label>
          </div>

          <div className="form-group">
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder=" "
            />
            <label htmlFor="email">Correo Electrónico</label>
          </div>

          <div className="form-group">
            <textarea
              id="mensaje"
              name="mensaje"
              value={formData.mensaje}
              onChange={handleChange}
              required
              placeholder=" "
              rows={5}
            />
            <label htmlFor="mensaje">Mensaje</label>
          </div>

          <button
            type="submit"
            className="submit-button"
            disabled={status.loading}
          >
            {status.loading ? 'Enviando...' : 'Enviar Mensaje'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contactos;