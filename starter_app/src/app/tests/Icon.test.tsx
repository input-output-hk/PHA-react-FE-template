import { render, screen } from '@testing-library/react';
import Icon from '../components/Icon';

// Mock SVG component for testing
const MockSvg = (props: React.SVGProps<SVGSVGElement>) => (
  <svg data-testid="mock-svg" {...props}>
    <path d="M0 0h24v24H0z" />
  </svg>
);

describe('Icon', () => {
  it('renders an icon', () => {
    render(<Icon svg={<MockSvg />} />);
    
    expect(screen.getByTestId('mock-svg')).toBeInTheDocument();
  });

  it('uses small size and onSurface color by default', () => {
    render(<Icon svg={<MockSvg />} />);
    const svg = screen.getByTestId('mock-svg');
    
    expect(svg).toHaveClass('w-[24px]', 'h-[24px]');
    expect(svg).toHaveClass('text-onSurface');
  });

  it('uses fill mode by default', () => {
    render(<Icon svg={<MockSvg />} />);
    const svg = screen.getByTestId('mock-svg');
    
    expect(svg).toHaveAttribute('fill', 'currentColor');
    expect(svg).toHaveAttribute('stroke', 'none');
  });

  describe('sizes', () => {
    it('renders xsmall icons (16px)', () => {
      render(<Icon svg={<MockSvg />} size="xsmall" />);
      
      expect(screen.getByTestId('mock-svg')).toHaveClass('w-[16px]', 'h-[16px]');
    });

    it('renders small icons (24px)', () => {
      render(<Icon svg={<MockSvg />} size="small" />);
      
      expect(screen.getByTestId('mock-svg')).toHaveClass('w-[24px]', 'h-[24px]');
    });

    it('renders medium icons (32px)', () => {
      render(<Icon svg={<MockSvg />} size="medium" />);
      
      expect(screen.getByTestId('mock-svg')).toHaveClass('w-[32px]', 'h-[32px]');
    });

    it('renders large icons (40px)', () => {
      render(<Icon svg={<MockSvg />} size="large" />);
      
      expect(screen.getByTestId('mock-svg')).toHaveClass('w-[40px]', 'h-[40px]');
    });
  });

  describe('colors', () => {
    it('applies primary color', () => {
      render(<Icon svg={<MockSvg />} color="primary" />);
      
      expect(screen.getByTestId('mock-svg')).toHaveClass('text-primary');
    });

    it('applies secondary color', () => {
      render(<Icon svg={<MockSvg />} color="secondary" />);
      
      expect(screen.getByTestId('mock-svg')).toHaveClass('text-secondary');
    });

    it('applies error color', () => {
      render(<Icon svg={<MockSvg />} color="error" />);
      
      expect(screen.getByTestId('mock-svg')).toHaveClass('text-error');
    });

    it('applies success color', () => {
      render(<Icon svg={<MockSvg />} color="success" />);
      
      expect(screen.getByTestId('mock-svg')).toHaveClass('text-success');
    });
  });

  describe('rendering modes', () => {
    it('renders fill mode icons', () => {
      render(<Icon svg={<MockSvg />} mode="fill" />);
      const svg = screen.getByTestId('mock-svg');
      
      expect(svg).toHaveAttribute('fill', 'currentColor');
      expect(svg).toHaveAttribute('stroke', 'none');
    });

    it('renders stroke mode icons', () => {
      render(<Icon svg={<MockSvg />} mode="stroke" />);
      const svg = screen.getByTestId('mock-svg');
      
      expect(svg).toHaveAttribute('fill', 'none');
      expect(svg).toHaveAttribute('stroke', 'currentColor');
    });

    it('renders both fill and stroke', () => {
      render(<Icon svg={<MockSvg />} mode="both" />);
      const svg = screen.getByTestId('mock-svg');
      
      expect(svg).toHaveAttribute('fill', 'currentColor');
      expect(svg).toHaveAttribute('stroke', 'currentColor');
    });
  });

  describe('stroke width', () => {
    it('uses 2px stroke width by default', () => {
      render(<Icon svg={<MockSvg />} />);
      const svg = screen.getByTestId('mock-svg');
      
      // SVG uses stroke-width (kebab-case) in the DOM
      expect(svg).toHaveAttribute('stroke-width', '2');
    });

    it('applies custom stroke width', () => {
      render(<Icon svg={<MockSvg />} strokeWidth={4} />);
      const svg = screen.getByTestId('mock-svg');
      
      expect(svg).toHaveAttribute('stroke-width', '4');
    });
  });

  describe('accessibility', () => {
    it('hides decorative icons from screen readers', () => {
      render(<Icon svg={<MockSvg />} decorative />);
      const svg = screen.getByTestId('mock-svg');
      
      expect(svg).toHaveAttribute('aria-hidden', 'true');
      expect(svg).toHaveAttribute('focusable', 'false');
    });

    it('adds role="img" to meaningful icons', () => {
      render(<Icon svg={<MockSvg />} />);
      
      expect(screen.getByTestId('mock-svg')).toHaveAttribute('role', 'img');
    });

    it('adds aria-label when label prop is provided', () => {
      render(<Icon svg={<MockSvg />} label="Home" />);
      
      expect(screen.getByTestId('mock-svg')).toHaveAttribute('aria-label', 'Home');
    });

    it('does not add aria-label when label is missing', () => {
      render(<Icon svg={<MockSvg />} />);
      
      expect(screen.getByTestId('mock-svg')).not.toHaveAttribute('aria-label');
    });

    it('makes icons non-focusable', () => {
      render(<Icon svg={<MockSvg />} />);
      
      expect(screen.getByTestId('mock-svg')).toHaveAttribute('focusable', 'false');
    });

    it('ignores label prop when decorative is true', () => {
      render(<Icon svg={<MockSvg />} decorative label="Home" />);
      const svg = screen.getByTestId('mock-svg');
      
      expect(svg).toHaveAttribute('aria-hidden', 'true');
      expect(svg).not.toHaveAttribute('aria-label');
      expect(svg).not.toHaveAttribute('role', 'img');
    });
  });

  describe('SVG children', () => {
    it('preserves original SVG children', () => {
      const SvgWithChildren = (
        <svg data-testid="custom-svg">
          <path d="M12 2L2 7v10" />
          <circle cx="12" cy="12" r="10" />
        </svg>
      );

      render(<Icon svg={SvgWithChildren} />);
      const svg = screen.getByTestId('custom-svg');
      
      expect(svg.querySelector('path')).toBeInTheDocument();
      expect(svg.querySelector('circle')).toBeInTheDocument();
    });
  });

  describe('combining props', () => {
    it('works with multiple props together', () => {
      render(
        <Icon 
          svg={<MockSvg />} 
          size="large" 
          color="primary" 
          mode="both"
          strokeWidth={3}
        />
      );
      const svg = screen.getByTestId('mock-svg');
      
      expect(svg).toHaveClass('w-[40px]', 'h-[40px]', 'text-primary');
      expect(svg).toHaveAttribute('fill', 'currentColor');
      expect(svg).toHaveAttribute('stroke', 'currentColor');
      expect(svg).toHaveAttribute('stroke-width', '3');
    });

    it('combines styling with accessibility props', () => {
      render(
        <Icon 
          svg={<MockSvg />} 
          size="medium"
          color="error"
          label="Error"
        />
      );
      const svg = screen.getByTestId('mock-svg');
      
      expect(svg).toHaveClass('w-[32px]', 'h-[32px]', 'text-error');
      expect(svg).toHaveAttribute('aria-label', 'Error');
    });
  });

  describe('real-world usage', () => {
    it('works as a decorative icon in a button with text', () => {
      render(
        <button>
          <Icon svg={<MockSvg />} decorative />
          Delete
        </button>
      );
      
      expect(screen.getByTestId('mock-svg')).toHaveAttribute('aria-hidden', 'true');
      expect(screen.getByText('Delete')).toBeInTheDocument();
    });

    it('works as a meaningful icon in a button without text', () => {
      render(
        <button aria-label="Delete">
          <Icon svg={<MockSvg />} label="Delete" color="error" />
        </button>
      );
      const svg = screen.getByTestId('mock-svg');
      
      expect(svg).toHaveAttribute('aria-label', 'Delete');
      expect(svg).toHaveClass('text-error');
    });

    it('works with Heroicons outline icons', () => {
      const HeroIcon = (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          data-testid="hero-icon"
        >
          <path strokeLinecap="round" d="M12 2L2 7v10" />
        </svg>
      );

      render(<Icon svg={HeroIcon} mode="stroke" color="primary" />);
      const svg = screen.getByTestId('hero-icon');
      
      expect(svg).toHaveClass('text-primary');
      expect(svg).toHaveAttribute('stroke', 'currentColor');
    });
  });

  it('always includes base classes', () => {
    render(<Icon svg={<MockSvg />} />);
    
    expect(screen.getByTestId('mock-svg')).toHaveClass('inline-block', 'overflow-visible');
  });
});