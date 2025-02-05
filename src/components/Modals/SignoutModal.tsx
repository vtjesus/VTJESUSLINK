import { useModalStore, useUserStore, useReleaseStore } from "@/stores";
import { useRouter } from "next/navigation";
import Modal from "./Modal";

export default function SignoutModal() {

    const { isSignOutModalOpen, closeSignOutModal } = useModalStore();
    const releaseStore = useReleaseStore();
    const userStore = useUserStore();
    const router = useRouter();

    const handleSignoutAndNavToHomePage = (): void => {
        releaseStore.releases = [];
        userStore.logOutUser();
        closeSignOutModal();
        router.push('/');
    };

    const handleCancel = (): void => {
        closeSignOutModal();
    };

    return (
        <>
            {isSignOutModalOpen && (
                <Modal 
                    icon="material-symbols:question-mark"
                    topline="Ви впевнені ?"
                    message="Підтвердьте, щоб вийти."
                    onConfirm={handleSignoutAndNavToHomePage}
                    onCancel={handleCancel}
                />
            )}
        </>
    )
};