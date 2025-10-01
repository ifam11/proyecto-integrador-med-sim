import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../lib/api';
import './Auth.css';

type Rol = 'estudiante' | 'docente' | 'administrador';

export default function Register() {
  const nav = useNavigate();
  const [form, setForm] = useState({
    nombre: '',
    apellido: '',
    email: '',
    password: '',
    confirm: '',
    rol: 'estudiante' as Rol
  });
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState('');

  const canSubmit = form.nombre && form.email && form.password.length >= 8 && form.password === form.confirm;

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErr('');
    if (!canSubmit) return;
    setLoading(true);
    try {
      await api.post('/auth/register', {
        nombre: form.nombre,
        apellido: form.apellido || null,
        email: form.email,
        password: form.password,
        rol: form.rol
      });
      // Autologin
      const { data } = await api.post<{ token: string; user: any }>('/auth/login', {
        email: form.email, password: form.password
      });
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      nav('/');
    } catch (e: any) {
      setErr(e?.response?.data?.message || 'No se pudo registrar');
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="auth-wrap">
      <div className="auth-card">
        <h1 className="auth-title">Crear cuenta</h1>
        <p className="auth-sub">Únete a la simulación respiratoria</p>

        <form className="auth-form" onSubmit={onSubmit}>
          <div className="grid-two">
            <label className="field">
              <span>Nombre</span>
              <input value={form.nombre} onChange={e=>setForm({...form,nombre:e.target.value})} required />
            </label>
            <label className="field">
              <span>Apellido</span>
              <input value={form.apellido} onChange={e=>setForm({...form,apellido:e.target.value})} />
            </label>
          </div>

          <label className="field">
            <span>Email</span>
            <input type="email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} required />
          </label>

          <div className="grid-two">
            <label className="field">
              <span>Contraseña</span>
              <input type="password" value={form.password} onChange={e=>setForm({...form,password:e.target.value})} placeholder="Mínimo 8 caracteres" required />
            </label>
            <label className="field">
              <span>Confirmar</span>
              <input type="password" value={form.confirm} onChange={e=>setForm({...form,confirm:e.target.value})} required />
            </label>
          </div>

          <label className="field">
            <span>Rol</span>
            <select value={form.rol} onChange={e=>setForm({...form,rol: e.target.value as Rol})}>
              <option value="estudiante">Estudiante</option>
              <option value="docente">Docente</option>
              <option value="administrador">Administrador</option>
            </select>
          </label>

          {form.password && form.password.length < 8 && <div className="hint">La contraseña debe tener al menos 8 caracteres.</div>}
          {form.confirm && form.password !== form.confirm && <div className="hint">Las contraseñas no coinciden.</div>}
          {err && <div className="alert">{err}</div>}

          <button className="btn-primary" disabled={!canSubmit || loading}>
            {loading ? 'Creando…' : 'Crear cuenta'}
          </button>
        </form>

        <div className="auth-alt">
          ¿Ya tienes cuenta? <Link to="/login">Entrar</Link>
        </div>
      </div>
    </section>
  );
}
