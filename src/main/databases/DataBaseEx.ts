import BetterSqlite3 from 'better-sqlite3';

export default class DataBaseEx{
    #db: BetterSqlite3.Database|undefined;

    public close(){
        this.#db!.close();
    }

    public getDB() : BetterSqlite3.Database{
        return this.#db!;
    }

    public constructor(){
        this.#db = undefined;
    }

    public open( dbFilePath: string ) : boolean{
        this.#db = new BetterSqlite3( dbFilePath );
    return true;
    }

    public backup( backupDbFilePath: string, callBackFunc: (message: string) => void ){
        this.#db?.backup( backupDbFilePath ).then( () => {
            callBackFunc( "バックアップが完了しました。" );
        }).catch( ( err ) => {
            callBackFunc( "バックアップ中にエラーが発生しました:" + err.message );
        });
    }

    public createTables() : BetterSqlite3.Database{
        return this.#db!.exec(`
            CREATE TABLE IF NOT EXISTS verbs (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                lang_id TEXT NOT NULL,
                name TEXT NOT NULL,
                data TEXT NOT NULL
            );
        `);
    }

    public addVerb(lang_id: string, name: string, data: string) {
        try {
            const stmt = this.#db!.prepare('INSERT INTO verbs (lang_id, name, data) VALUES (?, ?, ?)');
            const info = stmt.run(lang_id, name, data);
            return { success: true, id: info.lastInsertRowid };
        } catch (error: unknown) {
            console.error('Failed to add verb:', error);
            return { success: false, error: (error as Error).message };
        }
    }

    public getVerbs(lang_id: string) {
        try {
            const stmt = this.#db!.prepare('SELECT id, name FROM verbs WHERE lang_id = ?');
            return stmt.all(lang_id);
        } catch (error: unknown) {
            console.error('Failed to fetch verbs:', error);
            return [];
        }
    }

    public getVerbDetail(id: number) {
        try {
            const stmt = this.#db!.prepare('SELECT * FROM verbs WHERE id = ?');
            return stmt.get(id);
        } catch (error: unknown) {
            console.error('Failed to fetch verb detail:', error);
            return null;
        }
    }
}
