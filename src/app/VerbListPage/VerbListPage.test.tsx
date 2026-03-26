/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { vi } from 'vitest';
import VerbListPage from './page';
import { ApiContext } from '../../contexts/ApiContext';

describe('VerbListPage Component', () => {
    const mockGetVerbs = vi.fn();
    const mockApi = {
        getVerbs: mockGetVerbs,
    } as any;

    const mockVerbs = [
        { id: 1, name: 'hablar' },
        { id: 2, name: 'comer' }
    ];

    beforeEach(() => {
        vi.clearAllMocks();
    });

    const renderVerbListPage = (language = 'spanish') => {
        return render(
            <ApiContext.Provider value={mockApi}>
                <MemoryRouter initialEntries={[`/${language}/list`]}>
                    <Routes>
                        <Route path="/:language/list" element={<VerbListPage />} />
                    </Routes>
                </MemoryRouter>
            </ApiContext.Provider>
        );
    };

    test('fetches and displays the list of verbs for the given language', async () => {
        mockGetVerbs.mockResolvedValue(mockVerbs);
        
        renderVerbListPage('spanish');

        // 正しい言語のタイトルが表示されているか
        expect(screen.getByText('spanish の動詞一覧')).toBeInTheDocument();

        // APIが正しい引数で呼ばれたか
        expect(mockGetVerbs).toHaveBeenCalledWith('spanish');

        // 動詞が表示されるのを待つ
        await waitFor(() => {
            expect(screen.getByText('hablar')).toBeInTheDocument();
            expect(screen.getByText('comer')).toBeInTheDocument();
        });

        // 「表示」と「テスト」ボタンがそれぞれの動詞に対して存在するか
        const viewButtons = screen.getAllByText('表示');
        const testButtons = screen.getAllByText('テスト');
        expect(viewButtons).toHaveLength(2);
        expect(testButtons).toHaveLength(2);

        // リンクのhref属性を確認
        expect(viewButtons[0].closest('a')).toHaveAttribute('href', '/spanish/view/1');
        expect(testButtons[1].closest('a')).toHaveAttribute('href', '/spanish/test/2');
    });

    test('displays a message when no verbs are found', async () => {
        mockGetVerbs.mockResolvedValue([]);
        
        renderVerbListPage('french');

        await waitFor(() => {
            expect(screen.getByText('動詞が登録されていません。')).toBeInTheDocument();
        });

        expect(screen.getByText('french の動詞一覧')).toBeInTheDocument();
    });

    test('renders back link to home', () => {
        mockGetVerbs.mockResolvedValue([]);
        renderVerbListPage();
        
        const homeLink = screen.getByText('メイン画面に戻る');
        expect(homeLink.closest('a')).toHaveAttribute('href', '/');
    });
});
