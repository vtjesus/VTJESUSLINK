import { useState, FormEvent } from "react";
import { sendResetLink } from "@/services/authService";
import UserFormField from "./UserFormField";
import LoadingSpinner from "../Shared/LoadingSpinner";
import FormButton from "../Shared/FormButton";
import FormSuccessMessage from "./FormSuccessMessage";
import '../../assets/sass/forms-style.scss';

export default function AskResetPasswordForm() {

    const [emailToCheck, setEmail] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [successMessage, setSuccessMessage] = useState<boolean>(false);

    const askResetLink = async(e: FormEvent<HTMLFormElement>): Promise <void> => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const data = await sendResetLink(emailToCheck);
            setIsLoading(false);
            setSuccessMessage(true);
            return data;

        } catch (error) {
            setErrorMessage(true);
            setIsLoading(false);
            setTimeout(() => {
                setErrorMessage(false);
                resetForm();
            }, 3000);
            console.error('Помилка під час запиту на скидання пароля:', error);
        }
    };

    const resetForm = (): void => {
        setEmail('');
    };

    return (
        <>
            {successMessage ? (
                    <FormSuccessMessage
                        message="Посилання для скидання пароля було надіслано на вашу електронну пошту. Будь ласка, перевірте свою поштову скриньку!"
                    />
                )
                :
                (
                    <form onSubmit={askResetLink}>
                        <UserFormField 
                            label="Електронна пошта" 
                            type="email" 
                            name="пошта" 
                            value={emailToCheck} 
                            onChange={(e) => setEmail(e.target.value)} 
                        />
                        {errorMessage && <p className="error-message">Email unknown !</p>}
                        {isLoading ? (
                            <div className="spinner-container">
                                <LoadingSpinner />
                            </div>
                        ) : <FormButton type="submit" name="Надіслати лист для скидання пароля" />}
                    </form>
                )
            } 
        </>     
    )
}