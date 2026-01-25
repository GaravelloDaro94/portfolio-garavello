import { render, screen } from '@testing-library/react';
import TypewriterTitle from '../animations/TypewriterTitle';

describe('TypewriterTitle', () => {
  it('renderiza el título correctamente', () => {
    render(<TypewriterTitle text="Hola Mundo" />);
    
    const heading = screen.getByRole('heading');
    expect(heading).toBeInTheDocument();
  });

  it('aplica las clases CSS personalizadas', () => {
    const customClass = 'custom-title-class';
    render(<TypewriterTitle text="Test" className={customClass} />);
    
    const heading = screen.getByRole('heading');
    expect(heading).toHaveClass(customClass);
  });

  it('muestra la estructura correcta con el span interno', () => {
    render(<TypewriterTitle text="Test" />);
    
    const heading = screen.getByRole('heading');
    const innerSpan = heading.querySelector('.inline-flex');
    expect(innerSpan).toBeInTheDocument();
  });
});
