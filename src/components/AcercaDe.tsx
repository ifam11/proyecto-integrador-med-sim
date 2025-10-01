import Acerca from '../assets/Acerca.jpg'
import './AcercaDe.css'

const AcercaDe = () => {
  return (
    <section className="acerca-de">
      <div className="acerca-de-content">
        <div className="acerca-de-text">
          <h2 className="titulo">Bienvenido a CanchaFácil</h2>
          <p className="descripcion">
            Somos una plataforma moderna pensada para facilitar el alquiler de canchas deportivas de forma rápida, segura y eficiente. Nuestro propósito es conectar a los amantes del deporte con los mejores espacios disponibles en su ciudad.
          </p>

          <h3 className="subtitulo">Nuestra Visión</h3>
          <p className="descripcion">
            Aspiramos a ser la solución número uno en la gestión de espacios deportivos, promoviendo la actividad física y el bienestar en cada comunidad.
          </p>

          <h3 className="subtitulo">¿Qué Ofrecemos?</h3>
          <p className="descripcion">
            Contamos con un amplio catálogo de canchas de fútbol, vóley, básquet y más. Nuestro sistema te permite buscar, comparar y reservar canchas en tiempo real desde cualquier dispositivo.
          </p>
        </div>

        <div className="acerca-de-image">
          <img src={Acerca} alt="Alquiler de canchas deportivas" />
        </div>
      </div>
    </section>
  )
}

export default AcercaDe
