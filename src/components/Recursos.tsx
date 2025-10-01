import './Recursos.css';
import { type ReactNode, useMemo, useState } from 'react';
import { FiFileText, FiVideo, FiBox, FiSearch, FiDownload, FiExternalLink } from 'react-icons/fi';

type Tipo = 'pdf' | 'video' | 'model3d';
type Recurso = {
  id: string;
  tipo: Tipo;
  titulo: string;
  descripcion?: string;
  thumb?: string;
  url: string;        // enlace para abrir
  descarga?: string;  // opcional (ej. PDF/GLB)
};

const DATA: Recurso[] = [
  {
    id: 'r1',
    tipo: 'pdf',
    titulo: 'Manual de vías aéreas',
    descripcion: 'Guía básica de anatomía de vías aéreas superiores e instrumentación.',
    thumb: '../../src/assets/manual-vias-aereas.jpg',
    url: 'https://www.cti.hc.edu.uy/images/Teorico_VIA_AEREA.pdf',
    descarga: '../../src/assets/manual-vias-aereas.pdf'
  },
  {
    id: 'r2',
    tipo: 'video',
    titulo: 'Mecánica ventilatoria',
    descripcion: 'Video introductorio del ciclo respiratorio y presión transpulmonar.',
    thumb: '../../src/assets/mecanica.jpeg',
    url: 'https://www.youtube.com/watch?v=mFgtdiGnX_E'
  },
  {
    id: 'r3',
    tipo: 'model3d',
    titulo: 'Árbol traqueobronquial (GLB)',
    descripcion: 'Modelo 3D del árbol respiratorio para inspección y demostración.',
    thumb: '/assets/bronquial.jpg',
    url: '/assets/arbol_bronquial.glb',
    descarga: '/assets/arbol_bronquial.glb'
  },
  {
    id: 'r4',
    tipo: 'pdf',
    titulo: 'Alvéolo y difusión de gases',
    descripcion: 'Resumen de histología alveolar y surfactante pulmonar.',
    thumb: '../../src/assets/alveoloD.jpg',
    url: '../../src/assets/alveolo-difusion.pdf',
    descarga: 'https://doi.org/10.51451/np.v17i1.472'
  }
];

const ICON: Record<Tipo, ReactNode> = {
  pdf: <FiFileText />,
  video: <FiVideo />,
  model3d: <FiBox />
};

export default function Recursos() {
  const [q, setQ] = useState('');
  const [filtro, setFiltro] = useState<Tipo | 'all'>('all');

  const list = useMemo(() => {
    const term = q.trim().toLowerCase();
    return DATA.filter((r) => (filtro === 'all' || r.tipo === filtro))
      .filter((r) => !term || r.titulo.toLowerCase().includes(term) || (r.descripcion ?? '').toLowerCase().includes(term));
  }, [q, filtro]);

  return (
    <section className="recursos">
      <header className="toolbar">
        <div className="search">
          <FiSearch />
          <input
            type="text"
            placeholder="Buscar recursos (PDF, Video, 3D)…"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
        </div>

        <div className="chips" role="tablist" aria-label="Filtro de tipo">
          {(['all','pdf','video','model3d'] as const).map(t => (
            <button
              key={t}
              role="tab"
              aria-selected={filtro === t}
              className={`chip ${filtro === t ? 'active' : ''}`}
              onClick={() => setFiltro(t)}
            >
              {t === 'all' ? 'Todos' : <>
                <span className={`dot ${t}`} /> {t.toUpperCase()}
              </>}
            </button>
          ))}
        </div>
      </header>

      <div className="grid">
        {list.map(r => (
          <article className="card" key={r.id}>
            <div className="media">
              {r.thumb ? <img src={r.thumb} alt={r.titulo} /> : <div className="placeholder">{ICON[r.tipo]}</div>}
              <span className={`badge ${r.tipo}`}>{ICON[r.tipo]} {r.tipo.toUpperCase()}</span>
            </div>
            <div className="body">
              <h3 className="title">{r.titulo}</h3>
              {r.descripcion && <p className="desc">{r.descripcion}</p>}
              <div className="actions">
                <a className="btn btn-primary" href={r.url} target="_blank" rel="noreferrer">
                  <FiExternalLink /> Abrir
                </a>
                {r.descarga && (
                  <a className="btn btn-ghost" href={r.descarga} download>
                    <FiDownload /> Descargar
                  </a>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
