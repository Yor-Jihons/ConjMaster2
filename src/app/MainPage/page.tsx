import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../App.css';
import CommonLayout from '../layout';
import { useApi } from '../../contexts/ApiContext';

function MainPage() {
  const api = useApi();
  const navigate = useNavigate();

  useEffect(() => {
    const handleDrop = async (e: DragEvent) => {
      e.preventDefault();
      const files = e.dataTransfer?.files;
      if (files && files.length > 0) {
        for (const file of Array.from(files)) {
          // Electron環境では file.path でフルパスが取得可能です
          const filePath = (file as any).path;
          if (filePath && filePath.toLowerCase().endsWith(".json")) {
            const result = await api.importVerbJson(filePath);
            if (result.success) {
              alert(`「${result.name}」をデータベースにインポートしました！`);
            } else {
              alert(`インポート失敗: ${result.error}`);
            }
          }
        }
      }
    };

    const handleDragOver = (e: DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
    };

    window.addEventListener("drop", handleDrop);
    window.addEventListener("dragover", handleDragOver);
    
    return () => {
      window.removeEventListener("drop", handleDrop);
      window.removeEventListener("dragover", handleDragOver);
    };
  }, [api]);

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
        
        <div style={{ marginTop: "50px", padding: "30px", border: "2px dashed #ccc", borderRadius: "15px", backgroundColor: "#f9f9f9", textAlign: "center", width: "80%" }}>
          <p style={{ fontSize: "1.1rem", color: "#666" }}>
            ここに動詞のJSONファイルをドラッグ＆ドロップすると、<br />
            データベースに自動登録されます。
          </p>
        </div>
      </div>
    </CommonLayout>
  );
}

export default MainPage;
