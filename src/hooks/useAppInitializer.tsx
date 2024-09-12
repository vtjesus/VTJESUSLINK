import { useUserStore, useReleaseStore } from '@/stores';
import isTokenExpired from './checkUserTokenExpiry';
import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';

export default function useAppInitializer(): boolean {
    const [loading, setLoading] = useState<boolean>(true);

    const appInitializationLoading: boolean = useAppInitialization();
    useTokenExpirationCheck();

    useEffect(() => {
        setLoading(appInitializationLoading);
    }, [appInitializationLoading]);

    return loading;
};

function useAppInitialization(): boolean {

    const userStoreRef = useRef(useUserStore());
    const releaseStoreRef = useRef(useReleaseStore());
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const initApp = async (): Promise<void> => {
            try {
                await userStoreRef.current.loadUserDataFromLocalStorage();
                const token = localStorage.getItem('token');

                if (token) {
                    userStoreRef.current.setToken(token);
                    const userId = userStoreRef.current.user?.id;

                    if (userId) {
                        await releaseStoreRef.current.loadReleasesData(userId);
                    }
                }
            } catch (error) {
                console.error('Помилка при отриманні даних: ', error);
            } finally {
                setLoading(false);
            }
        };

        initApp();
    }, []);

    return loading; 
};


function useTokenExpirationCheck(): void {
    
    const userStore = useUserStore();
    const router = useRouter();

    useEffect(() => {

        const checkToken = (): void => {
            const token = localStorage.getItem('token');
            if(token && isTokenExpired(token)) {
                userStore.logOutUser();
            } 
        };

        checkToken();

        const checkTokenExpiration = setInterval(checkToken, 3600000);
        return () => clearInterval(checkTokenExpiration);

    }, [userStore, router]);
};