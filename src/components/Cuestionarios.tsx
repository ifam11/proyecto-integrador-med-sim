import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../lib/api';
import './Cuestionarios.css';

type Quiz = {
  id: number;
  title: string;
  scope: 'anatomia' | 'histologia' | 'mixto';
  is_published?: number | boolean;
  created_at?: string;
};

export default function Cuestionarios() {
  const [data, setData] = useState<Quiz[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await api.get<Quiz[]>('/quizzes');
        setData(data);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <div className="q-wrap"><div className="q-loading">Cargando cuestionarios…</div></div>;

  return (
    <section className="q-wrap">
      <header className="q-head">
        <h2>Cuestionarios disponibles</h2>
        <p>Selecciona un cuestionario para comenzar un intento.</p>
      </header>

      <div className="q-grid">
        {data.map(q => (
          <article key={q.id} className="q-card">
            <div className={`chip ${q.scope}`}>{q.scope}</div>
            <h3>{q.title}</h3>
            <p className="muted">{q.is_published ? 'Publicado' : 'Borrador'} · {q.created_at?.slice(0,10) ?? ''}</p>
            <div className="actions">
              <Link to={`/resolver-cuestionarios/${q.id}`} className="btn-go">Iniciar intento</Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
