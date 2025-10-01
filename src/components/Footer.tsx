import './Footer.css';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaWhatsapp, FaFacebookF, FaInstagram, FaYoutube, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-grid">
        
        {/* Identidad */}
        <div className="footer-brand">
          <h2>MEVALTEC</h2>
          <p>
            Plataforma web y móvil de simulación interactiva para fortalecer la formación académica y práctica en medicina, 
            con enfoque en el sistema respiratorio humano.
          </p>
        </div>

        {/* Contacto */}
        <div className="footer-contact">
          <h3>Contacto</h3>
          <p><FaMapMarkerAlt /> Cochabamba, Bolivia</p>
          <p><FaPhone /> +591 777-98765</p>
          <p><FaEnvelope /> soporte@mevaltec.com</p>
          <p><FaWhatsapp /> +591 777-98765</p>
        </div>

        {/* Redes sociales */}
        <div className="footer-social">
          <h3>Conéctate</h3>
          <div className="icons">
            <a href="https://facebook.com/mevaltec" target="_blank" rel="noreferrer"><FaFacebookF /></a>
            <a href="https://instagram.com/mevaltec" target="_blank" rel="noreferrer"><FaInstagram /></a>
            <a href="https://youtube.com/mevaltec" target="_blank" rel="noreferrer"><FaYoutube /></a>
            <a href="https://linkedin.com/company/mevaltec" target="_blank" rel="noreferrer"><FaLinkedin /></a>
          </div>
        </div>

        {/* Legal */}
        <div className="footer-legal">
          <h3>Legal</h3>
          <a href="/privacidad">Política de Privacidad</a>
          <a href="/terminos">Términos y Condiciones</a>
        </div>
      </div>

      {/* Línea inferior */}
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} MEVALTEC. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;
