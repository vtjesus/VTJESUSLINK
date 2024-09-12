import { MouseEventHandler } from "react";
import { useRouter } from "next/navigation";
import { useUserStore, useModalStore } from "@/stores";
import { Icon } from '@iconify/react';
import './HoverUserMenu.scss';

// local component for an item
interface UserItem {
    name: string;
    icon: string;
    onClick: MouseEventHandler<HTMLDivElement>;
};

function UserItem({name, icon, onClick}: UserItem) {
    return (
        <div className="item-container" onClick={onClick}>
            <Icon icon={icon} className='icon'/>
            <p>{name}</p>
        </div>
    )
};

export default function HoverUserMenu() {

    
    const user = useUserStore(state => state.user );

    const router = useRouter();
    const navToSettings = (): void => {
        router.push('/account-settings');
    };

    const { openSignOutModal } = useModalStore();

    return (
        <div className="hover-user-menu">
            <div className="items-container">
                <div className="userEmail-container">
                    <Icon icon="" className='icon'/>
                    <p>{user?.email}</p>
                </div>
                <UserItem name="Настройки аккаунта" icon="mdi:tools" onClick={navToSettings} />
                <UserItem name="Выйти" icon="material-symbols:logout-sharp" onClick={openSignOutModal} />
            </div>
        </div>
    )
};