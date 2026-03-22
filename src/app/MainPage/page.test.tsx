/* eslint-disable @typescript-eslint/no-explicit-any */
// src/app/MainPage/page.test.tsx (または tests/MainPage.test.tsx)
import { render, screen, waitFor } from '@testing-library/react';
import { ApiProvider } from '../../contexts/ApiProvider';
import { beforeEach } from 'vitest';
//import { ApiContext } from '../../contexts/ApiContext'; // useApiが参照するContext
import MainPage from './page';
import { MemoryRouter } from 'react-router-dom';
import { vi, expect, test } from 'vitest';
import { IInterprocessCommunication } from '../../@types/global';

// 1. 全ての関数をスパイ（vi.fn）にしたモックオブジェクト
const mockApi: Record<keyof IInterprocessCommunication, any> = {
    initI18nData: vi.fn(),
    getSystemLocale: vi.fn().mockResolvedValue('ja'),
    node: vi.fn().mockReturnValue('v20'),
    chrome: vi.fn().mockReturnValue('120'),
    electron: vi.fn().mockReturnValue('30'),
    showMessageBox: vi.fn(),
    getUsers: vi.fn(),
    addUser: vi.fn(),
};

// 前回の値が残っている可能性があるため追加
beforeEach(() => {
  vi.clearAllMocks(); // 呼び出し回数などをリセット
});

test('DBから取得したユーザー名がセレクトボックスに表示されること', async () => {
    // 2. このテスト専用の戻り値を設定
    const dummyDbUsers = [{ id: 100, name: 'テスト太郎' }];
    mockApi.getUsers.mockResolvedValue(dummyDbUsers);

    // 3. レンダリング (RouterとApiProviderで包む)
    render(
        <MemoryRouter>
            <ApiProvider api={mockApi as unknown as IInterprocessCommunication}>
                <MainPage />
            </ApiProvider>
        </MemoryRouter>
    );

    // 4. 検証: 非同期でデータが反映されるのを待つ
    await waitFor(() => {
        // MainPage内の usersFromDB.map でレンダリングされる要素を確認
        expect(screen.getByText('テスト太郎')).toBeInTheDocument();
    });

    // getUsersが1回呼ばれたことを確認
    expect(mockApi.getUsers).toHaveBeenCalledTimes(1);
});
