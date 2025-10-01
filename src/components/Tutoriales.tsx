import './Tutoriales.css';
import { useMemo, useState } from 'react';
import { FiPlay, FiSearch, FiBookOpen, FiFilm, FiImage } from 'react-icons/fi';

type Categoria = 'Anatomía' | 'Histología' | 'Simulación';
type Tutorial = {
  id: string;
  titulo: string;
  categoria: Categoria;
  descripcion: string;
  thumb?: string;
  videoUrl?: string; // YouTube u otra plataforma (iframe)
  recursoUrl?: string; // PDF/imagen externa opcional
};

const DATA: Tutorial[] = [
  {
    id: 't1',
    titulo: 'Anatomía del árbol traqueobronquial',
    categoria: 'Anatomía',
    descripcion: 'Ubicación de la tráquea, bronquios principales y segmentación pulmonar.',
    thumb: '/assets/tutoriales/bronquial.jpg',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
  },
  {
    id: 't2',
    titulo: 'Epitelio respiratorio y células caliciformes',
    categoria: 'Histología',
    descripcion: 'Identificación de epitelio pseudoestratificado ciliado y funciones.',
    thumb: '/assets/tutoriales/epitelio.jpg',
    recursoUrl: '/assets/recursos/alveolo-difusion.pdf'
  },
  {
    id: 't3',
    titulo: 'Simulación: manejo inicial del paciente con disnea',
    categoria: 'Simulación',
    descripcion: 'Evaluación ABC, saturación, gasometría y decisiones terapéuticas.',
    thumb: '/assets/tutoriales/disnea.jpg',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
  }
];

export default function Tutoriales() {
  const [q, setQ] = useState('');
  const [cat, setCat] = useState<'Todas' | Categoria>('Todas');
  const [openVideo, setOpenVideo] = useState<Tutorial | null>(null);

  const list = useMemo(() => {
    const term = q.trim().toLowerCase();
    return DATA
      .filter(t => cat === 'Todas' || t.categoria === cat)
      .filter(t => !term || t.titulo.toLowerCase().includes(term) || t.descripcion.toLowerCase().includes(term));
  }, [q, cat]);

  return (
    <section className="tutoriales">
      <header className="toolbar">
        <div className="search">
          <FiSearch />
          <input
            type="text"
            placeholder="Buscar tutoriales…"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
        </div>
        <div className="chips">
          {(['Todas','Anatomía','Histología','Simulación'] as const).map(c => (
            <button key={c} className={`chip ${cat === c ? 'active' : ''}`} onClick={() => setCat(c)}>
              {c}
            </button>
          ))}
        </div>
      </header>

      <div className="grid">
        {list.map(t => (
          <article className="card" key={t.id}>
            <div className="media">
              {t.thumb ? <img src={t.thumb} alt={t.titulo} /> : <div className="ph" />}
              <span className="badge">
                {t.videoUrl ? <FiFilm /> : t.recursoUrl ? <FiImage /> : <FiBookOpen />} {t.categoria}
              </span>
              {t.videoUrl && (
                <button className="play" onClick={() => setOpenVideo(t)} aria-label="Reproducir video">
                  <FiPlay />
                </button>
              )}
            </div>
            <div className="body">
              <h3 className="title">{t.titulo}</h3>
              <p className="desc">{t.descripcion}</p>
              <div className="meta">{t.categoria}</div>
              {t.recursoUrl && (
                <a className="btn btn-ghost" href={t.recursoUrl} target="_blank" rel="noreferrer">
                  Ver recurso
                </a>
              )}
            </div>
          </article>
        ))}
      </div>

      {openVideo && (
        <div className="lightbox" role="dialog" aria-modal="true">
          <div className="frame">
            <iframe
              src={openVideo.videoUrl}
              title={openVideo.titulo}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
            <button className="close" onClick={() => setOpenVideo(null)} aria-label="Cerrar" />
          </div>
        </div>
      )}
    </section>
  );
}
