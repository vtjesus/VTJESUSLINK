"use client"

import MainLayout from "../_layouts/MainLayout";
import useRedirectIfLoggedOut from "@/hooks/useRedirectIfLoggedOut";
import NewLinkForm from "@/components/Release-forms/NewLinkForm";
import FormPageMessage from "@/components/Shared/FormPageMessage";
import StyledSeparator from "@/components/Shared/StyledSeparator";
import '../../assets/sass/pages-common-styles.scss';
import '../../assets/sass/messageAndFormContainer.scss';
import '../../assets/sass/form-container.scss';

export default function NewLinkPage() {

    useRedirectIfLoggedOut();

    const mainTextPrimary: string = 'Розпочати';
    const mainTextSecondary: string = ' введіть посилання на ваш реліз у Spotify';
    const subText: string = 'Він автоматично створить новий vibrlink із посиланнями на Spotify, Deezer і YouTube. Потім ви зможете додати посилання на інші платформи та керувати ними за вашим бажанням. Поїхали!';

    return (
        <> 
            <MainLayout>
                <div className="page">
                    <div className="content">
                        <div className="message-and-form-container">
                            <FormPageMessage mainTextPrimary={mainTextPrimary} mainTextSecondary={mainTextSecondary} subText={subText} />
                            <StyledSeparator icon="ph:music-notes-simple-fill" />
                            <div className="form-container">
                                <NewLinkForm />
                            </div>
                        </div>
                    </div>
                </div>
            </MainLayout>
        </>
    )
}