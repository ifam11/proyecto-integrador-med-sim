import { useState, useEffect } from 'react';

// Prop para notificar al padre que la reserva fue creada
interface Props {
  onReservaCreada: () => void;
}

// Define the type for a cancha object
interface Cancha {
  id: number;
  nombre: string;
  // Add other properties if your cancha objects have them, e.g., tipo: string;
}

const FormularioReserva = ({ onReservaCreada }: Props) => {
  // Explicitly type the state variables
  const [canchas, setCanchas] = useState<Cancha[]>([]); // Array of Cancha objects
  const [canchaSeleccionada, setCanchaSeleccionada] = useState<string>(''); // Cancha ID will be a string from select value
  const [fecha, setFecha] = useState<string>('');
  const [horariosDisponibles, setHorariosDisponibles] = useState<string[]>([]); // Array of strings for times
  const [horaSeleccionada, setHoraSeleccionada] = useState<string>('');

  // 1. Cargar tipos de canchas al iniciar
  useEffect(() => {
    // Aquí harías la llamada a tu API: GET /api/canchas
    const canchasDeEjemplo: Cancha[] = [ // Ensure the example data matches the Cancha interface
      { id: 1, nombre: 'Fútbol 5' },
      { id: 2, nombre: 'Básquet' },
      { id: 3, nombre: 'Tenis' }
    ];
    setCanchas(canchasDeEjemplo);
  }, []);

  // 2. Buscar horarios cuando el usuario selecciona una cancha y una fecha
  useEffect(() => {
    if (canchaSeleccionada && fecha) {
      // Llamada a API: GET /api/canchas/:id/disponibilidad?fecha=...
      console.log(`Buscando horarios para la cancha ${canchaSeleccionada} en la fecha ${fecha}`);
      const horariosDeEjemplo: string[] = ['09:00', '10:00', '11:00', '15:00', '16:00'];
      setHorariosDisponibles(horariosDeEjemplo);
    }
  }, [canchaSeleccionada, fecha]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Lógica para enviar la reserva a la API: POST /api/reservas
    console.log({
      cancha_id: canchaSeleccionada,
      fecha: fecha,
      hora: horaSeleccionada
    });
    // Si la llamada a la API es exitosa:
    alert('¡Reserva creada con éxito!');
    onReservaCreada();
  };

  return (
    <div className="reserva-form-container">
      <h2>Completa los datos para tu reserva</h2>
      <form onSubmit={handleSubmit} className="reserva-form">
        <div className="form-group">
          <label htmlFor="cancha"></label>
          <select id="cancha" value={canchaSeleccionada} onChange={e => setCanchaSeleccionada(e.target.value)} required>
            <option value="" disabled>Selecciona una cancha</option>
            {canchas.map((cancha: Cancha) => ( // Use the Cancha type here
              <option key={cancha.id} value={cancha.id}>{cancha.nombre}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="fecha">Selecciona la fecha</label>
          {/* Para una mejor experiencia, usa una librería como 'react-datepicker' */}
          <input type="date" id="fecha" value={fecha} onChange={e => setFecha(e.target.value)} required />
        </div>

        {horariosDisponibles.length > 0 && (
          <div className="form-group">
            <label>Elige la hora</label>
            <div className="horarios-grid">
              {horariosDisponibles.map((hora: string) => ( // Use string type here
                <button
                  type="button"
                  key={hora}
                  onClick={() => setHoraSeleccionada(hora)}
                  className={`hora-btn ${horaSeleccionada === hora ? 'selected' : ''}`}
                >
                  {hora}
                </button>
              ))}
            </div>
          </div>
        )}

        <button type="submit" className="submit-button" disabled={!canchaSeleccionada || !fecha || !horaSeleccionada}>
          Confirmar Reserva
        </button>
      </form>
    </div>
  );
};

export default FormularioReserva;