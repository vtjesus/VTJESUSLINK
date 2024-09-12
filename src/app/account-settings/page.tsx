"use client"

import MainLayout from "../_layouts/MainLayout";
import useRedirectIfLoggedOut from "@/hooks/useRedirectIfLoggedOut";
import FormPageMessage from "@/components/Shared/FormPageMessage";
import StyledSeparator from "@/components/Shared/StyledSeparator";
import UpdatePasswordForm from "@/components/User-forms/UpdatePasswordForm";
import Separator from "@/components/Shared/Separator";
import DeleteAccount from "@/components/User-forms/DeleteAccount";
import '../../assets/sass/pages-common-styles.scss';
import '../../assets/sass/messageAndFormContainer.scss';
import '../../assets/sass/form-container.scss';

export default function AccountSettingsPage() {

    useRedirectIfLoggedOut();

    const mainTextPrimary: string = 'Безпека    ';
    const mainTextSecondary: string = ' перший';
    const subText: string = 'Схоже, вам потрібно оновити пароль. Виберіть унікальний пароль для підвищення безпеки!';

    return (
        <>
            <MainLayout>
                <div className="page">
                    <div className="content">
                        <div className="message-and-form-container">
                            <FormPageMessage mainTextPrimary={mainTextPrimary} mainTextSecondary={mainTextSecondary} subText={subText} />
                            <StyledSeparator icon="game-icons:police-officer-head" />
                            <div className="form-container">
                                <UpdatePasswordForm />
                                <Separator />
                                <DeleteAccount />
                            </div>
                        </div>
                    </div>
                </div>
            </MainLayout>
        </>
    )
}