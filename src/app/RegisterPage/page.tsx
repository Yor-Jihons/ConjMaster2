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

    const result = await api.saveJsonFile(exportData, `${verbName}_${language}.json`);
    if (result.success) {
      alert(`保存しました: ${result.filePath}`);
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
          <label style={{ fontWeight: "bold" }}>動詞の原形 (例: hablar): </label>
          <input 
            type="text" 
            value={verbName} 
            onChange={(e) => setVerbName(e.target.value)}
            placeholder="hablar"
            style={{ padding: "8px", fontSize: "1rem", width: "200px", marginRight: "20px" }}
          />
          <button onClick={exportJson} style={{ padding: "10px 20px", backgroundColor: "#28a745", color: "white", border: "none", borderRadius: "4px", cursor: "pointer", fontWeight: "bold" }}>
            JSONとしてエクスポート (配布用)
          </button>
          <p style={{ fontSize: "0.8rem", color: "#666", marginTop: "10px" }}>※ 入力したデータはJSONファイルとして保存され、他の人と共有できます。</p>
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
