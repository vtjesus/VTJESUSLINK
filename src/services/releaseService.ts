const hostName: string | undefined = process.env.NEXT_PUBLIC_BACKEND_URL;

export async function createLink(albumUrl: string, userId: number | undefined): Promise <{ releaseSlug: string }> {

    try {
        const response = await fetch(`${hostName}/releasesRoute/getReleaseSpotifyUrl`, { 
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ albumUrl, userId })
        });

        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            throw new Error('Не вдалося надіслати URL альбому ' + response.statusText);
        }
    } catch (error) {
        throw new Error('Не вдалося надіслати URL альбому' + error);
    }
};

export async function removeReleaseById(releaseId: number): Promise <void> {

    try {
        const response = await fetch(`${hostName}/releasesRoute/${releaseId}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            return 
        } else {
            throw new Error('Не вдалося видалити реліз ' + response.statusText);
        }
    } catch (error) {
        throw new Error('Не вдалося видалити реліз' + error);
    }
};

export async function updateRelease(newUrls: {[key: number]: string}, platformsVisibility: {[key: number]: boolean}, releaseId: number) {

    try {
        const response = await fetch(`${hostName}/releasesRoute/${releaseId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ newUrls, platformsVisibility })
        })

        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            throw new Error('Не вдалося оновити реліз' + response.statusText);
        }
    } catch (error) {
        throw new Error('Не вдалося оновити реліз' + error);
    }
};