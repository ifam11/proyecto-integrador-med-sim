import './Inicio.css';
import pulmones3D from '../assets/pulmones-3d.jpeg';
import histologia from '../assets/microscopio.jpg';
import casosClinicos from '../assets/caso-clinico.jpg';
import realidadAumentada from '../assets/realidad-aumentada.jpg';

const Inicio = () => {
  return (
    <section className="inicio" id="inicio">
      <h1 className="inicio-titulo">Bienvenido a Simulador Respiratorio</h1>
      <p className="inicio-slogan">
        Tu plataforma interactiva para dominar la fisiología, anatomía y patología del sistema respiratorio.
      </p>

      {/* Sección 1: Introducción y Propósito */}
      <div className="inicio-section intro-section">
        <div className="inicio-text">
          <h2 className="inicio-subtitulo">Una Nueva Era en la Educación Médica</h2>
          <p className="inicio-descripcion">
            Nuestra plataforma está diseñada para transformar la forma en que estudiantes y profesionales de la salud interactúan con el conocimiento médico. A través de **simulaciones de alta fidelidad**, te sumergirás en escenarios clínicos realistas y explorarás la complejidad del sistema respiratorio de manera interactiva.
          </p>
          <p className="inicio-descripcion">
            Olvídate del aprendizaje pasivo. Aquí, cada concepto se materializa en una experiencia práctica: desde la visualización de la anatomía en 3D hasta el análisis microscópico de tejidos y la gestión de pacientes virtuales. Es el complemento perfecto para tu formación teórica, preparándote para la toma de decisiones críticas en el mundo real.
          </p>
        </div>
        <div className="inicio-image-container">
          <img
            src={pulmones3D}
            alt="Modelo 3D del sistema respiratorio"
            className="inicio-image"
          />
        </div>
      </div>

      ---

      {/* Sección 2: Módulos Principales (Descripción Detallada) */}
      <div className="inicio-modules-section">
        <h2 className="modules-titulo">Explora Nuestros Módulos de Aprendizaje</h2>
        <div className="module-card">
          <div className="card-image-container">
            <img src={histologia} alt="Microscopio virtual" className="card-image" />
          </div>
          <div className="card-content">
            <h3 className="card-titulo">Anatomía e Histología Interactivas</h3>
            <p className="card-descripcion">
              Sumérgete en la estructura del pulmón a nivel macro y microscópico. Utiliza nuestro **microscopio virtual** para examinar un extenso banco de láminas histológicas, identificando células y tejidos clave.
            </p>
            <ul className="module-features-list">
              <li> Más de 500 láminas histológicas de alta resolución.</li>
              <li> Modelos 3D interactivos del tracto respiratorio.</li>
              <li> Funcionalidad de zoom, etiquetado y anotaciones.</li>
            </ul>
          </div>
        </div>

        <div className="module-card reverse">
          <div className="card-image-container">
            <img src={casosClinicos} alt="Simulador de casos clínicos" className="card-image" />
          </div>
          <div className="card-content">
            <h3 className="card-titulo">Simulador de Casos Clínicos y OSCE Virtual</h3>
            <p className="card-descripcion">
              Pon a prueba tus habilidades diagnósticas y de razonamiento clínico. Te enfrentarás a **pacientes virtuales** con síntomas, signos vitales y antecedentes médicos, donde cada decisión afecta el curso de la simulación.
            </p>
            <ul className="module-features-list">
              <li> Variedad de patologías respiratorias (neumonía, EPOC, asma).</li>
              <li> Simulación de exámenes objetivos estructurados (OSCE).</li>
              <li> Retroalimentación instantánea sobre cada decisión tomada.</li>
            </ul>
          </div>
        </div>
        
        <div className="module-card">
          <div className="card-image-container">
            <img src={realidadAumentada} alt="Realidad Aumentada y VR" className="card-image" />
          </div>
          <div className="card-content">
            <h3 className="card-titulo">Realidad Aumentada (AR) y Realidad Virtual (VR)</h3>
            <p className="card-descripcion">
              Lleva tu aprendizaje más allá de la pantalla. Usa tu smartphone o visor de VR para proyectar modelos 3D del sistema respiratorio en tu entorno real, explorando cada alveolo y bronquiolo con una inmersión sin precedentes.
            </p>
            <ul className="module-features-list">
              <li> Modelos anatómicos interactivos con AR.</li>
              <li> Experiencias inmersivas de exploración en VR.</li>
              <li> Visualización de flujos de aire y intercambio gaseoso.</li>
            </ul>
          </div>
        </div>
      </div>

      ---

      {/* Sección 3: Beneficios y Llamada a la Acción */}
      <div className="inicio-benefits-section">
        <h2 className="benefits-titulo">Beneficios Clave de Nuestra Plataforma</h2>
        <div className="benefits-grid">
          <div className="benefit-item">
            <i className="fa fa-chart-line benefit-icon"></i>
            <h4 className="benefit-title">Seguimiento de Progreso</h4>
            <p className="benefit-text">Monitorea tu avance y competencias logradas en tiempo real.</p>
          </div>
          <div className="benefit-item">
            <i className="fa fa-users-cog benefit-icon"></i>
            <h4 className="benefit-title">Colaboración entre Pares</h4>
            <p className="benefit-text">Participa en foros, salas de estudio y mensajería con otros usuarios.</p>
          </div>
          <div className="benefit-item">
            <i className="fa fa-gamepad benefit-icon"></i>
            <h4 className="benefit-title">Aprendizaje Gamificado</h4>
            <p className="benefit-text">Gana insignias y compite en rankings para motivarte.</p>
          </div>
        </div>
      </div>

      <div className="inicio-call-to-action">
        <h2 className="cta-titulo">¿Listo para transformar tu aprendizaje?</h2>
        <p className="cta-texto">
          Regístrate hoy y accede a la herramienta más completa para la formación en salud respiratoria.
        </p>
        <a href="/dashboard" className="cta-button">
          Comenzar
        </a>
      </div>
    </section>
  );
};

export default Inicio;