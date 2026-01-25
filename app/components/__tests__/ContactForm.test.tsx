import { render, screen } from '@testing-library/react';
import ContactForm from '../ContactForm';

// Mock de useContactForm
jest.mock('../../hooks/useContactForm', () => ({
  useContactForm: () => ({
    formData: {
      name: '',
      email: '',
      message: '',
    },
    status: null,
    isLoading: false,
    handleChange: jest.fn(),
    handleSubmit: jest.fn((e) => e.preventDefault()),
  }),
}));

describe('ContactForm', () => {
  it('renderiza el formulario con todos los campos', () => {
    render(<ContactForm />);
    
    // Los campos usan placeholder, no label
    expect(screen.getByPlaceholderText(/nombre/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/mensaje/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /enviar mensaje/i })).toBeInTheDocument();
  });

  it('muestra el botón de envío correctamente', () => {
    render(<ContactForm />);
    
    const submitButton = screen.getByRole('button', { name: /enviar mensaje/i });
    expect(submitButton).toHaveClass('border-2', 'font-bold');
    expect(submitButton.className).toMatch(/border-light-text/);
  });

  it('todos los campos son obligatorios', () => {
    render(<ContactForm />);
    
    const nameInput = screen.getByPlaceholderText(/nombre/i);
    const emailInput = screen.getByPlaceholderText(/email/i);
    const messageInput = screen.getByPlaceholderText(/mensaje/i);
    
    expect(nameInput).toBeRequired();
    expect(emailInput).toBeRequired();
    expect(messageInput).toBeRequired();
  });

  it('el campo email tiene el tipo correcto', () => {
    render(<ContactForm />);
    
    const emailInput = screen.getByPlaceholderText(/email/i);
    expect(emailInput).toHaveAttribute('type', 'email');
  });
});
