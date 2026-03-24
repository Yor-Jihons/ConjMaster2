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
      console.log("Drop event detected");
      e.preventDefault();
      e.stopPropagation();
      
      const files = e.dataTransfer?.files;
      if (files && files.length > 0) {
        console.log(`Dropped ${files.length} files`);
        for (const file of Array.from(files)) {
          console.log("File name:", file.name);
          
          if (file.name.toLowerCase().endsWith(".json")) {
            try {
              // file.path ではなく file オブジェクトをそのまま渡す
              const result = await api.importVerbJson(file);
              console.log("Import result:", result);
              if (result.success) {
                alert(`「${result.name}」をデータベースにインポートしました！`);
              } else {
                alert(`インポート失敗: ${result.error}`);
              }
            } catch (err) {
              console.error("IPC Call Error:", err);
              alert("メインプロセスとの通信に失敗しました。再起動してビルドを確認してください。");
            }
          } else {
            console.log("Not a JSON file or path missing");
          }
        }
      }
    };

    const handleDragOver = (e: DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      if (e.dataTransfer) {
        e.dataTransfer.dropEffect = 'copy';
      }
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
