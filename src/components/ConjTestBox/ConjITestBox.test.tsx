import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import ConjTestBox from './ConjITestBox';

describe('ConjTestBox Component', () => {
    test('marks input as correct when it matches answer', async () => {
        const handleInput = vi.fn();
        const answer = 'hablo';
        
        render(<ConjTestBox person="Yo" answer={answer} onInput={handleInput} />);
        
        const inputElement = screen.getByRole('textbox') as HTMLInputElement;
        const user = userEvent.setup();

        // 正解を入力
        await user.type(inputElement, answer);

        // 正解の背景色 (#ccffcc) になっているか
        expect(inputElement.style.backgroundColor).toBe('rgb(204, 255, 204)');
        
        // コールバックが true で呼ばれるか
        expect(handleInput).toHaveBeenLastCalledWith(true);
    });

    test('marks input as incorrect when it does not match answer', async () => {
        const handleInput = vi.fn();
        const answer = 'hablo';
        
        render(<ConjTestBox person="Yo" answer={answer} onInput={handleInput} />);
        
        const inputElement = screen.getByRole('textbox') as HTMLInputElement;
        const user = userEvent.setup();

        // 不正解を入力
        await user.type(inputElement, 'habl');

        // 不正解の背景色 (#E6A8AD) になっているか
        expect(inputElement.style.backgroundColor).toBe('rgb(230, 168, 173)');
        
        // コールバックが false で呼ばれるか
        expect(handleInput).toHaveBeenLastCalledWith(false);
    });
});
