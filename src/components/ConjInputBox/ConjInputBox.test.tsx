import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import ConjInputBox from './ConjInputBox';

describe('ConjInputBox Component', () => {
    test('calls onInput with correct parameters on input', async () => {
        const handleInput = vi.fn();
        const langId = 1;
        const verbId = 2;
        const conjId = 3;
        const person = "Yo";

        render(
            <ConjInputBox
                onInput={handleInput}
                langId={langId}
                verbId={verbId}
                conjId={conjId}
                person={person}
            />
        );

        const inputElement = screen.getByRole('textbox');
        const user = userEvent.setup();

        // 文字列を入力
        await user.type(inputElement, 'a');

        // onInput が呼ばれるか
        // 期待されるパラメータ: langId, verbId, conjId, text
        expect(handleInput).toHaveBeenCalledWith(langId, verbId, conjId, 'a');
    });

    test('updates its own value on input', async () => {
        const handleInput = vi.fn();
        render(
            <ConjInputBox
                onInput={handleInput}
                langId={1}
                verbId={1}
                conjId={1}
                person="Yo"
            />
        );

        const inputElement = screen.getByRole('textbox') as HTMLInputElement;
        const user = userEvent.setup();

        await user.type(inputElement, 'test');
        expect(inputElement.value).toBe('test');
    });
});
