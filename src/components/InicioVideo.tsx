import videoDep from '../assets/VideoDep.mp4';
import './InicioVideo.css';

const InicioVideo = () => {
  return (
    <section className="inicio-video-section"> {/* Changed to section for semantic meaning */}
      <div className="inicio-video-content-left"> {/* Container for the video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="video-element" 
        >
          <source src={videoDep} type="video/mp4" />
          Tu navegador no soporta el elemento de video.
        </video>
      </div>
      <div className="inicio-video-content-right"> {/* Container for the title and description */}
        <h2 className="video-title">Reserva Tu Cancha Deportiva Ideal</h2> {/* Changed to h2, added class */}
        <p className="video-description-text"> {/* Added specific class for description */}
          Encuentra y reserva fácilmente la cancha perfecta para tu deporte favorito.
          Con SportBooking, tu próximo partido está a solo un clic de distancia.
          ¡Comienza a jugar hoy mismo!
        </p>
      </div>
    </section>
  );
};

export default InicioVideo;