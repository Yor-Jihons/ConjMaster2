import { MenuItem } from 'electron';

export default function createMenuTemplate( isPortableMode: boolean = true, databaseImportFunc: () => void = ()=>{}, databaseExportFunc: () => void = ()=>{}) : (MenuItem | Electron.MenuItemConstructorOptions)[]{
    const viewMenu = {
        label: "表示",
        submenu: [
            { role: 'reload', label: "リロード" },
            { role: 'forceReload', label: "再読み込み" },
            //{ role: 'toggleDevTools', label: "開発者モードで開く" },
            { type: 'separator' },
            { role: 'resetZoom', label: "初期サイズに戻す" },
            { role: 'zoomIn', label: "拡大" },
            { role: 'zoomOut', label: "縮小" },
        ],
    } as MenuItem | Electron.MenuItemConstructorOptions;
    const fileMenu = {
        label: "ファイル",
        submenu: [
            {
                label: "データを復元する",
                click: databaseImportFunc
            },
            {
                label: "データをバックアップする",
                click:  databaseExportFunc
            },
        ],
    } as MenuItem | Electron.MenuItemConstructorOptions;
    const windowMenu = {
        label: "ウィンドウ",
        submenu: [{ role: 'close', label: "閉じる" }],
    } as MenuItem | Electron.MenuItemConstructorOptions;

    const ret: (MenuItem | Electron.MenuItemConstructorOptions)[] = [];
    ret.push( viewMenu );

    if( !isPortableMode ){
        ret.push( fileMenu );
    }

    ret.push( windowMenu );
return ret;
}
