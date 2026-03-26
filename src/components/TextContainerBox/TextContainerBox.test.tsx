import { render, screen } from '@testing-library/react';
import TextContainerBox from './TextContainerBox';

describe('TextContainerBox Component', () => {
    test('renders label and children correctly', () => {
        render(
            <TextContainerBox person="Yo" htmlFor="input-id">
                <input id="input-id" type="text" />
            </TextContainerBox>
        );

        // ラベルが表示されているか
        const labelElement = screen.getByText('Yo');
        expect(labelElement).toBeInTheDocument();
        
        // labelのfor属性が正しいか
        expect(labelElement).toHaveAttribute('for', 'input-id');

        // 子要素が表示されているか
        expect(screen.getByRole('textbox')).toBeInTheDocument();
    });

    test('does not render label if person is empty', () => {
        const { queryByText } = render(
            <TextContainerBox person="" htmlFor="input-id">
                <input id="input-id" type="text" />
            </TextContainerBox>
        );

        // personが空の場合はlabelが表示されないことを確認
        expect(queryByText(/./)).toBeNull();
    });
});
