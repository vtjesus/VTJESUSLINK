"use client"

import { openInANewTab } from "@/hooks/openInANewTab";
import { useGlobalDataStore } from "@/stores";
import './Watermark.scss';

export default function Watermark() {

    const {siteName, frontendAddress} = useGlobalDataStore();
    
    return (
        <div className="watermark">
            <p>Створіть свій на <span onClick={() => openInANewTab(`${frontendAddress}`)}>{siteName}</span></p>
        </div>
    )
}