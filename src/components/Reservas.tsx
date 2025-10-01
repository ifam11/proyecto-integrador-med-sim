import { useState, useEffect } from 'react';
import FormularioReserva from './FormularioReserva';
import ListaReservas from './ListaReservas';
import './Reservas.css';
// import { getMisReservas } from '../api'; 

// PASO 1: DEFINIR LA INTERFAZ PARA UNA RESERVA
// Esto le dice a TypeScript cómo es un objeto de reserva.
interface IReserva {
  id: number;
  cancha: {
    nombre: string;
  };
  fecha: string;
  hora_inicio: string;
  estado: 'confirmada' | 'cancelada' | 'completada'; // Usamos tipos literales para más seguridad
}

const Reservas = () => {
  const [vistaActual, setVistaActual] = useState<'crear' | 'ver'>('crear');
  
  // PASO 2: APLICAR LA INTERFAZ AL ESTADO useState
  // Ahora TypeScript sabe que 'reservas' será un arreglo de objetos IReserva.
  const [reservas, setReservas] = useState<IReserva[]>([]); 
  
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReservas = async () => {
      try {
        setLoading(true);
        // const data: IReserva[] = await getMisReservas(); 
        // setReservas(data);

        // --- Datos de ejemplo (ahora coinciden con la interfaz) ---
        const datosDeEjemplo: IReserva[] = [
            { id: 1, cancha: { nombre: 'Fútbol 5' }, fecha: '2025-07-15', hora_inicio: '19:00', estado: 'confirmada' },
            { id: 2, cancha: { nombre: 'Pista de Tenis' }, fecha: '2025-07-20', hora_inicio: '10:00', estado: 'confirmada' }
        ];
        setReservas(datosDeEjemplo); // ¡Este setReservas ahora es válido!
        // --- Fin de datos de ejemplo ---

      } catch (error) {
        console.error("Error al obtener las reservas:", error);
      } finally {
        setLoading(false);
      }
    };

    if (vistaActual === 'ver') {
        fetchReservas();
    }
  }, [vistaActual]);

  const handleReservaCreada = () => {
    setVistaActual('ver');
  }

  return (
    <section className="reservas-section">
      <div className="reservas-container">
        <div className="reservas-toggle">
          <button 
            onClick={() => setVistaActual('crear')}
            className={vistaActual === 'crear' ? 'active' : ''}
          >
            Hacer una Reserva
          </button>
          <button 
            onClick={() => setVistaActual('ver')}
            className={vistaActual === 'ver' ? 'active' : ''}
          >
            Mis Reservas
          </button>
        </div>

        <div className="reservas-content">
          {vistaActual === 'crear' ? (
            <FormularioReserva onReservaCreada={handleReservaCreada} />
          ) : (
            <ListaReservas reservas={reservas} loading={loading} />
          )}
        </div>
      </div>
    </section>
  );
};

export default Reservas;