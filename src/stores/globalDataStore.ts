import { create } from 'zustand';

interface State {
    hostName: string | undefined;
    frontendAddress: string | undefined;
    siteName: string;
    currentYear: number;
};

const useGlobalDataStore = create<State>(() => ({
    hostName: process.env.NEXT_PUBLIC_BACKEND_URL,
    frontendAddress: process.env.NEXT_PUBLIC_FRONTEND_URL,
    siteName: 'VTJesusLink',
    currentYear: new Date().getFullYear(),
}));

export default useGlobalDataStore;