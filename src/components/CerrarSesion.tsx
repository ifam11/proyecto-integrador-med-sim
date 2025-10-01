import { useEffect } from 'react';

export default function CerrarSesion() {
  useEffect(() => {
    try {
      localStorage.removeItem('access_token');
      localStorage.removeItem('role');
      // limpia también cualquier otro dato sensible que uses:
      // localStorage.removeItem('refresh_token'); etc.
    } finally {
      window.location.href = '/login';
    }
  }, []);

  return (
    <section style={{ padding: '12px' }}>
      <p>Cerrando sesión…</p>
    </section>
  );
}
