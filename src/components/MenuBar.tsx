// src/components/MenuBar.tsx
import React, { useEffect, useMemo, useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  FiHome, FiCpu, FiLayers, FiUser, FiUsers, FiBookOpen, FiMessageSquare,
  FiAward, FiTrendingUp, FiBell, FiTool, FiHelpCircle, FiShield, FiSettings,
  FiLogOut, FiFolder, FiCheckSquare, FiFileText, FiBox ,
  FiGlobe, FiEye, FiDatabase, FiSearch, FiMenu, FiChevronDown, FiChevronRight
} from 'react-icons/fi'
import { FaCodeBranch } from 'react-icons/fa';

import './MenuBar.css';

type UserRole = 'student' | 'teacher' | 'admin';

type Badges = {
  notificaciones: number;
  evaluacionesPendientes: number;
  mensajes: number;
  tareas: number;
};

export type MenuBarProps = {
  userRole?: UserRole;
  badges?: Partial<Badges>;
};

type MenuItem = {
  label: string;
  to: string;
  icon?: React.ReactNode;
  roles?: UserRole[];
  badgeCountProp?: keyof Badges;
  title?: string;
};

type MenuSection = {
  key: string;
  title: string;
  icon: React.ReactNode;
  roles?: UserRole[];
  items: MenuItem[];
};

