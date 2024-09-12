"use client"

import MainLayout from "@/app/_layouts/MainLayout";
import useRedirectIfLoggedOut from "@/hooks/useRedirectIfLoggedOut";
import { useParams } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { Release } from "@/types/releaseTypes";
import { useReleaseStore, useUserStore } from "@/stores";
import DashboardReleaseCard from "@/components/Cards/DashboardReleaseCard";
import LinkEditorForm from "@/components/Release-forms/LinkEditorForm";
import LoadingSpinner from "@/components/Shared/LoadingSpinner";
import PageTitle from "@/components/Shared/PageTitle";
import '../../../assets/sass/pages-common-styles.scss';
import './LinkEditorPage.scss';

export default function LinkEditorPage() {

    useRedirectIfLoggedOut();

    const { releaseSlug: encodedReleaseSlug } = useParams();
    const releaseSlug: string = decodeURIComponent(String(encodedReleaseSlug)); 

    const [selectedRelease, setSelectedRelease] = useState<Release | null>(null);
    const releaseStoreRef = useRef(useReleaseStore());
    const userIdRef = useRef(useUserStore().user?.id);

    useEffect(() => {
        const initialize = async () => {
            await releaseStoreRef.current.initializeStore(Number(userIdRef.current));
            const release = await releaseStoreRef.current.getReleaseBySlug(String(releaseSlug));
            setSelectedRelease(release || null);
        };
        initialize();
    }, [releaseSlug]);

    return (
        <>
            <MainLayout>
                <div className="page">
                    <div className="content">
                        {selectedRelease ? (
                            <>
                                <PageTitle mainPart="Редагувати" secondaryPart="ваші посилання"/>
                                <div className="linkEditor-wrapper">
                                    <DashboardReleaseCard release={selectedRelease} />
                                    <LinkEditorForm selectedRelease={selectedRelease} />
                                </div>
                            </>
                        ) 
                        : 
                        <LoadingSpinner />}   
                    </div>
                </div>
            </MainLayout>
        </>
    )
};