import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';
import { AuthProvider } from '../context/AuthContext'; // Mockeamos el contexto de autenticación

describe('TEST CASE 03 - Acceso al Simulador Respiratorio', () => {
  it('Navega al simulador después de login y renderiza el componente correcto', async () => {

    localStorage.setItem('token', 'jwt-token-123');

    render(
      <MemoryRouter initialEntries={['/dashboard']}>
        <AuthProvider>
          <App />
        </AuthProvider>
      </MemoryRouter>
    );

    // Buscar el botón/enlace de Simulador en el menú
    const btnSimulador = await screen.findByText(/Simulador/i);
    fireEvent.click(btnSimulador);

    // Verificar que se cargue la pantalla de simulador
    await screen.findByText(/Simulación del Sistema Respiratorio/i);

    console.log('Acceso al Simulador Respiratorio');
  });
});
