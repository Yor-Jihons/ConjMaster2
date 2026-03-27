import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import CommonLayout from '../layout';
import createLanguageDefinition from '../../utils/CreateLanguageDefinition';
import styles from "../ViewPage/viewpage.module.css"; // スタイル再利用
import { useApi } from '../../contexts/ApiContext';

function RegisterPage() {
  const { language } = useParams<{ language: string }>();
  const langDef = createLanguageDefinition(language!);
  const api = useApi();

  // 動詞の原形
  const [verbName, setVerbName] = useState("");
  
  // 活用データ { tenseId: ["hablo", "hablas", ...] }
  const [formData, setFormData] = useState<Record<string, string | string[]>>({});

  // データベース登録フラグ
  const [shouldRegisterToDb, setShouldRegisterToDb] = useState(true);

  if (!langDef) {
    return (
        <CommonLayout>
          <div className={styles.flexbox1}>
            <p>言語定義が見つかりませんでした ({language})。</p>
            <Link to="/">メイン画面に戻る</Link>
          </div>
        </CommonLayout>
      );
  }

  const handleInputChange = (tenseId: string, value: string, index?: number) => {
    setFormData(prev => {
      const current = prev[tenseId];
      if (index !== undefined) {
        // 配列（人称あり）の場合
        const newList = Array.isArray(current) ? [...current] : new Array(langDef.persons.length).fill("");
        newList[index] = value;
        return { ...prev, [tenseId]: newList };
      } else {
        // 文字列（分詞など）の場合
        return { ...prev, [tenseId]: value };
      }
    });
  };

  const exportJson = async () => {
    if (!verbName) {
      alert("動詞の原形を入力してください。");
      return;
    }

    const exportData = {
      language: language,
      verb: verbName,
      conjugations: formData
    };

    // JSONファイルとして保存
    const result = await api.saveJsonFile(exportData, `${verbName}_${language}.json`);
    
    if (result.success) {
      let message = `保存しました: ${result.filePath}`;

      // データベースにも登録する場合
      if (shouldRegisterToDb) {
        const dbResult = await api.addVerb(language!, verbName, formData);
        if (dbResult.success) {
          message += "\nデータベースにも登録されました。";
        } else {
          message += `\nデータベース登録エラー: ${dbResult.error}`;
        }
      }
      alert(message);
    } else if (result.error) {
      alert(`保存エラー: ${result.error}`);
    }
  };

  return (
    <CommonLayout>
      <div className={styles.flexbox1}>
        <h1>{language} 動詞データの新規作成</h1>
        <Link to={`/${language}/list`}>一覧に戻る</Link>

        <div style={{ margin: "20px 0", padding: "20px", border: "2px solid #28a745", borderRadius: "8px", backgroundColor: "#f0fff4" }}>
          <div style={{ marginBottom: "15px" }}>
            <label style={{ fontWeight: "bold" }}>動詞の原形 (例: hablar): </label>
            <input 
              type="text" 
              value={verbName} 
              onChange={(e) => setVerbName(e.target.value)}
              placeholder="hablar"
              style={{ padding: "8px", fontSize: "1rem", width: "200px", marginRight: "20px" }}
            />
          </div>
          
          <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
            <button onClick={exportJson} style={{ padding: "10px 20px", backgroundColor: "#28a745", color: "white", border: "none", borderRadius: "4px", cursor: "pointer", fontWeight: "bold" }}>
              JSON保存 & データベース登録
            </button>
            
            <label style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: "5px" }}>
              <input 
                type="checkbox" 
                checked={shouldRegisterToDb} 
                onChange={(e) => setShouldRegisterToDb(e.target.checked)} 
              />
              データベースにも登録する
            </label>
          </div>

          <p style={{ fontSize: "0.8rem", color: "#666", marginTop: "10px" }}>
            ※ JSONファイルとして保存することで、他の環境でもD&Dで読み込むことができます。
          </p>
        </div>

        {langDef.groups.map((group) => (
          <div key={group.id} className={styles.groupContainer}>
            <h2 className={styles.groupTitle}>{group.label}</h2>
            <div className={styles.tensesWrapper}>
              {group.tenses.map((tense) => (
                <div key={tense.id} className={styles.tenseBox}>
                  <h3>{tense.label}</h3>
                  <div className={styles.conjGrid}>
                    {group.id === "non_finite" ? (
                      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <input
                          type="text"
                          value={(formData[tense.id] as string) || ""}
                          onChange={(e) => handleInputChange(tense.id, e.target.value)}
                          style={{ width: "100%", padding: "5px" }}
                        />
                      </div>
                    ) : (
                      langDef.persons.map((person, index) => {
                        if (group.id === "imperative" && index === 0) return null;
                        return (
                          <div key={person} style={{ margin: "5px 0", display: "flex", alignItems: "center" }}>
                            <label style={{ display: "inline-block", width: "70px", textAlign: "right", marginRight: "10px", fontSize: "0.9rem", color: "#666" }}>{person}</label>
                            <input
                              type="text"
                              value={(formData[tense.id] as string[])?.[index] || ""}
                              onChange={(e) => handleInputChange(tense.id, e.target.value, index)}
                              style={{ flex: 1, padding: "5px" }}
                            />
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </CommonLayout>
  );
}

export default RegisterPage;
