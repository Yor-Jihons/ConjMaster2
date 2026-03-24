import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('interprocessCommunication', {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  initI18nData: ( resources: any ) => ipcRenderer.send( 'init-i18n-data', resources ),
  getSystemLocale: () => ipcRenderer.invoke( 'get-system-locale' ),
  node: () => process.versions.node,
  chrome: () => process.versions.chrome,
  electron: () => process.versions.electron,
  showMessageBox: ( message: string, buttons: string[] ) => ipcRenderer.invoke( 'show-messagebox', { message, buttons } ),
  
  // IPC通信用のAPIを追加
  getUsers: () => ipcRenderer.invoke('get-users'),
  addUser: (name: string, email: string) => ipcRenderer.invoke('add-user', { name, email }),
  
  // JSON保存用
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  saveJsonFile: ( data: any, defaultFileName: string ) => ipcRenderer.invoke('save-json-file', { data, defaultFileName }),

  // 動詞DB用
  importVerbJson: ( filePath: string ) => ipcRenderer.invoke('import-verb-json', filePath ),
  getVerbs: ( lang_id: string ) => ipcRenderer.invoke('get-verbs-list', lang_id ),
  getVerbDetail: ( id: number ) => ipcRenderer.invoke('get-verb-detail', id ),
});
