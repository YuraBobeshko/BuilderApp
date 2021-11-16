import {useEffect, useState} from "react";

interface IUseLoading<T> {
    data: null | T
    loading: boolean
    error: string | null
}

function useLoading <T>(callBack: Promise<T>):IUseLoading<T> {
    const [data, setData] = useState<T | null>(null);
    const [error, setError] = useState<null | string>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        callBack
            .then((res: T) => setData(res))
            .catch(() => setError('Error!'))
            .finally(() => setLoading(false))
    }, [callBack]);

    return {data, error, loading}
}

export default useLoading;
