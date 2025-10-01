import './Terminos.css';

export default function Terminos() {
  return (
    <section className="legal">
      <aside className="toc">
        <nav>
          <a href="#aceptacion">Aceptación</a>
          <a href="#uso">Uso permitido</a>
          <a href="#propiedad">Propiedad intelectual</a>
          <a href="#limitacion">Limitación de responsabilidad</a>
          <a href="#cambios">Cambios</a>
        </nav>
      </aside>

      <article className="doc">
        <h1 id="aceptacion">Términos y Condiciones</h1>
        <p>Al usar MEVALTEC, aceptas los siguientes términos.</p>

        <h2 id="uso">Uso permitido</h2>
        <p>La plataforma es para fines educativos. No está permitido el uso malicioso, la ingeniería inversa ni el acceso no autorizado.</p>

        <h2 id="propiedad">Propiedad intelectual</h2>
        <p>Los contenidos y marcas son propiedad de sus autores o de MEVALTEC. No se permite su reproducción sin autorización.</p>

        <h2 id="limitacion">Limitación de responsabilidad</h2>
        <p>MEVALTEC no se responsabiliza por decisiones clínicas tomadas a partir de la plataforma. Es material educativo.</p>

        <h2 id="cambios">Cambios</h2>
        <p>Podemos actualizar estos términos. Te notificaremos cambios relevantes.</p>
      </article>
    </section>
  );
}
