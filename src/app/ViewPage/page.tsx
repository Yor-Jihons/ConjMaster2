import { useParams, Link } from 'react-router-dom';
import CommonLayout from '../layout';
import createLanguageDefinition from '../../utils/CreateLanguageDefinition';
import styles from "./viewpage.module.css";
import ConjSpanBox from '../../components/ConjSpanBox/ConjSpanBox';

// モックデータ (1: Spanish hablar, 2: French habiter, 3: Italian amare)
const MOCK_DATA: Record<string, { name: string, conj: Record<string, string | string[]> }> = {
  "1": { 
    name: "hablar",
    conj: {
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
  },
  "2": {
    name: "habiter",
    conj: {
      "present_participle": "habitant",
      "past_participle": "habité",
      "infinitive": "habiter",
      "pres_ind": ["habite", "habites", "habite", "habitons", "habitez", "habitent"],
      "imp_ind": ["habitais", "habitais", "habitait", "habitions", "habitiez", "habitaient"],
      "ps_ind": ["habitai", "habitas", "habita", "habitâmes", "habitâtes", "habitèrent"],
      "fut_ind": ["habiterai", "habiteras", "habitera", "habiterons", "habiterez", "habiteront"],
      "cond_ind": ["habiterais", "habiterais", "habiterait", "habiterions", "habiteriez", "habiteraient"],
      "pres_sub": ["habite", "habites", "habite", "habitions", "habitiez", "habitent"],
      "imp_sub": ["habitasse", "habitasses", "habitât", "habitassions", "habitassiez", "habitassent"],
      "pres_imp": ["", "habite", "habitons", "habitez", "", ""],
    }
  },
  "3": {
    name: "amare",
    conj: {
      "present_participle": "amante",
      "past_participle": "amato",
      "gerund": "amando",
      "infinitive": "amare",
      "pres_ind": ["amo", "ami", "ama", "amiamo", "amate", "amano"],
      "imp_ind": ["amavo", "amavi", "amava", "amavamo", "amavate", "amavano"],
      "rem_ind": ["amai", "amasti", "amò", "amammo", "amaste", "amarono"],
      "fut_ind": ["amerò", "amerai", "amerà", "ameremo", "amerete", "ameranno"],
      "cond_ind": ["amerei", "ameresti", "amerebbe", "ameremmo", "amereste", "amerebbero"],
      "pres_sub": ["ami", "ami", "ami", "amiamo", "amiate", "amino"],
      "imp_sub": ["amassi", "amassi", "amasse", "amassimo", "amaste", "amassero"],
      "pres_imp": ["", "ama", "ami", "amiamo", "amate", "amino"],
    }
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

  const currentVerb = MOCK_DATA[id || ""];
  const verbName = currentVerb ? currentVerb.name : `動詞 ID: ${id}`;

  const getAnswer = (tenseId: string, personIndex?: number): string => {
    if (!currentVerb) return "---";

    const answer = currentVerb.conj[tenseId];
    if (Array.isArray(answer)) {
      return answer[personIndex ?? 0] || "---";
    }
    return answer || "---";
  };

  return (
    <CommonLayout>
      <div className={styles.flexbox1}>
        <h1>{verbName} 活用表 ({language})</h1>
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
