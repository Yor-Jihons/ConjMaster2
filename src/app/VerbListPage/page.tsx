import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import CommonLayout from '../layout';
import styles from "./verblistpage.module.css";
import { useApi } from '../../contexts/ApiContext';

function VerbListPage() {
  const { language } = useParams<{ language: string }>()
  const api = useApi();
  const [verbs, setVerbs] = useState<any[]>([]);

  useEffect(() => {
    const fetchVerbs = async () => {
      const data = await api.getVerbs(language!);
      setVerbs(data);
    };
    fetchVerbs();
  }, [language, api]);

  return (
    <CommonLayout>
      <div className={styles.flexbox1}>
        <h1>{language} の動詞一覧</h1>
        <div style={{ display: "flex", gap: "20px" }}>
          <Link to="/">メイン画面に戻る</Link>
          <Link to={`/${language}/register`} style={{ color: "#28a745", fontWeight: "bold" }}>＋ 新しい動詞を登録してJSONを作る</Link>
        </div>

        <div className={styles.verbList}>
          {verbs.length > 0 ? (
            verbs.map(verb => (
              <div key={verb.id} className={styles.verbItem}>
                <span className={styles.verbName}>{verb.name}</span>
                <div className={styles.verbActions}>
                  <Link to={`/${language}/view/${verb.id}`} className={styles.viewButton}>表示</Link>
                  <Link to={`/${language}/test/${verb.id}`} className={styles.testButton}>テスト</Link>
                </div>
              </div>
            ))
          ) : (
            <div style={{ padding: "40px", textAlign: "center", border: "1px dashed #ccc" }}>
              <p>動詞が登録されていません。</p>
              <p style={{ fontSize: "0.9rem", color: "#666" }}>
                JSONファイルをトップ画面にドラッグ＆ドロップして登録してください。
              </p>
            </div>
          )}
        </div>
      </div>
    </CommonLayout>
  );
}

export default VerbListPage;
