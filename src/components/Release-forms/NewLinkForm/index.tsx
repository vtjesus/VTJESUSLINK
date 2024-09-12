"use client"

import { useState } from "react";
import { useUserStore, useReleaseStore } from "@/stores";
import { createLink } from "@/services/releaseService";
import { useRouter } from "next/navigation";
import FormButton from "../../Shared/FormButton";
import LoadingSpinner from "../../Shared/LoadingSpinner";
import { validateSpotifyUrl } from "@/hooks/validateSpotifyUrl";
import './NewLinkForm.scss';

export default function NewLinkForm() {

    const [albumUrl, setAlbumUrl] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const spotifyPrefix: string = "https://open.spotify.com/intl-fr/album/";
    const userStore = useUserStore();
    const releaseStore = useReleaseStore();
    const router = useRouter();

    const sendSpotifyUrlAndUserId = async (e: React.FormEvent<HTMLFormElement>): Promise <void> => {
        e.preventDefault();
        setIsLoading(true);

        if (!validateSpotifyUrl(albumUrl)) {
            setIsLoading(false);
            setErrorMessage(true);
            setTimeout(() => {
                setErrorMessage(false);
            }, 3000);
            return;
        }

        const userId: number | undefined = userStore.user?.id;

        try {
            const data  = await createLink(albumUrl, userId);

            setIsLoading(false);

            const releaseSlug: string = data.releaseSlug;
        
            if (userId) {
              await releaseStore.loadReleasesData(userId);
              router.push(`/link-editor/${releaseSlug}`);
            }
            
          } catch (error) {
            setErrorMessage(true);
            setIsLoading(false);
            setTimeout(() => {
                setErrorMessage(false);
            }, 3000);
            console.error('Не вдалося надіслати URL альбому: ', error);
          }
    }

    return (
        <form onSubmit={sendSpotifyUrlAndUserId}>
            <div className="input-container">
                <label htmlFor="spotifyId">Введіть посилання на ваш реліз у Spotify:</label>
                <div className="newLinkForm-input-wrapper">
                    <p>приклад: &quot;{spotifyPrefix}...&quot;</p>
                    <input 
                        className="input" 
                        type="text" 
                        name="albumUrl" 
                        id="albumUrl" 
                        required 
                        onChange={(e) => setAlbumUrl(e.target.value)}
                    />
                </div>
            </div>
            {errorMessage && <p className="error-message">Це не дійсне посилання або реліз вже існує!</p>}
            {isLoading ? (
                <div className="spinner-container">
                    <LoadingSpinner />
                </div>
            ) : <FormButton type="submit" name="Створіть ваше посилання" />}
        </form>
    )
}