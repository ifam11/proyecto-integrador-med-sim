import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Login from '../components/Login';
import api from '../lib/api';

// Mock del API
jest.mock('../lib/api');

describe('TEST CASE 02 - Inicio de sesión válido', () => {
  it('Hace login, guarda token en localStorage y redirige al dashboard', async () => {
    // Mock de la respuesta del backend
    (api.post as jest.Mock).mockResolvedValueOnce({
      data: { token: 'jwt-token-123', user: { id: 1, email: 'isai@example.com', rol: 'docente' } },
    });

    // Mock de localStorage
    const setItemSpy = jest.spyOn(window.localStorage.__proto__, 'setItem');
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'isai@example.com' } });
    fireEvent.change(screen.getByLabelText(/Contraseña/i), { target: { value: 'Password123!' } });

    fireEvent.click(screen.getByText(/Iniciar sesión/i));

    // Espera a que aparezca el dashboard o mensaje de éxito
    await screen.findByText(/Bienvenido/i);

    expect(setItemSpy).toHaveBeenCalledWith('token', 'jwt-token-123');
    console.log('Login exitoso - Token guardado en localStorage');
  });
});
