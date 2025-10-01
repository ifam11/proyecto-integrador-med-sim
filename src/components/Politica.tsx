import './Politica.css';

export default function Politica() {
  return (
    <section className="legal">
      <aside className="toc">
        <nav>
          <a href="#intro">Introducción</a>
          <a href="#datos">Datos que recolectamos</a>
          <a href="#uso">Uso de datos</a>
          <a href="#cookies">Cookies</a>
          <a href="#derechos">Tus derechos</a>
          <a href="#contacto">Contacto</a>
        </nav>
      </aside>

      <article className="doc">
        <h1 id="intro">Política de Privacidad</h1>
        <p>Esta política describe cómo MEVALTEC trata la información personal en su plataforma educativa.</p>

        <h2 id="datos">Datos que recolectamos</h2>
        <ul>
          <li>Datos de cuenta: nombre, email y rol (administrador/docente/estudiante).</li>
          <li>Métricas de uso: módulos vistos, progreso y calificaciones.</li>
          <li>Datos técnicos: IP, navegador y logs de seguridad.</li>
        </ul>

        <h2 id="uso">Uso de datos</h2>
        <p>Utilizamos los datos para proveer el servicio, personalizar el contenido, mejorar el aprendizaje y garantizar la seguridad.</p>

        <h2 id="cookies">Cookies</h2>
        <p>Usamos cookies para autenticación y preferencias. Puedes configurar tu navegador para bloquearlas (algunas funciones pueden verse limitadas).</p>

        <h2 id="derechos">Tus derechos</h2>
        <p>Puedes solicitar acceso, rectificación o eliminación de tus datos, salvo obligaciones legales de conservación.</p>

        <h2 id="contacto">Contacto</h2>
        <p>Si tienes dudas, escríbenos a <a href="mailto:soporte@mevaltec.com">soporte@mevaltec.com</a>.</p>
      </article>
    </section>
  );
}
