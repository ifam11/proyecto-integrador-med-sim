import { BrowserRouter, Routes, Route, Navigate, Outlet, useLocation } from 'react-router-dom';
import { useMemo } from 'react';
import './App.css';

// Layouts y componentes comunes
import Header from './components/Header';
import MenuBar from './components/MenuBar';
import Footer from './components/Footer';

// Páginas “estáticas” (las tuyas existentes en /components)
import Inicio from './components/Inicio';
import Recursos from './components/Recursos';
import GuiasClinica from './components/GuíasClinica';
import BancoLaminas from './components/BancoLaminas';
import CatalogoModelos from './components/CatalogoModelos';
import Tutoriales from './components/Tutoriales';
import PreguntasFrecuentes from './components/PreguntasFrecuentes';
import ReportarProblema from './components/ReportarProblema';
import Politica from './components/Politica';
import Terminos from './components/Terminos';
import IdiomaTema from './components/IdiomaTema';
import TemaClaroOscuro from './components/TemaClaroOscuro';
import CerrarSesion from './components/CerrarSesion';
import AcercaDe from './components/AcercaDe';
import Servicios from './components/Servicios';
import Contactos from './components/Contactos';
import Reservas from './components/Reservas';

// Páginas que interactúan con backend (en /pages)
import Login from './components/Login';
import Register from './components/Register';
import Cuestionarios from './components/Cuestionarios';
import ResolverCuestionario from './components/ResolverCuestionario';

// ---------------- Utils de Auth ----------------
type Rol = 'administrador' | 'docente' | 'estudiante';

function useAuth() {
  const token = localStorage.getItem('token') || '';
  const user = (() => {
    try { return JSON.parse(localStorage.getItem('user') || 'null'); } catch { return null; }
  })();
  const role: Rol | undefined = user?.rol;
  return { token, user, role };
}

function Protected({ roles }: { roles?: Rol[] }) {
  const { token, role } = useAuth();
  const loc = useLocation();

  if (!token) {
    return <Navigate to="/login" state={{ from: loc }} replace />;
  }
  if (roles && role && !roles.includes(role)) {
    // si no tiene el rol requerido
    return <Navigate to="/" replace />;
  }
  return <Outlet />;
}

// --------------- Layouts ----------------
function PublicLayout() {
  return (
    <div className="app-container">
      <Header />
      <div className="content-layout">
        {/* sin sidebar en login/registro */}
        <div className="main-content">
          <Outlet />
        </div>
      </div>
      <Footer />
    </div>
  );
}

function PrivateLayout() {
  const { role } = useAuth();
  // Mapear rol del backend a los esperados por tu MenuBar ('student'|'teacher'|'admin')
  const menuRole = useMemo(() => {
    if (role === 'administrador') return 'admin';
    if (role === 'docente') return 'teacher';
    return 'student';
  }, [role]);

  return (
    <div className="app-container">
      <Header />
      <div className="content-layout">
        <MenuBar userRole={menuRole as any} />
        <div className="main-content">
          <Outlet />
        </div>
      </div>
      <Footer />
    </div>
  );
}

// --------------- App ----------------
export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Rutas públicas (sin sidebar) */}
        <Route element={<PublicLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        {/* Rutas privadas (con sidebar) */}
        <Route element={<PrivateLayout />}>
          {/* Acceso básico: cualquier usuario autenticado */}
          <Route element={<Protected />}>
            {/* Home */}
            <Route index element={<Inicio />} />
            <Route path="/inicio" element={<Inicio />} />

            {/* Biblioteca (canónico) */}
            <Route path="/biblioteca/recursos" element={<Recursos />} />
            <Route path="/biblioteca/guias" element={<GuiasClinica />} />
            <Route path="/biblioteca/laminas" element={<BancoLaminas />} />
            <Route path="/biblioteca/modelos-3d" element={<CatalogoModelos />} />

            {/* Alias para compatibilidad con tus rutas antiguas */}
            <Route path="/recursos" element={<Recursos />} />
            <Route path="/guias" element={<GuiasClinica />} />
            <Route path="/laminas" element={<BancoLaminas />} />
            <Route path="/modelos-3d" element={<CatalogoModelos />} />

            {/* Ayuda / legal / ajustes */}
            <Route path="/tutoriales" element={<Tutoriales />} />
            <Route path="/preguntas-frecuentes" element={<PreguntasFrecuentes />} />
            <Route path="/reportar-problema" element={<ReportarProblema />} />
            <Route path="/politica" element={<Politica />} />
            <Route path="/terminos" element={<Terminos />} />
            <Route path="/idioma-tema" element={<IdiomaTema />} />
            <Route path="/tema-claro-oscuro" element={<TemaClaroOscuro />} />
            <Route path="/cerrar-sesion" element={<CerrarSesion />} />

            {/* Secciones informativas */}
            <Route path="/acerca-de" element={<AcercaDe />} />
            <Route path="/servicios" element={<Servicios />} />
            <Route path="/contactos" element={<Contactos />} />
            <Route path="/reservas" element={<Reservas />} />

            {/* Evaluaciones / Cuestionarios */}
            <Route path="/cuestionarios" element={<Cuestionarios />} />
            <Route path="/resolver-cuestionarios/:id" element={<ResolverCuestionario />} />
          </Route>

          {/* Ejemplo de rutas con restricción de rol (si lo necesitas) */}
          <Route element={<Protected roles={['docente', 'administrador']} />}>
            {/* aquí podrías poner /admin o /docente */}
            {/* <Route path="/admin/quizzes" element={<GestionQuizzes />} /> */}
          </Route>
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
