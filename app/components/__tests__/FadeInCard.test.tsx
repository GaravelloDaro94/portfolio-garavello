import { render, screen } from '@testing-library/react';
import FadeInCard from '../animations/FadeInCard';

describe('FadeInCard', () => {
  it('renderiza el contenido hijo correctamente', () => {
    render(
      <FadeInCard>
        <div>Contenido de prueba</div>
      </FadeInCard>
    );
    
    expect(screen.getByText('Contenido de prueba')).toBeInTheDocument();
  });

  it('aplica las clases de animación', () => {
    const { container } = render(
      <FadeInCard>
        <div>Test</div>
      </FadeInCard>
    );
    
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper).toHaveClass('transition-all', 'duration-700', 'ease-out');
  });

  it('aplica clases personalizadas', () => {
    const { container } = render(
      <FadeInCard className="custom-class">
        <div>Test</div>
      </FadeInCard>
    );
    
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper).toHaveClass('custom-class');
  });

  it('aplica el delay correctamente', () => {
    const delay = 500;
    const { container } = render(
      <FadeInCard delay={delay}>
        <div>Test</div>
      </FadeInCard>
    );
    
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper).toHaveStyle(`transition-delay: ${delay}ms`);
  });
});
