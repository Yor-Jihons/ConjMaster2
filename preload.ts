import { contextBridge, ipcRenderer, webUtils } from 'electron';

contextBridge.exposeInMainWorld('interprocessCommunication', {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  initI18nData: ( resources: any ) => ipcRenderer.send( 'init-i18n-data', resources ),
  getSystemLocale: () => ipcRenderer.invoke( 'get-system-locale' ),
  node: () => process.versions.node,
  chrome: () => process.versions.chrome,
  electron: () => process.versions.electron,
  showMessageBox: ( message: string, buttons: string[] ) => ipcRenderer.invoke( 'show-messagebox', { message, buttons } ),
  
  // JSON保存用
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  saveJsonFile: ( data: any, defaultFileName: string ) => ipcRenderer.invoke('save-json-file', { data, defaultFileName }),

  // 動詞DB用
  importVerbJson: ( fileOrPath: File | string ) => {
    let path = "";
    if (typeof fileOrPath === 'string') {
      path = fileOrPath;
    } else {
      // File オブジェクトから安全にパスを取得 (Electron 20+ / Sandbox環境)
      path = webUtils.getPathForFile(fileOrPath);
    }
    return ipcRenderer.invoke('import-verb-json', path );
  },
  getVerbs: ( lang_id: string ) => ipcRenderer.invoke('get-verbs-list', lang_id ),
  getVerbDetail: ( id: number ) => ipcRenderer.invoke('get-verb-detail', id ),
});
