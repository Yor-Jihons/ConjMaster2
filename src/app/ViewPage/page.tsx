import { useParams, Link } from 'react-router-dom';
import CommonLayout from '../layout';
import createLanguageDefinition from '../../utils/CreateLanguageDefinition';
import styles from "./viewpage.module.css";
import ConjTestBox from '../../components/ConjTestBox/ConjITestBox';

// 「hablar」のモックデータ
const MOCK_DATA: Record<string, Record<string, string | string[]>> = {
  "1": { // hablar (Spanish)
    "present_participle": "hablando",
    "past_participle": "hablado",
    "infinitive": "hablar",
    "pres_ind": ["hablo", "hablas", "habla", "hablamos", "habláis", "hablan"],
    "pret_ind": ["hablé", "hablaste", "habló", "hablamos", "hablasteis", "hablaron"],
    "imp_ind": ["hablaba", "hablabas", "hablaba", "hablábamos", "hablabais", "hablaban"],
    "fut_ind": ["hablaré", "hablarás", "hablará", "hablaremos", "hablaréis", "hablarán"],
    "cond_ind": ["hablaría", "hablarías", "hablaría", "hablaríamos", "hablaríais", "hablarían"],
    "pres_sub": ["hable", "hables", "hable", "hablemos", "habléis", "hablen"],
    "imp_sub_ra": ["hablara", "hablaras", "hablara", "habláramos", "hablarais", "hablaran"],
    "imp_sub_se": ["hablase", "hablases", "hablase", "hablásemos", "hablaseis", "hablasen"],
    "fut_sub": ["hablare", "hablares", "hablare", "habláremos", "hablareis", "hablaren"],
    "aff_imp": ["", "habla", "hable", "hablemos", "hablad", "hablen"],
    "neg_imp": ["", "no hables", "no hable", "no hablemos", "no habléis", "no hablen"],
  }
};

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

  const getAnswer = (tenseId: string, personIndex?: number): string => {
    const verbData = MOCK_DATA[id || ""];
    if (!verbData) return "todo";

    const answer = verbData[tenseId];
    if (Array.isArray(answer)) {
      return answer[personIndex ?? 0] || "todo";
    }
    return answer || "todo";
  };

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
                        answer={getAnswer(tense.id)}
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
                            answer={getAnswer(tense.id, index)}
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
