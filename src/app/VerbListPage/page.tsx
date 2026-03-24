import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import CommonLayout from '../layout';
import styles from "./verblistpage.module.css";

function VerbListPage() {
  const { language } = useParams<{ language: string }>()

  return (
    <CommonLayout>
      <div className={styles.flexbox1}>
        <h1>{language} の動詞一覧</h1>
        <Link to="/">メイン画面に戻る</Link>

        <div className={styles.verbList}>
          {language === "spanish" && (
            <Link to="/spanish/view/1" className={styles.verbLink}>hablar</Link>
          )}
          {language === "french" && (
            <Link to="/french/view/2" className={styles.verbLink}>habiter</Link>
          )}
          {language === "italian" && (
            <p>動詞が登録されていません。</p>
          )}
        </div>
      </div>
    </CommonLayout>
  );
}

export default VerbListPage;
