import { useNavigate } from 'react-router-dom';
import '../../App.css';
import CommonLayout from '../layout';
import useVerbImport from '../../hooks/useVerbImport';

function MainPage() {

  const navigate = useNavigate();

  useVerbImport();

  const spanishButton_click = () => {
    navigate( "/spanish/list" );
  }

  const frenchButton_click = () => {
    navigate( "/french/list" );
  }

  const italianButton_click = () => {
    navigate( "/italian/list" );
  }

  return (
    <CommonLayout>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "20px", padding: "40px" }}>
        <h1>言語を選択してください</h1>
        <div style={{ display: "flex", gap: "20px" }}>
          <button onClick={spanishButton_click} style={{ padding: "15px 30px", fontSize: "1.2rem", cursor: "pointer" }}>スペイン語</button>
          <button onClick={frenchButton_click} style={{ padding: "15px 30px", fontSize: "1.2rem", cursor: "pointer" }}>フランス語</button>
          <button onClick={italianButton_click} style={{ padding: "15px 30px", fontSize: "1.2rem", cursor: "pointer" }}>イタリア語</button>
        </div>
        
        <div style={{ marginTop: "50px", padding: "30px", border: "2px dashed #28a745", borderRadius: "15px", backgroundColor: "#f9f9f9", textAlign: "center", width: "80%" }}>
          <p style={{ fontSize: "1.1rem", color: "#28a745", fontWeight: "bold" }}>
            ここに動詞のJSONファイルをドラッグ＆ドロップ！
          </p>
          <p style={{ fontSize: "0.9rem", color: "#666" }}>
            (自動的にデータベースに登録されます)
          </p>
        </div>
      </div>
    </CommonLayout>
  );
}

export default MainPage;
