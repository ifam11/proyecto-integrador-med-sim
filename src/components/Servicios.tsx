import './Servicios.css';
import { useMemo, useState } from 'react';
// Si usas React Router, puedes reemplazar <a> por <Link> y descomentar:
// import { Link } from 'react-router-dom';

import Anatomia3D from '../assets/anatomia-3d.jpg';
import CasosClinicos from '../assets/casos-clinicos.png';
import HistologiaVirtual from '../assets/histologia-virtual.png';
import GamificacionImg from '../assets/gamificacion.jpg';
import ColaboracionImg from '../assets/colaboracion.jpg';
import EvaluacionesImg from '../assets/evaluaciones.jpg';

type Categoria = 'Simulador' | 'Colaboración' | 'Gamificación' | 'Evaluaciones';

type Servicio = {
  imagen: string;
  titulo: string;
  descripcion: string;
  path: string;
  categoria: Categoria;
};

const DATA: Servicio[] = [
  {
    imagen: Anatomia3D,
    titulo: 'Simulaciones de Anatomía 3D',
    descripcion:
      'Explora modelos 3D interactivos: vías aéreas, pulmones y caja torácica con etiquetado y rotación libre.',
    path: '/simulador/anatomia',
    categoria: 'Simulador'
  },
  {
    imagen: HistologiaVirtual,
    titulo: 'Laboratorio de Histología Virtual',
    descripcion:
      'Navega láminas de alta resolución. Zoom profundo, anotaciones y banco de imágenes para práctica guiada.',
    path: '/simulador/histologia',
    categoria: 'Simulador'
  },
  {
    imagen: GamificacionImg,
    titulo: 'Módulos de Gamificación',
    descripcion:
      'Gana puntos e insignias, completa misiones y compite en rankings para reforzar conceptos clave.',
    path: '/gamificacion/retos',
    categoria: 'Gamificación'
  },
  {
    imagen: ColaboracionImg,
    titulo: 'Herramientas de Colaboración',
    descripcion:
      'Foros temáticos, salas de estudio y mensajería. Aprende en comunidad con docentes y compañeros.',
    path: '/colaboracion/foros',
    categoria: 'Colaboración'
  },
  {
    imagen: CasosClinicos,
    titulo: 'Simulador de Casos Clínicos',
    descripcion:
      'Resuelve escenarios con pacientes virtuales. Toma decisiones diagnósticas y terapéuticas con feedback inmediato.',
    path: '/simulador/casos',
    categoria: 'Simulador'
  },
  {
    imagen: EvaluacionesImg,
    titulo: 'Evaluaciones y Certificaciones',
    descripcion:
      'Cuestionarios interactivos y OSCE virtual. Mide tu progreso, recibe retroalimentación y certifica logros.',
    path: '/evaluaciones/cuestionarios',
    categoria: 'Evaluaciones'
  }
];

export default function Servicios() {
  const [q, setQ] = useState('');
  const [cat, setCat] = useState<'Todas' | Categoria>('Todas');

  const list = useMemo(() => {
    const term = q.trim().toLowerCase();
    return DATA
      .filter(s => cat === 'Todas' || s.categoria === cat)
      .filter(
        s =>
          !term ||
          s.titulo.toLowerCase().includes(term) ||
          s.descripcion.toLowerCase().includes(term)
      );
  }, [q, cat]);

  return (
    <section className="servicios">
      <header className="head">
        <h2 className="title">Nuestras Herramientas y Servicios</h2>
        <p className="subtitle">
          Un ecosistema integral de aprendizaje respiratorio: simulaciones, histología, colaboración,
          gamificación y evaluación con métricas de progreso.
        </p>

        <div className="toolbar">
          <div className="search">
            <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M21 21l-4.2-4.2M17 10.5A6.5 6.5 0 1 1 4 10.5a6.5 6.5 0 0 1 13 0Z" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
            </svg>
            <input
              type="text"
              placeholder="Buscar servicios…"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              aria-label="Buscar servicios"
            />
          </div>

          <div className="chips" role="tablist" aria-label="Filtrar por categoría">
            {(['Todas','Simulador','Colaboración','Gamificación','Evaluaciones'] as const).map(c => (
              <button
                key={c}
                role="tab"
                aria-selected={cat === c}
                className={`chip ${cat === c ? 'active' : ''}`}
                onClick={() => setCat(c)}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      </header>

      {list.length === 0 ? (
        <div className="empty">
          <p>No hay resultados para “{q}”. Prueba con otro término o quita el filtro.</p>
        </div>
      ) : (
        <div className="grid">
          {list.map((s, i) => (
            <article className="card" key={i}>
              <figure className="media">
                <img src={s.imagen} alt={s.titulo} loading="lazy" />
                <figcaption className="badge">{s.categoria}</figcaption>
                <span className="fx" aria-hidden="true" />
              </figure>

              <div className="body">
                <h3 className="card-title">{s.titulo}</h3>
                <p className="card-desc">{s.descripcion}</p>

                {/* Si usas React Router, reemplaza por:
                    <Link className="btn btn-primary" to={s.path}>Explorar Módulo</Link>
                */}
                <a className="btn btn-primary" href={s.path} aria-label={`Ir a ${s.titulo}`}>
                  Explorar Módulo
                </a>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
