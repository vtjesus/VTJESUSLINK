import { useState, useEffect, FormEvent } from "react";
import { validatePassword, validateConfirmPassword } from "@/hooks/validateData";
import { updatePassword } from "@/services/authService";
import { useUserStore } from "@/stores";
import { useRouter } from "next/navigation";
import UserFormField from "./UserFormField";
import LoadingSpinner from "../Shared/LoadingSpinner";
import FormButton from "../Shared/FormButton";
import FormSuccessMessage from "./FormSuccessMessage";
import '../../assets/sass/forms-style.scss';

export default function UpdatePasswordForm() {

    const [currentPassword, setCurrentPassword] = useState<string>('');
    const [newUserPassword, setNewUserPassword] = useState<string>('');
    const [confirmNewUserPassword, setConfirmNewUserPassword] = useState<string>('');
    const [isNewUserPasswordValid, setIsNewUserPasswordValid] = useState<boolean>(false);
    const [isConfirmNewUserPasswordValid, setIsConfirmNewUserPasswordValid] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [successMessage, setSuccessMessage] = useState<boolean>(false);
    
    const userStore = useUserStore();
    const router = useRouter();

    useEffect(() => {
        setIsNewUserPasswordValid(validatePassword(newUserPassword));
        setIsConfirmNewUserPasswordValid(validateConfirmPassword(newUserPassword, confirmNewUserPassword));
    }, [newUserPassword, confirmNewUserPassword]);

    const updateUserPassword = async(e: FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        setIsLoading(true);

        if (!validatePassword(newUserPassword) || !validateConfirmPassword(newUserPassword, confirmNewUserPassword)) {
            console.error('Невірний формат пароля');
            handleErrorAndApply();
            return;
        }

        const token: string | null = localStorage.getItem('token');
        
        if (!token) {
            console.error('Токен не знайдено в localStorage');
            return;
        }

        const tokenParts: string[] = token.split('.');
        const tokenPayload: any = JSON.parse(atob(tokenParts[1]));
        const userId: any = tokenPayload.userId;

        try {
            const data = await updatePassword(token, userId, currentPassword, newUserPassword);
            setIsLoading(false);
            userStore.logOutUser();
            setSuccessMessage(true);
            return data;

        } catch (error) {
            handleErrorAndApply();
            console.error('Помилка під час оновлення пароля: ', error);
        }
    };

    const handleErrorAndApply = (): void => {
        setErrorMessage(true);
            setIsLoading(false);
            setTimeout(() => {
                setErrorMessage(false);
                resetForm();
            }, 3000);
    };

    const resetForm = (): void => {
        setCurrentPassword('');
        setNewUserPassword('');
        setConfirmNewUserPassword('');
    };

    return (
        <>
            {successMessage ? (
                    <FormSuccessMessage
                        message="Пароль успішно оновлено!"
                        buttonName="Назад до входу"
                        onClick={() => router.push('/login')}
                     />
                )
                :
                (
                    <form onSubmit={updateUserPassword}>
                        <UserFormField 
                            label="Введіть свій поточний пароль" 
                            type="password" 
                            name="пароль" 
                            value={currentPassword} 
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            className="password-input" 
                        />
                        <UserFormField 
                            label="Створити новий пароль" 
                            type="password" 
                            name="пароль" 
                            value={newUserPassword} 
                            onChange={(e) => setNewUserPassword(e.target.value)}
                            mention="8 символів, 1 велика літера, 1 мала літера, 1 цифра і 1 спеціальний символ" 
                            className="password-input" 
                            isValid={isNewUserPasswordValid}
                        />
                        <UserFormField 
                            label="Підтвердіть свій новий пароль" 
                            type="password" 
                            name="підтвердити пароль" 
                            value={confirmNewUserPassword} 
                            onChange={(e) => setConfirmNewUserPassword(e.target.value)} 
                            mention="повинен збігатися з вашим новим паролем"
                            className="password-input" 
                            isValid={isConfirmNewUserPasswordValid && !!confirmNewUserPassword}
                        />
                        {errorMessage && <p className="error-message">еправильний поточний пароль або невірний формат нового пароля!</p>}
                        {isLoading ? (
                            <div className="spinner-container">
                                <LoadingSpinner />
                            </div>
                        ) : <FormButton type="submit" name="Оновіть ваш пароль" />}
                    </form>
                )
            }
        </>
    )
}