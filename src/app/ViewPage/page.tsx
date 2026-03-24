import { useParams, Link } from 'react-router-dom';
import CommonLayout from '../layout';
import createLanguageDefinition from '../../utils/CreateLanguageDefinition';
import styles from "./viewpage.module.css";
import ConjTestBox from '../../components/ConjTestBox/ConjITestBox';

function ViewPage() {
  const { language, id } = useParams<{ language: string, id: string }>();
  const langDef = createLanguageDefinition( language! );

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

  const verbName = id === "1" ? "hablar" : `動詞 ID: ${id}`;

  return (
    <CommonLayout>
      <div className={styles.flexbox1}>
        <h1>{verbName} の活用練習</h1>
        <Link to="/">メイン画面に戻る</Link>

        {langDef.groups.map((group) => (
          <div key={group.id} className={styles.groupContainer}>
            <h2 className={styles.groupTitle}>{group.label}</h2>
            <div className={styles.tensesWrapper}>
              {group.tenses.map((tense) => (
                <div key={tense.id} className={styles.tenseBox}>
                  <h3>{tense.label}</h3>
                  <div className={styles.conjGrid}>
                    {group.id === "non_finite" ? (
                      /* 分詞・準動詞は人称ループを回さない */
                      <ConjTestBox
                        person=""
                        answer="todo"
                      />
                    ) : (
                      /* 直説法・接続法・命令法などは人称ごとに表示 */
                      langDef.persons.map((person, index) => {
                        // 命令法の場合、1人称単数(yo/je/ioなど)は表示しない
                        if (group.id === "imperative" && index === 0) return null;

                        return (
                          <ConjTestBox
                            key={person}
                            person={person}
                            answer="todo"
                            onInput={(isCorrect) => {
                              console.log(`${tense.label} ${person}: ${isCorrect ? "正解" : "不正解"}`);
                            }}
                          />
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

export default ViewPage;
