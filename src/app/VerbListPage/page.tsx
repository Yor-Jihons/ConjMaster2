import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import CommonLayout from '../layout';
import styles from "./verblistpage.module.css";

function VerbListPage() {
  const { language } = useParams<{ language: string }>()

  const verbs = [
    { id: "1", name: "hablar", lang: "spanish" },
    { id: "2", name: "habiter", lang: "french" },
    { id: "3", name: "amare", lang: "italian" }
  ];

  const currentVerbs = verbs.filter(v => v.lang === language);

  return (
    <CommonLayout>
      <div className={styles.flexbox1}>
        <h1>{language} の動詞一覧</h1>
        <div style={{ display: "flex", gap: "20px" }}>
          <Link to="/">メイン画面に戻る</Link>
          <Link to={`/${language}/register`} style={{ color: "#28a745", fontWeight: "bold" }}>＋ 新しい動詞を登録してJSONを作る</Link>
        </div>

        <div className={styles.verbList}>
          {currentVerbs.length > 0 ? (
            currentVerbs.map(verb => (
              <div key={verb.id} className={styles.verbItem}>
                <span className={styles.verbName}>{verb.name}</span>
                <div className={styles.verbActions}>
                  <Link to={`/${language}/view/${verb.id}`} className={styles.viewButton}>表示</Link>
                  <Link to={`/${language}/test/${verb.id}`} className={styles.testButton}>テスト</Link>
                </div>
              </div>
            ))
          ) : (
            <p>動詞が登録されていません。</p>
          )}
        </div>
      </div>
    </CommonLayout>
  );
}

export default VerbListPage;
