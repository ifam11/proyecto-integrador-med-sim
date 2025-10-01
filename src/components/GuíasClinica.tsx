import './GuíasClinica.css';
import { useMemo, useState } from 'react';
import { FiSearch, FiFileText, FiDownload, FiExternalLink } from 'react-icons/fi';

type Guia = {
  id: string;
  titulo: string;
  area: 'Adulto' | 'Pediátrico' | 'Procedimientos';
  resumen?: string;
  url: string;       // abrir
  descarga?: string; // opcional
};

const GUIAS: Guia[] = [
  {
    id: 'g1',
    titulo: 'Manejo inicial de la exacerbación asmática (Adulto)',
    area: 'Adulto',
    resumen: 'Criterios diagnósticos, tratamiento escalonado y alta segura.',
    url: '/assets/guias/asma-adulto.pdf',
    descarga: '/assets/guias/asma-adulto.pdf'
  },
  {
    id: 'g2',
    titulo: 'Bronquiolitis aguda en lactantes',
    area: 'Pediátrico',
    resumen: 'Evaluación por gravedad, oxigenoterapia y criterios de hospitalización.',
    url: '/assets/guias/bronquiolitis.pdf',
    descarga: '/assets/guias/bronquiolitis.pdf'
  },
  {
    id: 'g3',
    titulo: 'Intubación orotraqueal: checklist y técnica',
    area: 'Procedimientos',
    resumen: 'Checklist pre-intubación, secuencia rápida y manejo de complicaciones.',
    url: '/assets/guias/intubacion-checklist.pdf',
    descarga: '/assets/guias/intubacion-checklist.pdf'
  }
];

export default function GuiasClinica() {
  const [q, setQ] = useState('');
  const [area, setArea] = useState<'Todas' | Guia['area']>('Todas');

  const list = useMemo(() => {
    const term = q.trim().toLowerCase();
    return GUIAS.filter(g => area === 'Todas' || g.area === area)
      .filter(g => !term || g.titulo.toLowerCase().includes(term) || (g.resumen ?? '').toLowerCase().includes(term));
  }, [q, area]);

  return (
    <section className="guias">
      <header className="toolbar">
        <div className="search">
          <FiSearch />
          <input
            type="text"
            placeholder="Buscar guías clínicas…"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
        </div>
        <div className="chips">
          {(['Todas','Adulto','Pediátrico','Procedimientos'] as const).map(a => (
            <button key={a} className={`chip ${area === a ? 'active' : ''}`} onClick={() => setArea(a)}>
              {a}
            </button>
          ))}
        </div>
      </header>

      <ul className="list">
        {list.map(g => (
          <li key={g.id} className="row">
            <div className="icon"><FiFileText /></div>
            <div className="meta">
              <h3>{g.titulo}</h3>
              {g.resumen && <p>{g.resumen}</p>}
              <span className="tag">{g.area}</span>
            </div>
            <div className="actions">
              <a className="btn btn-primary" href={g.url} target="_blank" rel="noreferrer"><FiExternalLink /> Abrir</a>
              {g.descarga && <a className="btn btn-ghost" href={g.descarga} download><FiDownload /> Descargar</a>}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
