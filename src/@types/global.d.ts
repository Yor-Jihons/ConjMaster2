/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IInterprocessCommunication {
  initI18nData: ( resources: any ) => void;
  getSystemLocale: () => Promise<string>;
  node: () => string;
  chrome: () => string;
  electron: () => string;
  showMessageBox: ( message: string, buttons: string[] ) => Promise<number>; // Returns index of the button which the user selected.

  /**
   * JSONデータを外部ファイルとして保存します。
   */
  saveJsonFile: ( data: any, defaultFileName: string ) => Promise<{ success: boolean, filePath?: string, error?: string }>;

  /**
   * JSONファイルを読み込み、動詞データベースに登録します。
   * レンダラーからは File オブジェクトを直接渡せます。
   */
  importVerbJson: ( fileOrPath: File | string ) => Promise<{ success: boolean, name?: string, error?: string }>;

  /**
   * 指定された言語の動詞一覧を取得します。
   */
  getVerbs: ( lang_id: string ) => Promise<any[]>;

  /**
   * 指定されたIDの動詞詳細情報を取得します。
   */
  getVerbDetail: ( id: number ) => Promise<any>;

  /**
   * メモリ上のデータを直接データベースに登録します。
   */
  addVerb: ( lang_id: string, name: string, data: any ) => Promise<{ success: boolean, id?: number, error?: string }>;
}

declare global {
  interface Window {
    interprocessCommunication: IInterprocessCommunication;
  }
}
