/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from 'react';
import { useApi } from '../contexts/ApiContext';
import createLanguageDefinition from '../utils/CreateLanguageDefinition';

export default function useVerbDetail( language: string, id: number ){
    const langDef = createLanguageDefinition( language! );
    const api = useApi();
    const [verbData, setVerbData] = useState<any>(null);

    useEffect(() => {
        const fetchDetail = async () => {
            const result = await api.getVerbDetail(Number(id));
            if (result) {
                // DBには 'data' カラムに JSON 文字列として入っているのでパースする
                result.conjugations = JSON.parse(result.data);
                setVerbData(result);
            }
        };
        fetchDetail();
    }, [id, api]);

    return { langDef, verbData };
}
