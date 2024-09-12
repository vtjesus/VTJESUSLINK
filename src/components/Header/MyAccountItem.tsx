import { useState } from "react";
import { useUserStore } from "@/stores";
import HoverUserMenu from './HoverUserMenu';
import './MyAccountItem.scss';

export default function MyAccountItem() {

    
    const isLogged: boolean = useUserStore(state => state.isLoggedIn);

    
    const [isHoverUserMenuVisible, setIsHoverUserMenuVisible] = useState<boolean>(false);
    
    const handleEmailMouseEnter = (): void => {
        setIsHoverUserMenuVisible(true);
    };

    const handleEmailMouseLeave = (): void => {
        setIsHoverUserMenuVisible(false);
    };

    return (
        <div className="myAccountItem-container">
            {isLogged && (
                <div
                    className="myAccountItem"
                    onMouseEnter={handleEmailMouseEnter}
                    onMouseLeave={handleEmailMouseLeave}
                >
                    <p>Мой аккаунт</p>
                    {isHoverUserMenuVisible && (<HoverUserMenu />)}
                </div>
            )}  
        </div>
    )
}