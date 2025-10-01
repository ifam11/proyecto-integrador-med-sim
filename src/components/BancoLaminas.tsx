import './BancoLaminas.css';
import { useMemo, useState } from 'react';
import { FiSearch, FiX } from 'react-icons/fi';

type Lamina = {
  id: string;
  titulo: string;
  categoria: 'Tráquea' | 'Bronquio' | 'Epitelio' | 'Alvéolo';
  thumb: string;
  full: string;
  nota?: string;
};

const LAMINAS: Lamina[] = [
  { id: 'l1', titulo: 'Epitelio respiratorio ciliado', categoria: 'Epitelio', thumb: '/assets/laminas/epitelio-thumb.jpg', full: '/assets/laminas/epitelio-full.jpg', nota: 'Células caliciformes y cilios visibles.' },
  { id: 'l2', titulo: 'Bronquio segmentario', categoria: 'Bronquio', thumb: '/assets/laminas/bronquio-thumb.jpg', full: '/assets/laminas/bronquio-full.jpg' },
  { id: 'l3', titulo: 'Tráquea: cartílago hialino', categoria: 'Tráquea', thumb: '/assets/laminas/traquea-thumb.jpg', full: '/assets/laminas/traquea-full.jpg' },
  { id: 'l4', titulo: 'Alvéolos: neumocitos I y II', categoria: 'Alvéolo', thumb: '/assets/laminas/alveolo-thumb.jpg', full: '/assets/laminas/alveolo-full.jpg', nota: 'Presencia de septos interalveolares.' },
];

export default function BancoLaminas() {
  const [q, setQ] = useState('');
  const [cat, setCat] = useState<'Todas' | Lamina['categoria']>('Todas');
  const [open, setOpen] = useState<Lamina | null>(null);

  const list = useMemo(() => {
    const term = q.trim().toLowerCase();
    return LAMINAS.filter(l => cat === 'Todas' || l.categoria === cat)
      .filter(l => !term || l.titulo.toLowerCase().includes(term) || (l.nota ?? '').toLowerCase().includes(term));
  }, [q, cat]);

  return (
    <section className="laminas">
      {/* filtros */}
      <header className="toolbar">
        <div className="search">
          <FiSearch />
          <input
            type="text"
            placeholder="Buscar láminas (ej. alvéolo, epitelio)…"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
        </div>
        <div className="chips">
          {(['Todas','Tráquea','Bronquio','Epitelio','Alvéolo'] as const).map(c => (
            <button key={c} className={`chip ${cat === c ? 'active' : ''}`} onClick={() => setCat(c)}>
              {c}
            </button>
          ))}
        </div>
      </header>

      {/* galería */}
      <div className="grid">
        {list.map(l => (
          <figure className="tile" key={l.id} onClick={() => setOpen(l)} role="button" aria-label={`Abrir ${l.titulo}`}>
            <img src={l.thumb} alt={l.titulo} />
            <figcaption>
              <strong>{l.titulo}</strong>
              <span>{l.categoria}</span>
            </figcaption>
          </figure>
        ))}
      </div>

      {/* lightbox */}
      {open && (
        <div className="lightbox" role="dialog" aria-modal="true">
          <button className="close" onClick={() => setOpen(null)} aria-label="Cerrar"><FiX /></button>
          <img src={open.full} alt={open.titulo} />
          <div className="caption">
            <h3>{open.titulo}</h3>
            {open.nota && <p>{open.nota}</p>}
          </div>
        </div>
      )}
    </section>
  );
}
