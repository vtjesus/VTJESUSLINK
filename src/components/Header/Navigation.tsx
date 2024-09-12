import Link from "next/link";
import { useUserStore } from "@/stores";
import { useEffect } from "react";
import './Navigation.scss';


interface NavItemProps {
    name: string,
    navTo: string
};

function NavItem({name, navTo, onItemClick}: NavItemProps & NavigationProps) {

    const handleClick = (): void => {
        onItemClick();
    }

    return (
        <Link className="navItem" href={navTo} onClick={handleClick}>
            <p>{name}</p>
        </Link>
    )
};


interface NavigationProps {
    onItemClick: () => void; 
}

export default function Navigation({onItemClick}: NavigationProps) {

   
    const isLogged: boolean = useUserStore(state => state.isLoggedIn);

    useEffect(() => {
    }, [isLogged]);

    const loggedOutNavItems: NavItemProps[] = [
        { name: 'Створіть безкоштовний акаунт', navTo: '/signup'},
        { name: 'Увійти', navTo: '/login'}
    ];

    const loggedInNavItems: NavItemProps[] = [
        { name: 'New vibrlink', navTo: '/new-link' },
        { name: 'My vibrlinks', navTo: '/my-links' }
    ];

    return (
        <div className="navItems-container">
            {isLogged ? 
                (
                    loggedInNavItems.map(item => (
                        <NavItem key={item.name} name={item.name} navTo={item.navTo} onItemClick={onItemClick}/>
                    ))
                ) 
                : 
                (
                    loggedOutNavItems.map(item => (
                        <NavItem key={item.name} name={item.name} navTo={item.navTo} onItemClick={onItemClick}/>
                    ))

                ) 
            }
        </div>
    )
}; 