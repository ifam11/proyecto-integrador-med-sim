// En el archivo TarjetaReserva.tsx
const TarjetaReserva = ({ reserva }: { reserva: any }) => {
    // Función para cancelar (haría una llamada a DELETE /api/reservas/:id)
    const handleCancelar = () => {
        if(window.confirm('¿Estás seguro de que quieres cancelar esta reserva?')) {
            console.log("Cancelando reserva:", reserva.id);
        }
    }
  return (
    <div className={`reserva-card status-${reserva.estado}`}>
      <div className="card-header">
        <h3>{reserva.cancha.nombre}</h3>
        <span className="reserva-status">{reserva.estado}</span>
      </div>
      <div className="card-body">
        <p><strong>Fecha:</strong> {reserva.fecha}</p>
        <p><strong>Hora:</strong> {reserva.hora_inicio}</p>
      </div>
      {reserva.estado === 'confirmada' && (
        <div className="card-footer">
          <button onClick={handleCancelar} className="cancel-button">Cancelar Reserva</button>
        </div>
      )}
    </div>
  );
};
export default TarjetaReserva;