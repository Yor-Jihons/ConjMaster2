// src/api/ElectronApiClient.ts
import { IInterprocessCommunication } from '../@types/global';

/**
 * 本番環境（Electron）で動作するAPIの実装。
 * 全てのメソッドは preload.ts で露出された window.interprocessCommunication を呼び出します。
 */
export const ElectronApiClient: IInterprocessCommunication = {
    initI18nData: (resources) => window.interprocessCommunication.initI18nData(resources),
    getSystemLocale: () => window.interprocessCommunication.getSystemLocale(),
    node: () => window.interprocessCommunication.node(),
    chrome: () => window.interprocessCommunication.chrome(),
    electron: () => window.interprocessCommunication.electron(),
    showMessageBox: (message, buttons) => window.interprocessCommunication.showMessageBox(message, buttons),

    getUsers: () => window.interprocessCommunication.getUsers(),
    addUser: (name: string, email: string) => window.interprocessCommunication.addUser(name, email),

    saveJsonFile: (data, defaultFileName) => window.interprocessCommunication.saveJsonFile(data, defaultFileName),
    };
