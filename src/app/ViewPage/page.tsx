import { useParams, Link } from 'react-router-dom';
import CommonLayout from '../layout';
import styles from "./viewpage.module.css";
import ConjSpanBox from '../../components/ConjSpanBox/ConjSpanBox';
import useVerbDetail from '../../hooks/useVerbDetail';

function ViewPage() {
  const { language, id } = useParams<{ language: string, id: string }>();

  const { langDef, verbData } = useVerbDetail( language!, Number(id) );

  if (!langDef) return <div>言語定義エラー</div>;
  if (!verbData) return <div>読み込み中...</div>;

  const getAnswer = (tenseId: string, personIndex?: number): string => {
    const answer = verbData.conjugations[tenseId];
    if (Array.isArray(answer)) {
      return answer[personIndex ?? 0] || "---";
    }
    return answer || "---";
  };

  return (
    <CommonLayout>
      <div className={styles.flexbox1}>
        <h1>{verbData.name} 活用表 ({language})</h1>
        <Link to={`/${language}/list`}>一覧に戻る</Link>

        {langDef.groups.map((group) => (
          <div key={group.id} className={styles.groupContainer}>
            <h2 className={styles.groupTitle}>{group.label}</h2>
            <div className={styles.tensesWrapper}>
              {group.tenses.map((tense) => (
                <div key={tense.id} className={styles.tenseBox}>
                  <h3>{tense.label}</h3>
                  <div className={styles.conjGrid}>
                    {group.id === "non_finite" ? (
                      <ConjSpanBox
                        person=""
                        conjText={getAnswer(tense.id)}
                      />
                    ) : (
                      langDef.persons.map((person, index) => {
                        if (group.id === "imperative" && index === 0) return null;
                        
                        const answer = getAnswer(tense.id, index);
                        if (group.id === "imperative" && !answer) return null;

                        return (
                          <ConjSpanBox
                            key={person}
                            person={person}
                            conjText={answer}
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