const MenuBar = ({
  userRole = 'student',
  badges = {}
}: MenuBarProps) => {
  const [query, setQuery] = useState('');
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({});
  const [collapsed, setCollapsed] = useState(false);

  // Persistencia
  useEffect(() => {
    try {
      const savedOpen = localStorage.getItem('mevaltec:menubar:open');
      if (savedOpen) setOpenSections(JSON.parse(savedOpen));
      const savedCollapsed = localStorage.getItem('mevaltec:menubar:collapsed');
      if (savedCollapsed) setCollapsed(savedCollapsed === '1');
    } catch {}
  }, []);
  useEffect(() => {
    try { localStorage.setItem('mevaltec:menubar:open', JSON.stringify(openSections)); } catch {}
  }, [openSections]);
  useEffect(() => {
    try { localStorage.setItem('mevaltec:menubar:collapsed', collapsed ? '1' : '0'); } catch {}
  }, [collapsed]);

  const toggleSection = (key: string) =>
    setOpenSections((s) => ({ ...s, [key]: !s[key] }));

  const hasAccess = (roles?: UserRole[]) =>
    !roles || roles.includes(userRole);

  const sections = useMemo<MenuSection[]>(
    () => [
      {
        key: 'Inicio',
        title: 'Dashboard',
        icon: <FiHome />,
        items: [{ label: 'Inicio', to: '/Inicio', icon: <FiHome />, title: 'Ir al dashboard' }],
      },
      {
        key: 'simulador',
        title: 'Simulador',
        icon: <FiCpu />,
        items: [
          { label: 'Servicios', to: '/servicios', icon: <FiCpu />, title: 'Módulos del simulador' },
        ],
      },
      {
        key: 'evaluaciones',
        title: 'Evaluaciones',
        icon: <FiCheckSquare />,
        items: [
          { label: 'Cuestionarios', to: '/cuestionarios', icon: <FiCheckSquare />, badgeCountProp: 'evaluacionesPendientes', title: 'Cuestionarios y pruebas' },
        ],
      },
      {
        key: 'biblioteca',
        title: 'Biblioteca',
        icon: <FiBookOpen />,
        items: [
          { label: 'Recursos (PDF/Video/3D)', to: '/recursos', icon: <FiFolder />, title: 'Materiales de estudio' },
          { label: 'Guías clínicas (Resp.)', to: '/guias', icon: <FiFileText />, title: 'Guías clínicas respiratorias' },
          { label: 'Banco de láminas histológicas', to: '/laminas', icon: <FiLayers />, title: 'Láminas histológicas' },
          { label: 'Catálogo de modelos 3D', to: '/modelos-3d', icon: <FiBox />, title: 'Modelos 3D' },
        ],
      },
      {
        key: 'colaboracion',
        title: 'Colaboración',
        icon: <FiMessageSquare />,
        items: [
          { label: 'Foros por tema', to: '/colaboracion/foros', icon: <FiMessageSquare />, title: 'Foros de discusión' },
          { label: 'Salas de práctica grupal', to: '/colaboracion/salas', icon: <FiUsers />, title: 'Prácticas grupales' },
          { label: 'Mensajería', to: '/colaboracion/mensajeria', icon: <FiMessageSquare />, badgeCountProp: 'mensajes', title: 'Mensajes' },
        ],
      },
      {
        key: 'gamificacion',
        title: 'Gamificación',
        icon: <FiAward />,
        items: [
          { label: 'Retos y misiones', to: '/gamificacion/retos', icon: <FiAward />, title: 'Retos' },
          { label: 'Insignias', to: '/gamificacion/insignias', icon: <FiAward />, title: 'Insignias' },
          { label: 'Ranking', to: '/gamificacion/ranking', icon: <FiTrendingUp />, title: 'Ranking' },
        ],
      },
      {
        key: 'reportes',
        title: 'Reportes & Analítica',
        icon: <FiTrendingUp />,
        items: [
          { label: 'Progreso individual', to: '/reportes/progreso', icon: <FiTrendingUp />, title: 'Progreso' },
          { label: 'Competencias logradas', to: '/reportes/competencias', icon: <FiTrendingUp />, title: 'Competencias' },
          { label: 'Uso de la plataforma', to: '/reportes/uso', icon: <FiDatabase />, title: 'Métricas de uso' },
        ],
      },
      {
        key: 'administracion',
        title: 'Administración',
        icon: <FiTool />,
        roles: ['teacher', 'admin'],
        items: [
          { label: 'Gestión de usuarios', to: '/admin/usuarios', icon: <FiUsers />, title: 'Usuarios' },
          { label: 'Gestión de contenidos', to: '/admin/contenidos', icon: <FiFolder />, title: 'Contenidos' },
          { label: 'Escenarios clínicos', to: '/admin/escenarios', icon: <FiUser />, title: 'Escenarios clínicos' },
          { label: 'Pacientes virtuales', to: '/admin/pacientes-virtuales', icon: <FiUser />, title: 'Pacientes virtuales' },
          { label: 'Banco de preguntas', to: '/admin/banco-preguntas', icon: <FiFileText />, title: 'Banco de preguntas' },
          { label: 'Parámetros de simulación', to: '/admin/parametros', icon: <FiSettings />, title: 'Parámetros' },
          { label: 'Integraciones (LMS/API)', to: '/admin/integraciones', icon: <FiGlobe />, title: 'Integraciones' },
          { label: 'Versionado de contenidos', to: '/admin/versionado', icon: <FaCodeBranch  />, title: 'Versionado' },
        ],
      },
      {
        key: 'notificaciones',
        title: 'Notificaciones',
        icon: <FiBell />,
        items: [
          { label: 'Centro de notificaciones', to: '/notificaciones', icon: <FiBell />, badgeCountProp: 'notificaciones', title: 'Notificaciones' },
        ],
      },
      {
        key: 'ayuda',
        title: 'Ayuda',
        icon: <FiHelpCircle />,
        items: [
          { label: 'Tutoriales', to: '/tutoriales', icon: <FiHelpCircle />, title: 'Tutoriales' },
          { label: 'Preguntas frecuentes', to: '/preguntas-frecuentes', icon: <FiHelpCircle />, title: 'FAQ' },
          { label: 'Reportar un problema', to: '/reportar-problema', icon: <FiShield />, title: 'Reportar problema' },
        ],
      },
      {
        key: 'legal',
        title: 'Legal',
        icon: <FiShield />,
        items: [
          { label: 'Política de Privacidad', to: '/politica', icon: <FiShield />, title: 'Privacidad' },
          { label: 'Términos y Condiciones', to: '/terminos', icon: <FiFileText />, title: 'Términos' },
        ],
      },
      {
        key: 'configuracion',
        title: 'Configuración',
        icon: <FiSettings />,
        items: [
          { label: 'Configurar perfil', to: '/configuracion/perfil', icon: <FiUser />, title: 'Perfil' },
          { label: 'Preferencias', to: '/configuracion/preferencias', icon: <FiSettings />, title: 'Preferencias' },
          { label: 'Accesibilidad', to: '/configuracion/accesibilidad', icon: <FiEye />, title: 'Accesibilidad' },
          { label: 'Seguridad (Contraseña/MFA)', to: '/configuracion/seguridad', icon: <FiShield />, title: 'Seguridad' },
          { label: 'Dispositivos', to: '/configuracion/dispositivos', icon: <FiGlobe />, title: 'Dispositivos' },
          { label: 'Idioma y Tema', to: '/idioma-tema', icon: <FiGlobe />, title: 'Idioma y tema' },
          { label: 'Tema claro/oscuro', to: '/tema-claro-oscuro', icon: <FiSettings />, title: 'Tema' },
        ],
      },
      {
        key: 'salir',
        title: 'Salir',
        icon: <FiLogOut />,
        items: [{ label: 'Cerrar sesión', to: '/cerrar-sesion', icon: <FiLogOut />, title: 'Cerrar sesión' }],
      },
    ],
    [userRole]
  );

  const filteredSections = useMemo(() => {
    const q = query.trim().toLowerCase();
    return sections
      .filter((sec) => hasAccess(sec.roles))
      .map((sec) => ({
        ...sec,
        items: sec.items
          .filter((it) => hasAccess(it.roles))
          .filter((it) =>
            !q ||
            it.label.toLowerCase().includes(q) ||
            sec.title.toLowerCase().includes(q)
          ),
      }))
      .filter((sec) => sec.items.length > 0);
  }, [sections, query]);

  return (
    <aside className={`menu-bar ${collapsed ? 'is-collapsed' : ''}`} role="navigation" aria-label="Menú lateral">
      <div className="menu-header">
        <button
          className="menu-toggle"
          onClick={() => setCollapsed(v => !v)}
          aria-pressed={collapsed}
          aria-label={collapsed ? 'Expandir menú' : 'Colapsar menú'}
          title={collapsed ? 'Expandir menú' : 'Colapsar menú'}
        >
          {collapsed ? <FiChevronRight /> : <FiMenu />}
          <span className="toggle-text">{collapsed ? '' : 'Ocultar menú'}</span>
        </button>

        <div className="menu-brand">
          <span className="brand-dot" aria-hidden="true" />
          <span className="brand-text">Respiratorio</span>
        </div>

        <div className="menu-search">
          <FiSearch className="search-icon" aria-hidden="true" />
          <input
            type="text"
            placeholder="Buscar..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Buscar en el menú"
          />
        </div>
      </div>

      <nav className="menu-sections" aria-label="Navegación principal">
        {filteredSections.map((section) => {
          const isOpen = query ? true : (openSections[section.key] ?? true);
          return (
            <div className="menu-section" data-section={section.key} key={section.key}>
              <button
                className="section-title"
                onClick={() => toggleSection(section.key)}
                aria-expanded={isOpen}
                aria-controls={`section-${section.key}`}
              >
                <span className="icon">{section.icon}</span>
                <span className="title-text">{section.title}</span>
                <FiChevronDown className={`chev ${isOpen ? 'open' : ''}`} aria-hidden="true" />
              </button>

              <ul
                id={`section-${section.key}`}
                className={`section-items ${isOpen ? 'open' : ''}`}
              >
                {section.items.map((item) => {
                  const count = item.badgeCountProp ? badges[item.badgeCountProp] : undefined;
                  return (
                    <li key={item.to}>
                      <NavLink
                        to={item.to}
                        title={item.title || item.label}
                        className={({ isActive }: { isActive: boolean }) =>
                          `menu-link ${isActive ? 'active' : ''}`
                        }
                      >
                        {item.icon && <span className="icon">{item.icon}</span>}
                        <span className="label">{item.label}</span>
                        {typeof count === 'number' && count > 0 && (
                          <span className="badge" aria-label={`${count} nuevos`}>
                            {count > 99 ? '99+' : count}
                          </span>
                        )}
                      </NavLink>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </nav>
    </aside>
  );
};

export default MenuBar;
