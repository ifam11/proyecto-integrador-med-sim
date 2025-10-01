import './CatalogoModelos.css';
import { useMemo, useState } from 'react';
import { FiBox, FiSearch, FiExternalLink, FiDownload } from 'react-icons/fi';

type Modelo = {
  id: string;
  nombre: string;
  categoria: 'Pulmón' | 'Vías aéreas' | 'Micro (alvéolo)';
  thumb: string;
  glb?: string;   // descarga local
  viewer?: string; // URL de visor externo o ruta interna
  nota?: string;
};

const MODELOS: Modelo[] = [
  { id: 'm1', nombre: 'Pulmón completo', categoria: 'Pulmón', thumb: '/assets/modelos/pulmon-thumb.jpg', glb: '/assets/modelos/pulmon.glb', nota: 'Segmentos y pleuras visibles.' },
  { id: 'm2', nombre: 'Árbol traqueobronquial', categoria: 'Vías aéreas', thumb: '/assets/modelos/arbol-thumb.jpg', glb: '/assets/modelos/arbol_bronquial.glb' },
  { id: 'm3', nombre: 'Alvéolo (micro)', categoria: 'Micro (alvéolo)', thumb: '/assets/modelos/alveolo-thumb.jpg', glb: '/assets/modelos/alveolo.glb' },
];

export default function CatalogoModelos() {
  const [q, setQ] = useState('');
  const [cat, setCat] = useState<'Todos' | Modelo['categoria']>('Todos');

  const list = useMemo(() => {
    const term = q.trim().toLowerCase();
    return MODELOS.filter(m => cat === 'Todos' || m.categoria === cat)
      .filter(m => !term || m.nombre.toLowerCase().includes(term) || (m.nota ?? '').toLowerCase().includes(term));
  }, [q, cat]);

  return (
    <section className="modelos">
      <header className="toolbar">
        <div className="search">
          <FiSearch />
          <input
            type="text"
            placeholder="Buscar modelos 3D…"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
        </div>
        <div className="chips">
          {(['Todos','Pulmón','Vías aéreas','Micro (alvéolo)'] as const).map(c => (
            <button key={c} className={`chip ${cat === c ? 'active' : ''}`} onClick={() => setCat(c)}>
              {c}
            </button>
          ))}
        </div>
      </header>

      <div className="grid">
        {list.map(m => (
          <article className="card" key={m.id}>
            <div className="media">
              <img src={m.thumb} alt={m.nombre} />
              <span className="badge"><FiBox /> 3D</span>
            </div>
            <div className="body">
              <h3 className="title">{m.nombre}</h3>
              {m.nota && <p className="desc">{m.nota}</p>}
              <div className="meta">{m.categoria}</div>
              <div className="actions">
                {m.viewer && (
                  <a className="btn btn-primary" href={m.viewer} target="_blank" rel="noreferrer">
                    <FiExternalLink /> Ver en visor
                  </a>
                )}
                {m.glb && (
                  <a className="btn btn-ghost" href={m.glb} download>
                    <FiDownload /> Descargar GLB
                  </a>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>

      <p className="note">
        Consejo: si quieres un visor embebido sin librerías, puedes abrir tus GLB en un
        servicio externo como Sketchfab (iframe) o crear una página interna que use <code>&lt;canvas&gt;</code> con Three.js (cuando decidas usar librerías).
      </p>
    </section>
  );
}
