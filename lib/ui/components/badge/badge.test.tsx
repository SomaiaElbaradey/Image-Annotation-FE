import React from 'react';

import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import Badge from './badge';

describe('Badge Component', () => {
    it('renders with default props', () => {
        render(<Badge>Default Badge</Badge>);
        const badge = screen.getByText('Default Badge');
        expect(badge).toBeInTheDocument();
        expect(badge.closest('div')).toHaveClass('bg-backgroundAccent-purpleLight');
        expect(badge.closest('div')).toHaveClass('text-purple');
    });

    it('applies custom className', () => {
        render(<Badge className="custom-class">Custom Class Badge</Badge>);
        const badge = screen.getByText('Custom Class Badge');
        expect(badge.closest('div')).toHaveClass('custom-class');
    });

    it('renders with different types', () => {
        const types = ['primary', 'secondary', 'solid'] as const;
        types.forEach((type) => {
            const { rerender } = render(<Badge type={type}>{`${type} Badge`}</Badge>);
            const badge = screen.getByText(`${type} Badge`);
            if (type === 'secondary') {
                expect(badge.closest('div')).toHaveClass('border');
            } else if (type === 'solid') {
                expect(badge.closest('div')).toHaveClass('text-white');
                expect(badge.closest('div')).toHaveClass('border-transparent');
            }
            rerender(<></>);
        });
    });

    it('renders with different sizes', () => {
        const sizes = ['small', 'xsmall', '2xsmall'] as const;
        sizes.forEach((size) => {
            const { rerender } = render(<Badge size={size}>{`${size} Badge`}</Badge>);
            const badge = screen.getByText(`${size} Badge`);
            if (size === 'small') {
                expect(badge.closest('div')).toHaveClass('py-[0.5rem]');
                expect(badge.closest('div')).toHaveClass('px-[1rem]');
            } else if (size === 'xsmall') {
                expect(badge.closest('div')).toHaveClass('py-0.5');
                expect(badge.closest('div')).toHaveClass('px-3');
                expect(badge.closest('div')).toHaveClass('h-7');
            } else if (size === '2xsmall') {
                expect(badge.closest('div')).toHaveClass('py-[0.031rem]');
                expect(badge.closest('div')).toHaveClass('px-[0.5rem]');
            }
            rerender(<></>);
        });
    });

    it('applies compound variants correctly', () => {
        const { rerender } = render(<Badge state="default" type="solid">Solid Default Badge</Badge>);
        let badge = screen.getByText('Solid Default Badge');
        expect(badge.closest('div')).toHaveClass('bg-purple');

        rerender(<Badge state="danger" type="solid">Solid Danger Badge</Badge>);
        badge = screen.getByText('Solid Danger Badge');
        expect(badge.closest('div')).toHaveClass('bg-danger');

        rerender(<Badge state="success" type="solid">Solid Success Badge</Badge>);
        badge = screen.getByText('Solid Success Badge');
        expect(badge.closest('div')).toHaveClass('bg-primary');

        rerender(<Badge state="pending" type="solid">Solid Pending Badge</Badge>);
        badge = screen.getByText('Solid Pending Badge');
        expect(badge.closest('div')).toHaveClass('bg-orange');

        rerender(<Badge state="inactive" type="secondary">Inactive Secondary Badge</Badge>);
        badge = screen.getByText('Inactive Secondary Badge');
        expect(badge.closest('div')).toHaveClass('border-transparent');

        rerender(<Badge state="inactive" type="solid">Inactive Solid Badge</Badge>);
        badge = screen.getByText('Inactive Solid Badge');
        expect(badge.closest('div')).toHaveClass('text-content-disabled');

        rerender(<Badge state="info" type="solid">Info Solid Badge</Badge>);
        badge = screen.getByText('Info Solid Badge');
        expect(badge.closest('div')).toHaveClass('text-content-secondary');
    });

    it('renders children correctly', () => {
        render(<Badge><span data-testid="child">Child Element</span></Badge>);
        expect(screen.getByTestId('child')).toBeInTheDocument();
    });

    it('passes through additional props', () => {
        render(<Badge data-testid="custom-badge">Test Badge</Badge>);
        expect(screen.getByTestId('custom-badge')).toBeInTheDocument();
    });
});

