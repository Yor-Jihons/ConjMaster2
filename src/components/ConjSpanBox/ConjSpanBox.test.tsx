import { render, screen } from '@testing-library/react';
import ConjSpanBox from './ConjSpanBox';

describe('ConjSpanBox Component', () => {
    test('renders person and conjugated text correctly', () => {
        const person = "Yo";
        const conjText = "hablo";
        
        render(<ConjSpanBox person={person} conjText={conjText} />);

        // 人称が表示されているか
        expect(screen.getByText(person)).toBeInTheDocument();
        
        // 活用形が表示されているか
        expect(screen.getByText(conjText)).toBeInTheDocument();
    });
});
