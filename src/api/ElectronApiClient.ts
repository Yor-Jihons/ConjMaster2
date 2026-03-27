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

    saveJsonFile: (data, defaultFileName) => window.interprocessCommunication.saveJsonFile(data, defaultFileName),

    importVerbJson: (filePath) => window.interprocessCommunication.importVerbJson(filePath),
    getVerbs: (lang_id) => window.interprocessCommunication.getVerbs(lang_id),
    getVerbDetail: (id) => window.interprocessCommunication.getVerbDetail(id),
    addVerb: (lang_id, name, data) => window.interprocessCommunication.addVerb(lang_id, name, data),
};
