import { useModalStore, useUserStore, useReleaseStore } from "@/stores";
import { useState, useEffect } from "react";
import { removeReleaseById } from "@/services/releaseService";
import Modal from "./Modal";

export default function RemoveReleaseModal() {

    const { isRemoveReleaseModalOpen, modalReleaseId, closeRemoveReleaseModal } = useModalStore();
    const releaseStore = useReleaseStore();
    const userStore = useUserStore();
    const userId = userStore.user?.id;

    const [releaseTitle, setReleaseTitle] = useState<string | null>(null);

    useEffect(() => {
        if (modalReleaseId !== null) {
            releaseStore.getReleaseById(modalReleaseId)
                .then(release => {
                    if (release) {
                        setReleaseTitle(release.title);
                    }
                })
                .catch(error => {
                    console.error('Помилка під час отримання випуску:', error);
                });
        }
    }, [modalReleaseId, releaseStore]);

    const removeRelease = async (): Promise <void> => {

        if (modalReleaseId === null) {
            console.error('modalReleaseId має значення null');
            return;
        }

        try {
            await removeReleaseById(modalReleaseId); 
            if (userId) {
                releaseStore.loadReleasesData(userId);
            }
            closeRemoveReleaseModal();
        } catch (error) {
            console.error('Помилка під час видалення випуску:', error);
        }
    };

    const handleCancel = (): void => {
        closeRemoveReleaseModal();
    };

    return (
        <>
            {isRemoveReleaseModalOpen && (
                <Modal 
                    icon="mdi:skull-crossbones"
                    topline={`Ви впевнені, що хочете видалити "${releaseTitle}?"`}
                    message="Це точно видалить цей випуск."
                    onConfirm={() => {
                        if (modalReleaseId !== null) {
                            removeRelease();
                        }
                    }}
                    onCancel={handleCancel}
                />
            )}
        </>
    )
};