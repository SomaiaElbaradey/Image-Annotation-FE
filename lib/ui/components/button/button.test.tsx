import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

import Button from './button';

describe('Button', () => {
    it('renders the button with the correct text', () => {
        render(<Button>Click me</Button>);
        expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument();
    });

    it('applies the correct class for primary variant', () => {
        render(<Button variant="primary">Primary Button</Button>);
        const button = screen.getByRole('button', { name: /primary button/i });
        expect(button).toHaveClass('bg-primary');
        expect(button).toHaveClass('text-white');
    });

    it('applies the correct class for secondary variant', () => {
        render(<Button variant="secondary">Secondary Button</Button>);
        const button = screen.getByRole('button', { name: /secondary button/i });
        expect(button).toHaveClass('bg-transparent');
        expect(button).toHaveClass('text-primary');
    });

    it('applies the correct class for tertiary variant', () => {
        render(<Button variant="tertiary">Tertiary Button</Button>);
        const button = screen.getByRole('button', { name: /tertiary button/i });
        expect(button).toHaveClass('bg-white');
        expect(button).toHaveClass('text-primary');
        expect(button).toHaveClass('border');
        expect(button).toHaveClass('border-primary');
    });

    it('renders leading icon when provided', () => {
        const LeadingIcon = () => <span data-testid="leading-icon">Icon</span>;
        render(<Button leadingIcon={<LeadingIcon />}>With Icon</Button>);
        expect(screen.getByTestId('leading-icon')).toBeInTheDocument();
    });

    it('renders trailing icon when provided', () => {
        const TrailingIcon = () => <span data-testid="trailing-icon">Icon</span>;
        render(<Button trailingIcon={<TrailingIcon />}>With Icon</Button>);
        expect(screen.getByTestId('trailing-icon')).toBeInTheDocument();
    });

    it('disables the button when disabled prop is true', () => {
        render(<Button disabled>Disabled Button</Button>);
        expect(screen.getByRole('button', { name: /disabled button/i })).toBeDisabled();
    });

    it('applies the correct class for different sizes', () => {
        const { rerender } = render(<Button size="large">Large Button</Button>);
        expect(screen.getByRole('button', { name: /large button/i })).toHaveClass('h-14');

        rerender(<Button size="medium">Medium Button</Button>);
        expect(screen.getByRole('button', { name: /medium button/i })).toHaveClass('h-12');

        rerender(<Button size="small">Small Button</Button>);
        expect(screen.getByRole('button', { name: /small button/i })).toHaveClass('h-10');

        rerender(<Button size="x_small">X-Small Button</Button>);
        expect(screen.getByRole('button', { name: /x-small button/i })).toHaveClass('h-8');
    });

    it('calls onClick handler when clicked', () => {
        const handleClick = jest.fn();
        render(<Button onClick={handleClick}>Click me</Button>);
        fireEvent.click(screen.getByRole('button', { name: /click me/i }));
        expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('does not call onClick handler when disabled', () => {
        const handleClick = jest.fn();
        render(<Button onClick={handleClick} disabled>Click me</Button>);
        fireEvent.click(screen.getByRole('button', { name: /click me/i }));
        expect(handleClick).not.toHaveBeenCalled();
    });

    it('applies custom className correctly', () => {
        render(<Button className="custom-class">Custom Button</Button>);
        expect(screen.getByRole('button', { name: /custom button/i })).toHaveClass('custom-class');
    });
});
