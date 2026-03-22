import { dialog } from 'electron';
import path from 'path';
import os from 'os';

export async function showSaveFileDialog2Export( browserWindow: Electron.BrowserWindow ){
    const { canceled, filePath } = await dialog.showSaveDialog( browserWindow, {
        title: "データのバックアップ",
        defaultPath: path.join( os.homedir(), "backup.db" ),
        buttonLabel: "バックアップする",
        filters: [{ name: "SQLite3 files", extensions: ["db"] }]
    });
    return { canceled, filePath };
}

export async function showOpenFileDialog2Import( browserWindow: Electron.BrowserWindow ){
    const { canceled, filePaths } = await dialog.showOpenDialog( browserWindow, {
        title: "データの復元",
        //defaultPath: path.join( os.homedir(), "backup.db" ),
        buttonLabel: "復元する",
        properties: ["openFile"],
        filters: [{ name: "SQLite3 files", extensions: ["db"] }]
    });
    return { canceled, filePaths };
}
