"use client"

import MainLayout from "../_layouts/MainLayout";
import { useRouter } from "next/navigation";
import useRedirectIfLoggedIn from "@/hooks/useRedirectIfLoggedIn";
import FormPageMessage from "@/components/Shared/FormPageMessage";
import StyledSeparator from "@/components/Shared/StyledSeparator";
import SignupForm from "@/components/User-forms/SignupForm";
import '../../assets/sass/pages-common-styles.scss';
import '../../assets/sass/messageAndFormContainer.scss';
import '../../assets/sass/form-container.scss';

export default function SignupPage() {

    useRedirectIfLoggedIn();

    const router = useRouter();
    
    const mainTextPrimary: string = 'Створить';
    const mainTextSecondary: string = ' безкоштовний акаунт';
    const subText: string = 'Розпочнімо і насолоджуйтеся використанням нашого сервісу, створивши свій акаунт. Це безкоштовно!';

    return (
        <>
            <MainLayout>
                <div className='page'>
                    <div className="content">
                        <div className="message-and-form-container">
                            <FormPageMessage mainTextPrimary={mainTextPrimary} mainTextSecondary={mainTextSecondary} subText={subText} />
                            <StyledSeparator icon="simple-icons:freepik" />
                            <div className="form-container">
                                <SignupForm />
                                <p className="option" onClick={() => router.push('/login')}>Вже маєте акаунт? Увійдіть</p>
                            </div>
                        </div>
                    </div>
                </div>
            </MainLayout>
        </>
    )
};