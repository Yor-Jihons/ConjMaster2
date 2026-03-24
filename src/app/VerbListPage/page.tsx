//import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import CommonLayout from '../layout';
import styles from "./verblistpage.module.css";



function VerbListPage() {
  //const [users, setUsers] = useState<typeof dummyUsers>([]);
  const { language } = useParams<{ language: string }>()
  
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

export default VerbListPage;
