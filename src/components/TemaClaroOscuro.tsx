import './TemaClaroOscuro.css';
import { useEffect, useState } from 'react';

const KEY = 'mevaltec:theme';

export default function TemaClaroOscuro() {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => (localStorage.getItem(KEY) as 'light'|'dark') || 'light');

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem(KEY, theme);
  }, [theme]);

  return (
    <section className="tema">
      <div className="card">
        <h2>Tema claro / oscuro</h2>
        <p>El tema se aplica a toda la plataforma y queda guardado en tu navegador.</p>

        <div className="switcher">
          <span>Claro</span>
          <label className="switch">
            <input
              type="checkbox"
              checked={theme === 'dark'}
              onChange={(e) => setTheme(e.target.checked ? 'dark' : 'light')}
            />
            <span className="track" />
          </label>
          <span>Oscuro</span>
        </div>

        <div className="preview">
          <div className="tile" />
          <div className="tile" />
          <div className="tile" />
        </div>
      </div>
    </section>
  );
}
