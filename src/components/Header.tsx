import './Header.css';
import LogoH from '../assets/LogoH.avif';
import { FiBell, FiUser, FiSun, FiMoon } from 'react-icons/fi';
import { useEffect, useState } from 'react';

const Header = () => {
  // Toggle opcional de tema (claro/oscuro). Si no lo usarás, puedes quitarlo.
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <header className="header" role="banner">
      <div className="header-content">
        <div className="brand">
          <img src={LogoH} alt="Logo MEVALTEC" className="logo" />
          <h1 className="title">MEVALTEC</h1>
          <span className="divider" aria-hidden="true" />
          <p className="subtitle">Simulación Respiratoria</p>
        </div>

        <nav className="header-actions" aria-label="Acciones de cabecera">
          <button
            className="icon-btn"
            aria-label="Cambiar tema"
            title="Cambiar tema"
            onClick={() => setTheme(t => (t === 'light' ? 'dark' : 'light'))}
          >
            {theme === 'light' ? <FiSun /> : <FiMoon />}
          </button>

          <button className="icon-btn" aria-label="Notificaciones" title="Notificaciones">
            <FiBell />
            {/* Si quieres mostrar un contador:
            <span className="badge">3</span> */}
          </button>

          <button className="icon-btn" aria-label="Perfil" title="Perfil">
            <FiUser />
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
