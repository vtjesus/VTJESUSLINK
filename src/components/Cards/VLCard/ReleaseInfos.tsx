import { Release } from "@/types/releaseTypes";
import './ReleaseInfos.scss';

interface ReleaseInfosProps {
    selectedRelease: Release;
}

export default function ReleaseInfos({selectedRelease}: ReleaseInfosProps) {
    return (
        <div className="release-infos">
            <p className="title">{selectedRelease.artist} - {selectedRelease.title}</p>
            <p className="mention">Выберите вашу платформу</p>
            <div className="triangle"></div>
        </div>
    )
};