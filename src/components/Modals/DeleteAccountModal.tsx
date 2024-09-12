import { useUserStore, useModalStore } from "@/stores";
import { deleteAccount } from "@/services/authService";
import { useRouter } from "next/navigation";
import Modal from "./Modal";

export default function DeleteAccountModal() {

    const { isDeleteAccountModalOpen, closeDeleteAccountModal } = useModalStore();
    const userStore = useUserStore();
    const router = useRouter();

    const deleteUserAccount = async(): Promise<void> => {

        const userId: number | undefined = userStore.user?.id

        if (!userId) {
            console.error('Користувач не знайдений');
            return
        }

        try {
            await deleteAccount(userId);
            closeDeleteAccountModal();
            userStore.logOutUser();
            router.push('/');

        } catch (error) {
            console.error('Помилка під час видалення акаунта користувача', error);
        }
    };

    const handleCancel = (): void => {
        closeDeleteAccountModal();
    };
    
    return (
        <>
            {isDeleteAccountModalOpen && (
                <Modal 
                    icon="mdi:skull-crossbones"
                    topline="Ви впевнені, що хочете видалити свій акаунт??"
                    message="Це безповоротно видалить ваш акаунт і всі ваші дані."
                    onConfirm={deleteUserAccount}
                    onCancel={handleCancel}
                />
            )}
        </>
    )
}