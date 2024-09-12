"use client"

import MainLayout from "../_layouts/MainLayout";
import useRedirectIfLoggedIn from "@/hooks/useRedirectIfLoggedIn";
import { useState } from "react";
import LoginForm from "@/components/User-forms/LoginForm";
import AskResetPasswordForm from "@/components/User-forms/AskResetPasswordForm";
import FormPageMessage from "@/components/Shared/FormPageMessage";
import StyledSeparator from "@/components/Shared/StyledSeparator";
import '../../assets/sass/pages-common-styles.scss';
import '../../assets/sass/messageAndFormContainer.scss';
import '../../assets/sass/form-container.scss';

export default function LoginPage() {

    useRedirectIfLoggedIn();

    const [isLoginFormVisible, setIsLoginFormVisible] = useState(true);

    const hideLoginForm = (): void => {
        setIsLoginFormVisible(false)
    };

    const showLoginForm = (): void => {
        setIsLoginFormVisible(true)
    };

    const mainTextPrimary: string = 'Радий';
    const mainTextSecondary: string = ' зустрітися з вами знову ';
    const subText: string = 'Увійдіть у свій акаунт і керуйте всіма своїми vtjesuslinks або просто створіть новий!';

    const mainTextPrimary2: string = 'Упс';
    const mainTextSecondary2: string = ' Схоже, ви забули свій пароль';
    const subText2: string = 'Не хвилюйтеся, якщо ваша електронна пошта вже є в нашій базі даних, ми надішлемо вам посилання для скидання пароля, щоб ви могли вибрати інший!';

    return (
        <>
            <MainLayout>
                <div className="page">
                    <div className="content">
                        {
                            isLoginFormVisible ?

                            <div className="message-and-form-container">
                                <FormPageMessage mainTextPrimary={mainTextPrimary} mainTextSecondary={mainTextSecondary} subText={subText} />
                                <StyledSeparator icon="game-icons:brain-freeze" />
                                <div className="form-container">
                                    <LoginForm />
                                    <p className="option" onClick={hideLoginForm}>Я забув свій пароль</p>
                                </div>
                            </div>
                            
                        :
                            <div className="message-and-form-container">
                                <FormPageMessage mainTextPrimary={mainTextPrimary2} mainTextSecondary={mainTextSecondary2} subText={subText2} />
                                <StyledSeparator icon="emojione-monotone:face-screaming-in-fear" />
                                <div className="form-container">
                                    <AskResetPasswordForm />
                                    <p className="option" onClick={showLoginForm}>Back to sign in</p>
                                </div>
                            </div>
                        }    
                    </div>
                </div>
            </MainLayout>
        </>
    )
};