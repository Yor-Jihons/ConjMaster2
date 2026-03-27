import { app, BrowserWindow, Menu, ipcMain, dialog } from 'electron';
import DataBaseEx from "./src/main/databases/DataBaseEx.js";
import PathManager from "./src/main/paths/PathManager.js";
import { showOpenFileDialog2Import, showSaveFileDialog2Export } from "./src/main/dialogs/Dialogs.js";
import createMenuTemplate from "./src/main/menus/createMenuTemplate.js";
import cleanupTempFile from "./src/main/cleanups/cleanupTempFile.js";
import path from 'path';
import Files from "./src/main/files/Files.js";
import { fileURLToPath } from 'url';

let systemLocale: string | null = null;

const __filename = fileURLToPath( import.meta.url );
const __dirname = path.dirname( __filename );
let preloadPath: string;
if( process.env.NODE_ENV === 'development' ) {
  preloadPath = path.join( __dirname, 'preload.js' );
}else{
  preloadPath = path.join( __dirname, 'preload.js' );
}

const pathManager: PathManager = new PathManager();
const db = new DataBaseEx();
let mainWindow: BrowserWindow;

const tempDbPath = path.join( app.getPath('userData'), '__temp_backup_db.db' );
cleanupTempFile( tempDbPath );

async function importDBFromOtherDirPath(){
  try{
    const { canceled, filePaths } = await showOpenFileDialog2Import( mainWindow );
    if( canceled ) return;

    const dbFilePath = pathManager.dbFilePath;

    Files.copyFile( filePaths[0], tempDbPath );
    db.close();
    Files.deleteFile( dbFilePath );
    Files.moveFile( tempDbPath, dbFilePath );
    db.open( dbFilePath );

    dialog.showMessageBox( mainWindow, { message: "Restored" } );
  }catch( err: unknown ){
    console.error( (err as Error).message );
  }
}

async function exportDB2OtherDirPath(){
  try{
    const { canceled, filePath } = await showSaveFileDialog2Export( mainWindow );
    if( canceled ) return;
    db.backup( filePath, ( message:string ) => { dialog.showMessageBox( mainWindow, { message: message } ); } );
  }catch( err: unknown ){
    console.error( (err as Error).message );
  }
}

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: preloadPath,
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true,
    },
    icon: path.join(__dirname, 'src', 'assets', 'favicon.png')
  });

  if( process.env.NODE_ENV === 'development' ){
    mainWindow.loadURL( 'http://localhost:5173' );
    mainWindow.webContents.openDevTools();
  }else{
    mainWindow.loadFile(path.join(__dirname, 'index.html'));
  }
}

app.whenReady().then(() => {
  systemLocale = app.getLocale();
  console.log(`OSの言語設定: ${systemLocale}`);

  pathManager.init( "database.sqlite", __dirname );

  const isPortableMode = pathManager.isPortableMode;
  Menu.setApplicationMenu( Menu.buildFromTemplate( createMenuTemplate( isPortableMode, importDBFromOtherDirPath, exportDB2OtherDirPath ) ) );

  try{
    db.open( pathManager.dbFilePath );
    db.createTables();
    createWindow();
  }catch( err: unknown ){
    dialog.showErrorBox( "起動エラー", (err as Error).message );
    app.quit();
    return;
  }

  app.on('activate', () => {
    if( BrowserWindow.getAllWindows().length === 0 ){
      createWindow();
    }
  });

  ipcMain.handle('show-messagebox', async (event, { message, buttons }) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (await dialog.showMessageBox( mainWindow, { message: message, buttons: buttons } ) as any).response;
  });

  ipcMain.handle('save-json-file', async (event, { data, defaultFileName }) => {
    const { canceled, filePath } = await dialog.showSaveDialog(mainWindow, {
      defaultPath: defaultFileName,
      filters: [{ name: 'JSON', extensions: ['json'] }]
    });

    if (canceled || !filePath) return { success: false };

    try {
      Files.writeStringFile(filePath, JSON.stringify(data, null, 2));
      return { success: true, filePath };
    } catch (err) {
      console.error(err);
      return { success: false, error: (err as Error).message };
    }
  });

  ipcMain.handle('import-verb-json', async (event, filePath) => {
    try {
      const content = Files.readStringFile(filePath);
      const data = JSON.parse(content);

      // 基本的なバリデーション
      if (!data.language || !data.verb || !data.conjugations) {
        throw new Error("Invalid JSON format. Requires language, verb, and conjugations.");
      }

      // DBに登録 (conjugationsはJSON文字列として保存)
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const result = db.addVerb(data.language, data.verb, JSON.stringify(data.conjugations));
      return { success: true, name: data.verb };
    } catch (err) {
      console.error('Import failed:', err);
      return { success: false, error: (err as Error).message };
    }
  });

  ipcMain.handle('get-verbs-list', (event, lang_id) => {
    return db.getVerbs(lang_id);
  });

  ipcMain.handle('get-verb-detail', (event, id) => {
    return db.getVerbDetail(id);
  });

  ipcMain.handle('add-verb', async (event, { lang_id, name, data }) => {
    try {
      return db.addVerb(lang_id, name, JSON.stringify(data));
    } catch (err) {
      console.error('Failed to add verb:', err);
      return { success: false, error: (err as Error).message };
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    db.close();
    app.quit();
  }
});
