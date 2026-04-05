/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from 'react';
import { useApi } from '../contexts/ApiContext';

export default function useVerbList( language: string | undefined ){
    const api = useApi();
    const [verbs, setVerbs] = useState<any[]>([]);

    useEffect(() => {
        const fetchVerbs = async () => {
            const data = await api.getVerbs(language!);
            setVerbs(data);
        };
        fetchVerbs();
    }, [language, api]);

    return { verbs }
}
