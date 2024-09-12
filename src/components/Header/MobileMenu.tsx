import Navigation from './Navigation';
import './MobileMenu.scss';

interface MobileMenuProps {
    isOpen: boolean;
    closeMenu: () => void;
}

export default function MobileMenu({isOpen, closeMenu}: MobileMenuProps) {

    return (
        <div className={`mobile-menu ${!isOpen ? "hidden-menu" : ""}`}>
            
            <Navigation onItemClick={closeMenu}/> 
        </div>
    )
}