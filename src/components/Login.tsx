import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../lib/api';
import './Auth.css';

type ApiLoginRes = {
  token: string;
  user: { id: number; email: string; nombre?: string; apellido?: string | null; rol: 'administrador' | 'docente' | 'estudiante' };
};

export default function Login() {
  const nav = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState('');

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErr('');
    setLoading(true);
    try {
      const { data } = await api.post<ApiLoginRes>('/auth/login', { email, password });
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      // puedes redirigir según rol
      nav('/');
    } catch (e: any) {
      setErr(e?.response?.data?.message || 'Error de inicio de sesión');
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="auth-wrap">
      <div className="auth-card">
        <h1 className="auth-title">Iniciar sesión</h1>
        <p className="auth-sub">Accede a tu cuenta MEVALTEC</p>

        <form className="auth-form" onSubmit={onSubmit}>
          <label className="field">
            <span>Email</span>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="correo@institucion.edu"
              required
            />
          </label>

          <label className="field">
            <span>Contraseña</span>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </label>

          {err && <div className="alert">{err}</div>}

          <button className="btn-primary" disabled={loading}>
            {loading ? 'Entrando…' : 'Entrar'}
          </button>
        </form>

        <div className="auth-alt">
          ¿No tienes cuenta? <Link to="/register">Crear cuenta</Link>
        </div>
      </div>
    </section>
  );
}
