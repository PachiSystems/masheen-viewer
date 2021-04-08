import { useCallback, useEffect, useState } from "react";

import urljoin from "url-join";

const useGet = <T>(endpoint: string) => {
    const [data, setData] = useState<T | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const fetchData = useCallback(async () => {
        setError("");
        setIsLoading(true);

        try {
            const apiBaseUrl = '/api/';
            if (!apiBaseUrl) {
                throw Error("No api base url set in env");
            }

            const response = await fetch(urljoin(apiBaseUrl, endpoint));

            if (!response.ok) {
                throw new Error(`API request failed - ${response.status}`);
            }

            setData(await response.json());
        } catch (e) {
            setError((e as Error).message);
        }

        setIsLoading(false);
    }, [endpoint]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return { data, isLoading, error, fetchData };
};

export default useGet;
