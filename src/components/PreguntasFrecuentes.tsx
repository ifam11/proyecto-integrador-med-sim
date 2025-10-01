import './PreguntasFrecuentes.css';
import { useMemo, useState } from 'react';
import { FiSearch, FiChevronDown } from 'react-icons/fi';

type FAQ = { id: string; pregunta: string; respuesta: string; tag: 'Cuenta' | 'Uso' | 'Técnico' };

const DATA: FAQ[] = [
  { id: 'f1', pregunta: '¿Necesito internet para usar el simulador?', respuesta: 'Sí, por ahora el simulador es web y requiere conexión.', tag: 'Uso' },
  { id: 'f2', pregunta: '¿Cómo restablezco mi contraseña?', respuesta: 'Ve a Iniciar Sesión → “¿Olvidaste tu contraseña?” y sigue los pasos.', tag: 'Cuenta' },
  { id: 'f3', pregunta: 'El video no carga, ¿qué hago?', respuesta: 'Prueba recargar la página, limpiar caché o usar otro navegador.', tag: 'Técnico' },
  { id: 'f4', pregunta: '¿Puedo usarlo desde el móvil?', respuesta: 'Sí, está adaptado a móvil. Para VR, se recomiendan visores compatibles.', tag: 'Uso' },
];

export default function PreguntasFrecuentes() {
  const [q, setQ] = useState('');
  const [tag, setTag] = useState<'Todas' | FAQ['tag']>('Todas');
  const [open, setOpen] = useState<string | null>(null);

  const list = useMemo(() => {
    const term = q.trim().toLowerCase();
    return DATA
      .filter(f => tag === 'Todas' || f.tag === tag)
      .filter(f => !term || f.pregunta.toLowerCase().includes(term) || f.respuesta.toLowerCase().includes(term));
  }, [q, tag]);

  return (
    <section className="faq">
      <header className="toolbar">
        <div className="search">
          <FiSearch />
          <input
            type="text"
            placeholder="Busca en las preguntas…"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
        </div>
        <div className="chips">
          {(['Todas','Cuenta','Uso','Técnico'] as const).map(t => (
            <button key={t} className={`chip ${tag === t ? 'active' : ''}`} onClick={() => setTag(t)}>
              {t}
            </button>
          ))}
        </div>
      </header>

      <div className="accordion" role="list">
        {list.map(f => {
          const isOpen = open === f.id;
          return (
            <div key={f.id} className={`item ${isOpen ? 'open' : ''}`} role="listitem">
              <button className="q" onClick={() => setOpen(isOpen ? null : f.id)} aria-expanded={isOpen}>
                <span>{f.pregunta}</span>
                <FiChevronDown className="chev" />
              </button>
              <div className="a" style={{ maxHeight: isOpen ? 200 : 0 }}>
                <p>{f.respuesta}</p>
                <span className="tag">{f.tag}</span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
