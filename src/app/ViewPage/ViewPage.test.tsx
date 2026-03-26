/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { vi } from 'vitest';
import ViewPage from './page';
import { ApiContext } from '../../contexts/ApiContext';

describe('ViewPage Component', () => {
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

    const renderViewPage = (language = 'spanish', id = '1') => {
        return render(
            <ApiContext.Provider value={mockApi}>
                <MemoryRouter initialEntries={[`/${language}/view/${id}`]}>
                    <Routes>
                        <Route path="/:language/view/:id" element={<ViewPage />} />
                    </Routes>
                </MemoryRouter>
            </ApiContext.Provider>
        );
    };

    test('fetches and displays verb conjugations for Spanish', async () => {
        mockGetVerbDetail.mockResolvedValue(mockVerbData);
        
        renderViewPage('spanish', '1');

        await waitFor(() => {
            expect(screen.getByText('hablar 活用表 (spanish)')).toBeInTheDocument();
        });

        // 活用形が表示されているか
        expect(screen.getByText('hablo')).toBeInTheDocument();
        expect(screen.getByText('hablamos')).toBeInTheDocument();
        expect(screen.getByText('hablar')).toBeInTheDocument();

        // 日本語のラベルが表示されているか
        expect(screen.getByText('分詞・準動詞')).toBeInTheDocument();
        expect(screen.getAllByText('現在').length).toBeGreaterThanOrEqual(1);
    });

    test('renders back link to list', async () => {
        mockGetVerbDetail.mockResolvedValue(mockVerbData);
        renderViewPage('spanish', '1');
        
        await waitFor(() => {
            const backLink = screen.getByText('一覧に戻る');
            expect(backLink.closest('a')).toHaveAttribute('href', '/spanish/list');
        });
    });
});
