import './ReportarProblema.css';
import { useEffect, useState } from 'react';
import { FiAlertTriangle, FiSend, FiCheckCircle, FiXCircle } from 'react-icons/fi';

type FormData = {
  nombre: string;
  email: string;
  categoria: 'Bug' | 'Contenido' | 'Cuenta' | 'Sugerencia';
  prioridad: 'Baja' | 'Media' | 'Alta';
  descripcion: string;
};

const EMPTY: FormData = {
  nombre: '',
  email: '',
  categoria: 'Bug',
  prioridad: 'Media',
  descripcion: ''
};

export default function ReportarProblema() {
  const [data, setData] = useState<FormData>(EMPTY);
  const [status, setStatus] = useState<'idle' | 'ok' | 'err'>('idle');
  const [msg, setMsg] = useState('');

  useEffect(() => {
    const t = setTimeout(() => setMsg(''), 3500);
    return () => clearTimeout(t);
  }, [msg]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('idle');
    setMsg('');

    if (!data.nombre || !data.email || !data.descripcion) {
      setStatus('err');
      setMsg('Completa nombre, email y descripción.');
      return;
    }

    try {
      // Ajusta la URL cuando tengas backend:
      const res = await fetch('/api/soporte/reportes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      if (!res.ok) throw new Error('No se pudo enviar. Guardado local.');

      setStatus('ok');
      setMsg('¡Reporte enviado! Gracias por tu ayuda.');
      setData(EMPTY);
    } catch {
      // Fallback: guardar en localStorage para enviar luego
      const key = 'mevaltec:reportes:pendientes';
      const prev = JSON.parse(localStorage.getItem(key) || '[]');
      prev.push({ ...data, fecha: new Date().toISOString() });
      localStorage.setItem(key, JSON.stringify(prev));

      setStatus('err');
      setMsg('No hay conexión con el servidor. Guardado local para reenviar.');
    }
  }

  return (
    <section className="reportar">
      <header className="head">
        <div className="icon"><FiAlertTriangle /></div>
        <div>
          <h2>Reportar un problema</h2>
          <p>Cuéntanos qué ocurrió. Si no hay backend activo, el reporte quedará guardado localmente para reenviar más tarde.</p>
        </div>
      </header>

      {msg && (
        <div className={`alert ${status === 'ok' ? 'ok' : 'err'}`}>
          {status === 'ok' ? <FiCheckCircle /> : <FiXCircle />}
          <span>{msg}</span>
        </div>
      )}

      <form className="form" onSubmit={submit}>
        <div className="grid">
          <label>
            <span>Nombre *</span>
            <input
              value={data.nombre}
              onChange={e => setData({ ...data, nombre: e.target.value })}
              placeholder="Tu nombre"
            />
          </label>

          <label>
            <span>Email *</span>
            <input
              type="email"
              value={data.email}
              onChange={e => setData({ ...data, email: e.target.value })}
              placeholder="tucorreo@ejemplo.com"
            />
          </label>

          <label>
            <span>Categoría</span>
            <select
              value={data.categoria}
              onChange={e => setData({ ...data, categoria: e.target.value as FormData['categoria'] })}
            >
              <option>Bug</option>
              <option>Contenido</option>
              <option>Cuenta</option>
              <option>Sugerencia</option>
            </select>
          </label>

          <label>
            <span>Prioridad</span>
            <select
              value={data.prioridad}
              onChange={e => setData({ ...data, prioridad: e.target.value as FormData['prioridad'] })}
            >
              <option>Baja</option>
              <option>Media</option>
              <option>Alta</option>
            </select>
          </label>
        </div>

        <label className="area">
          <span>Descripción *</span>
          <textarea
            rows={6}
            value={data.descripcion}
            onChange={e => setData({ ...data, descripcion: e.target.value })}
            placeholder="Explica qué estabas haciendo, qué esperabas que suceda y qué ocurrió."
          />
        </label>

        <div className="actions">
          <button className="btn btn-primary" type="submit">
            <FiSend /> Enviar
          </button>
        </div>
      </form>
    </section>
  );
}
