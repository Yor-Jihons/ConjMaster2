import { useParams, Link } from 'react-router-dom';
import { useState } from 'react';
import CommonLayout from '../layout';
import { LanguageDefinition } from '../../types/LanguageDefinition';
import createLanguageDefinition from '../../utils/CreateLanguageDefinition';
import styles from "./verbspanpage.module.css";

function UserDetailPage() {
  //const [users, setUsers] = useState<typeof dummyUsers>([]);
  const { language } = useParams<{ language: string, id: string }>();

  const [langDef] = useState<LanguageDefinition>( createLanguageDefinition( language! )! );

  console.log( langDef ); // TODO:
  
  // useNavigateフックを呼び出す
  //const navigate = useNavigate();

  return (
    <CommonLayout>
      <div className={styles.flexbox1}>
        {language}
        <Link to="/">メイン画面に戻る</Link>
      </div>
    </CommonLayout>
  );
}

export default UserDetailPage;