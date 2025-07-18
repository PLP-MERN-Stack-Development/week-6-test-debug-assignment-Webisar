import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import BugForm from '../components/BugForm';

describe('BugForm', () => {
    it('renders form fields', () => {
        render(<BugForm onBugCreated={jest.fn()} />);

        expect(screen.getByLabelText('Title')).toBeInTheDocument();
        expect(screen.getByLabelText('Description')).toBeInTheDocument();
        expect(screen.getByLabelText('Priority')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Report Bug' })).toBeInTheDocument();
    });

    it('validates form fields', async () => {
        const mockSubmit = jest.fn();
        render(<BugForm onBugCreated={mockSubmit} />);

        fireEvent.click(screen.getByRole('button'));

        expect(await screen.findByText('Title is required')).toBeInTheDocument();
        expect(await screen.findByText('Description is required')).toBeInTheDocument();
        expect(mockSubmit).not.toHaveBeenCalled();
    });
});