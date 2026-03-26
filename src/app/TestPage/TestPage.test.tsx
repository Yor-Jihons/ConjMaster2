/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { vi } from 'vitest';
import TestPage from './page';
import { ApiContext } from '../../contexts/ApiContext';

describe('TestPage Component', () => {
    const mockGetVerbDetail = vi.fn();
    const mockApi = {
        getVerbDetail: mockGetVerbDetail,
    } as any;

    const mockVerbData = {
        id: 1,
        name: 'hablar',
        data: JSON.stringify({
            pres_ind: ['hablo', 'hablas', 'habla', 'hablamos', 'habláis', 'hablan'],
            infinitive: 'hablar'
        })
    };

    beforeEach(() => {
        vi.clearAllMocks();
    });

    const renderTestPage = (language = 'spanish', id = '1') => {
        return render(
            <ApiContext.Provider value={mockApi}>
                <MemoryRouter initialEntries={[`/${language}/test/${id}`]}>
                    <Routes>
                        <Route path="/:language/test/:id" element={<TestPage />} />
                    </Routes>
                </MemoryRouter>
            </ApiContext.Provider>
        );
    };

    test('shows loading message initially', () => {
        mockGetVerbDetail.mockReturnValue(new Promise(() => {})); // 完了しないPromiseを返す
        renderTestPage();
        expect(screen.getByText('読み込み中...')).toBeInTheDocument();
    });

    test('fetches and displays verb test for Spanish', async () => {
        mockGetVerbDetail.mockResolvedValue(mockVerbData);
        
        renderTestPage('spanish', '1');

        // APIが正しいIDで呼ばれたか
        expect(mockGetVerbDetail).toHaveBeenCalledWith(1);

        // 動詞名が表示されるのを待つ
        await waitFor(() => {
            expect(screen.getByText('hablar 活用テスト (spanish)')).toBeInTheDocument();
        });

        // スペイン語の直説法現在（現在）の見出しが表示されているか
        expect(screen.getAllByText('現在').length).toBeGreaterThanOrEqual(1);

        // ConjTestBox が生成されているか確認
        const inputElements = screen.getAllByRole('textbox');
        expect(inputElements.length).toBeGreaterThanOrEqual(7);

        // 人称ラベルが表示されているか
        expect(screen.getAllByText('yo').length).toBeGreaterThanOrEqual(1);
        expect(screen.getAllByText('tú').length).toBeGreaterThanOrEqual(1);
        expect(screen.getAllByText('él').length).toBeGreaterThanOrEqual(1);
    });

    test('shows error message for unknown language', () => {
        renderTestPage('unknown_lang', '1');
        expect(screen.getByText('言語定義エラー')).toBeInTheDocument();
    });

    test('handles non_finite group correctly (no person labels)', async () => {
        mockGetVerbDetail.mockResolvedValue(mockVerbData);
        renderTestPage('spanish', '1');

        await waitFor(() => {
            expect(screen.getByText('分詞・準動詞')).toBeInTheDocument();
        });

        // Infinitive (hablar) のセクションがあるか
        expect(screen.getByText('不定詞')).toBeInTheDocument();
    });

    test('renders back link to list', async () => {
        mockGetVerbDetail.mockResolvedValue(mockVerbData);
        renderTestPage('spanish', '1');
        
        await waitFor(() => {
            const backLink = screen.getByText('一覧に戻る');
            expect(backLink.closest('a')).toHaveAttribute('href', '/spanish/list');
        });
    });
});
