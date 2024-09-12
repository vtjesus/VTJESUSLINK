import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { validatePassword, validateConfirmPassword } from "@/hooks/validateData";
import { resetPassword } from "@/services/authService";
import { useRouter } from "next/navigation";
import UserFormField from "./UserFormField";
import LoadingSpinner from "../Shared/LoadingSpinner";
import FormButton from "../Shared/FormButton";
import '../../assets/sass/forms-style.scss';

export default function ResetPasswordForm() {

    const [newPassword, setNewPassword] = useState<string>('');
    const [confirmNewPassword, setConfirmNewPassword] = useState<string>('');
    const [isNewPasswordValid, setIsNewPasswordValid] = useState<boolean>(false);
    const [isConfirmNewPasswordValid, setIsConfirmNewPasswordValid] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const {token} = useParams();
    const router = useRouter();

    useEffect(() => {
        setIsNewPasswordValid(validatePassword(newPassword));
        setIsConfirmNewPasswordValid(validateConfirmPassword(newPassword, confirmNewPassword));
    }, [newPassword, confirmNewPassword]);

    const resetUserPassword = async(e: React.FormEvent<HTMLFormElement>): Promise <void> => {
        e.preventDefault();
        setIsLoading(true);

        if (!validatePassword(newPassword) || !validateConfirmPassword(newPassword, confirmNewPassword)) {
            console.error('Невірний формат пароля');
            return;
        }

        try {

            if (!token) {
                console.error('Токен не визначено');
                return;
            }

            await resetPassword(token, newPassword);
            setIsLoading(false);
            router.push('/login');
            
        } catch (error) {
            setErrorMessage(true);
            setIsLoading(false);
            setTimeout(() => {
                setErrorMessage(false);
                resetForm();
            }, 3000);
            console.error('Помилка під час скидання пароля: ', error);
        }
    };

    const resetForm = (): void => {('');
        setNewPassword('');
        setConfirmNewPassword('');
    };

    return (
        <form onSubmit={resetUserPassword}>
            <UserFormField 
                label="Створіть новий пароль" 
                type="password" 
                name="пароль" 
                value={newPassword} 
                onChange={(e) => setNewPassword(e.target.value)}
                mention="8 символів, 1 велика літера, 1 мала літера, 1 цифра і 1 спеціальний символ" 
                className="password-input" 
                isValid={isNewPasswordValid}
            />
            <UserFormField 
                label="Підтвердіть свій новий пароль" 
                type="password" 
                name="підтвердити-пароль" 
                value={confirmNewPassword} 
                onChange={(e) => setConfirmNewPassword(e.target.value)} 
                mention="повинен збігатися з вашим новим паролем"
                className="password-input" 
                isValid={isConfirmNewPasswordValid && !!confirmNewPassword}
            />
            {errorMessage && <p className="error-message">Помилка під час скидання пароля!</p>}
            {isLoading ? (
                <div className="spinner-container">
                    <LoadingSpinner />
                </div>
            ) : <FormButton type="submit" name="Сбросити ваш пароль" />}
        </form>
    )
}