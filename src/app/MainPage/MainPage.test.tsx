/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter, useNavigate } from 'react-router-dom';
import { vi } from 'vitest';
import MainPage from './page';
import { ApiContext } from '../../contexts/ApiContext';

// useNavigate をモック化
vi.mock('react-router-dom', async () => {
    const actual = await vi.importActual('react-router-dom');
    return {
        ...actual,
        useNavigate: vi.fn(),
    };
});

describe('MainPage Component', () => {
    const mockNavigate = vi.fn();
    const mockImportVerbJson = vi.fn();

    const mockApi = {
        importVerbJson: mockImportVerbJson,
        // 他のAPIメソッドが必要な場合はここに追加（今回はMainPageで使用するもののみ）
    } as any;

    beforeEach(() => {
        vi.clearAllMocks();
        (useNavigate as any).mockReturnValue(mockNavigate);
        // alert をモック化してテスト中にポップアップが出ないようにする
        vi.stubGlobal('alert', vi.fn());
    });

    const renderMainPage = () => {
        return render(
            <ApiContext.Provider value={mockApi}>
                <MemoryRouter>
                    <MainPage />
                </MemoryRouter>
            </ApiContext.Provider>
        );
    };

    test('renders language selection buttons', () => {
        renderMainPage();
        expect(screen.getByText('スペイン語')).toBeInTheDocument();
        expect(screen.getByText('フランス語')).toBeInTheDocument();
        expect(screen.getByText('イタリア語')).toBeInTheDocument();
    });

    test('navigates to correct list page when a language button is clicked', () => {
        renderMainPage();

        fireEvent.click(screen.getByText('スペイン語'));
        expect(mockNavigate).toHaveBeenCalledWith('/spanish/list');

        fireEvent.click(screen.getByText('フランス語'));
        expect(mockNavigate).toHaveBeenCalledWith('/french/list');

        fireEvent.click(screen.getByText('イタリア語'));
        expect(mockNavigate).toHaveBeenCalledWith('/italian/list');
    });

    test('calls api.importVerbJson when a JSON file is dropped', async () => {
        renderMainPage();
        
        mockImportVerbJson.mockResolvedValue({ success: true, name: 'Test Verbs' });

        const file = new File(['{"verbs":[]}'], 'verbs.json', { type: 'application/json' });
        
        // window.dispatchEvent を使用してドロップイベントをシミュレート
        const dropEvent = new Event('drop', { bubbles: true }) as any;
        dropEvent.dataTransfer = {
            files: [file],
            types: ['Files']
        };
        
        // useEffect 内で登録されたリスナーが発火するように window にディスパッチ
        window.dispatchEvent(dropEvent);

        await waitFor(() => {
            expect(mockImportVerbJson).toHaveBeenCalledWith(file);
        });
        
        expect(window.alert).toHaveBeenCalledWith('「Test Verbs」をデータベースにインポートしました！');
    });

    test('alerts error when non-JSON file is dropped', () => {
        renderMainPage();
        
        const file = new File(['hello'], 'test.txt', { type: 'text/plain' });
        const dropEvent = new Event('drop', { bubbles: true }) as any;
        dropEvent.dataTransfer = {
            files: [file],
            types: ['Files']
        };
        
        window.dispatchEvent(dropEvent);

        expect(window.alert).toHaveBeenCalledWith('Not a JSON file or path missing');
        expect(mockImportVerbJson).not.toHaveBeenCalled();
    });
});
