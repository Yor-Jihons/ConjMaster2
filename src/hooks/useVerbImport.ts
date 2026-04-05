import { useEffect } from 'react';
import { useApi } from '../contexts/ApiContext';

export default function useVerbImport(){
    const api = useApi();

    useEffect(() => {
        const handleDrop = async (e: DragEvent) => {
            e.preventDefault();
            e.stopPropagation();

            const files = e.dataTransfer?.files;
            if (files && files.length > 0) {
                for (const file of Array.from(files)) {
                    if (file.name.toLowerCase().endsWith(".json")) {
                        try {
                            // file.path ではなく file オブジェクトをそのまま渡す
                            const result = await api.importVerbJson(file);
                            if (result.success) {
                                alert(`「${result.name}」をデータベースにインポートしました！`);
                            } else {
                                alert(`インポート失敗: ${result.error}`);
                            }
                        } catch (err: unknown) {
                            console.error("IPC Call Error:", (err as Error));
                            alert("メインプロセスとの通信に失敗しました。再起動してビルドを確認してください。");
                        }
                    } else {
                        alert("Not a JSON file or path missing");
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
}
