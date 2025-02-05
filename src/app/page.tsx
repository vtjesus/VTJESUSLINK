import type { Metadata } from "next";
import MainLayout from "./_layouts/MainLayout";
import Hero from "@/components/Home-Page/Hero";
import '../assets/sass/pages-common-styles.scss';

export const metadata: Metadata = {
    title: "VTJESUSLINK | Home",
};

export default function HomePage() {

    return (
        <>
            <MainLayout>
                <div className='page'>
                    <div className="content">
                        <Hero />
                    </div>
                </div>
            </MainLayout>
        </>
    );
};