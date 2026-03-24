import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import CommonLayout from '../layout';
import createLanguageDefinition from '../../utils/CreateLanguageDefinition';
import styles from "../ViewPage/viewpage.module.css";
import ConjTestBox from '../../components/ConjTestBox/ConjITestBox';
import { useApi } from '../../contexts/ApiContext';

function TestPage() {
  const { language, id } = useParams<{ language: string, id: string }>();
  const langDef = createLanguageDefinition( language! );
  const api = useApi();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [verbData, setVerbData] = useState<any>(null);

  useEffect(() => {
    const fetchDetail = async () => {
      const result = await api.getVerbDetail(Number(id));
      if (result) {
        result.conjugations = JSON.parse(result.data);
        setVerbData(result);
      }
    };
    fetchDetail();
  }, [id, api]);

  if (!langDef) return <div>言語定義エラー</div>;
  if (!verbData) return <div>読み込み中...</div>;

  const getAnswer = (tenseId: string, personIndex?: number): string => {
    const answer = verbData.conjugations[tenseId];
    if (Array.isArray(answer)) {
      return answer[personIndex ?? 0] || "todo";
    }
    return answer || "todo";
  };

  return (
    <CommonLayout>
      <div className={styles.flexbox1}>
        <h1>{verbData.name} 活用テスト ({language})</h1>
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
                      <ConjTestBox
                        person=""
                        answer={getAnswer(tense.id)}
                      />
                    ) : (
                      langDef.persons.map((person, index) => {
                        if (group.id === "imperative" && index === 0) return null;
                        
                        const answer = getAnswer(tense.id, index);
                        if (group.id === "imperative" && !answer) return null;

                        return (
                          <ConjTestBox
                            key={person}
                            person={person}
                            answer={answer}
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

export default TestPage;
