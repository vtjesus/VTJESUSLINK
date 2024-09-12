import { useState, useEffect, FormEvent } from "react";
import { validateEmail, validatePassword, validateData, validateConfirmPassword } from "@/hooks/validateData";
import { useRouter } from "next/navigation";
import { register } from "@/services/authService";
import UserFormField from "./UserFormField";
import LoadingSpinner from "../Shared/LoadingSpinner";
import FormButton from "../Shared/FormButton";
import FormSuccessMessage from "./FormSuccessMessage";
import '../../assets/sass/forms-style.scss';

export default function SignupForm() {

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [isEmailValid, setEmailValid] = useState<boolean>(false);
    const [isPasswordValid, setPasswordValid] = useState<boolean>(false);
    const [isConfirmPasswordValid, setConfirmPasswordValid] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [successMessage, setSuccessMessage] = useState<boolean>(false);

    const router= useRouter();

    useEffect(() => {
        setEmailValid(validateEmail(email));
        setPasswordValid(validatePassword(password));
        setConfirmPasswordValid(validateConfirmPassword(password, confirmPassword));
    }, [email, password, confirmPassword]);


    const signup = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        setIsLoading(true);

        if (!validateData(email, password) || !validateConfirmPassword(password, confirmPassword)) {
            console.error('Невірний формат електронної пошти або пароля');
            handleErrorAndApply();
            return;
        }

        try {
            const data = await register(email, password);
            setIsLoading(false);
            setSuccessMessage(true);
            return data;

        } catch (error) {
            handleErrorAndApply();
            console.error('Помилка під час реєстрації: ' + error);
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
        setEmail('');
        setPassword('');
        setConfirmPassword('');
    };
    
    return (
        <>
            {successMessage ? (
                    <FormSuccessMessage 
                        message="Ваш акаунт успішно створено!"
                        buttonName="Увійдіть у свій акаунт"
                        onClick={() => router.push('/login')}
                    />
                )
                :
                (
                    <form onSubmit={signup}>
                        <UserFormField 
                            label="Електронна пошта" 
                            type="email" 
                            name="Емейл" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)}
                            isValid={isEmailValid}
                        />
                        <UserFormField 
                            label="Створити пароль" 
                            type="password" 
                            name="пароль" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)}
                            mention="8 символів, 1 велика літера, 1 мала літера, 1 цифра і 1 спеціальний символ" 
                            className="password-input" 
                            isValid={isPasswordValid}
                        />
                        <UserFormField 
                            label="Підтвердіть ваш пароль" 
                            type="password" 
                            name="підтвердити-пароль" 
                            value={confirmPassword} 
                            onChange={(e) => setConfirmPassword(e.target.value)} 
                            mention="повинен збігатися з вашим паролем"
                            className="password-input" 
                            isValid={isConfirmPasswordValid && !!confirmPassword}
                        />
                        {errorMessage && <p className="error-message">Ця електронна пошта вже існує або ваші паролі не збігаються!</p>}
                        {isLoading ? (
                            <div className="spinner-container">
                                <LoadingSpinner />
                            </div>
                        ) : <FormButton type="submit" name="Увійдіть" />}
                    </form>
                )
            }
        </>
    )
}