// En el archivo ListaReservas.tsx
import TarjetaReserva from './TarjetaReserva';

interface Props {
  reservas: any[];
  loading: boolean;
}

const ListaReservas = ({ reservas, loading }: Props) => {
  if (loading) {
    return <p>Cargando tus reservas...</p>;
  }

  if (reservas.length === 0) {
    return <p>Aún no tienes ninguna reserva. ¡Anímate a crear una!</p>;
  }

  return (
    <div className="lista-reservas-container">
      <h2>Tu historial de reservas</h2>
      <div className="lista-reservas">
        {reservas.map(reserva => (
          <TarjetaReserva key={reserva.id} reserva={reserva} />
        ))}
      </div>
    </div>
  );
};
export default ListaReservas;