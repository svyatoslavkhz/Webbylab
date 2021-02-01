import {useState, useCallback} from 'react';

export const useHttp = () => {
    const [loading, setLoading] = useState(false);

    const request = useCallback(async (url, method = 'GET', body = null, headers ={}) => {
        setLoading(true);
        const domain = 'http://localhost:4000/api/movie';
        try {
            if (body) {
                body = JSON.stringify(body);
                headers['Content-Type'] = 'Application/json';
            }
            const response = await fetch(`${domain}${url}`, {method, body, headers});
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Что-то пошло не так')
            }
            setLoading(false);
            return data
        } catch (e) {
            setLoading(false);
            throw e;
        }
    }, [])
    return {loading, request}
}