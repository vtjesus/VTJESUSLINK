import type { Release, Platform } from "../types/releaseTypes";
import { unstable_noStore as noStore } from 'next/cache';

const hostName: string | undefined = process.env.NEXT_PUBLIC_BACKEND_URL;

// fetch the releases data by userId 
export async function fetchReleasesData(userId: number): Promise<Release[]> {

    try {
        
        const response = await fetch(`${hostName}/releasesRoute/releases/${userId}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });

        if (!response.ok) {
            throw new Error ('Помилка при отриманні даних ');
        }

        const data = await response.json();

        if (!data.formattedReleases) {
            console.error('Невірний формат відповіді:', data);
            throw new Error('Невірний формат відповіді');
        };

        data.formattedReleases.forEach((release: Release) => {
            release.platforms.forEach((platform: Platform) => {
                platform.visibility = !!platform.visibility;
            });
        });
        
        return data.formattedReleases;

    } catch (error) {
        console.error('Помилка при отриманні даних', error);
        throw error;
    }
};

export async function fetchReleaseDataBySlug(releaseSlug: string): Promise<Release> {
    
    noStore();

    try {

        const response = await fetch(`${hostName}/releasesRoute/release/${releaseSlug}`);

        if (!response.ok) {
            throw new Error ('Помилка при отриманні даних релізу');
        }

        const data = await response.json();

        if (!data.releaseData || data.releaseData.length === 0) {
            console.error('Невірний формат відповіді:', data);
            throw new Error('евірний формат відповіді');
        };

        const releaseData = data.releaseData[0];
        releaseData.platforms.forEach((platform: Platform) => {
            platform.visibility = !!platform.visibility;
        });
        
        return releaseData;

    } catch (error) {
        console.error('Помилка при отриманні даних        ', error);
        throw error;
    }
};