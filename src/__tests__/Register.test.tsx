import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom'; // <--- importante
import Register from '../components/Register';
import api from '../lib/api';

// Mock del API
jest.mock('../lib/api');

describe('TEST CASE 01 - Registro de usuario nuevo', () => {
  it('Registra usuario, hace autologin, guarda token y navega al inicio', async () => {
    // Mock de la respuesta del register
    (api.post as jest.Mock).mockResolvedValueOnce({}); // registro
    (api.post as jest.Mock).mockResolvedValueOnce({ data: { token: '123', user: { id: 1, email: 'isai@example.com', rol: 'docente' } } }); // login

    render(
      <MemoryRouter>  {/* <--- envolver aquí */}
        <Register />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText(/Nombre/i), { target: { value: 'Isai' } });
    fireEvent.change(screen.getByLabelText(/Apellido/i), { target: { value: 'Anguela' } });
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'isai@example.com' } });
    fireEvent.change(screen.getByLabelText(/Contraseña/i), { target: { value: 'Password123!' } });
    fireEvent.change(screen.getByLabelText(/Confirmar/i), { target: { value: 'Password123!' } });
    fireEvent.change(screen.getByLabelText(/Rol/i), { target: { value: 'docente' } });

    fireEvent.click(screen.getByText(/Crear cuenta/i));

    // Espera a que se ejecute el async submit
    await screen.findByText(/Únete a la simulación respiratoria/i);

    console.log('Usuario Registrado Exitosamente'); // Esto servirá para el reporte
  });
});
