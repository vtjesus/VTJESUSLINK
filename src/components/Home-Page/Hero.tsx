"use client"

import { useEffect } from 'react';
import { useUserStore } from '@/stores';
import { useRouter } from 'next/navigation';
import FormButton from '../Shared/FormButton';
import './Hero.scss';

export default function Hero() {

    const isLogged: boolean = useUserStore(state => state.isLoggedIn);

    const router = useRouter();

    useEffect(() => {
    }, [isLogged]);

    return (
        <div className="hero-container">
            <div className="text-container">
                <h1>Привіт, сьогодні <span>великий день </span>!<br/>Готові презентувати свою нову музику?</h1>
                <p>Як музиканти, ми розуміємо, наскільки особливий цей день і як захоплююче ділитися своїм новим релізом з вашою фан-спільнотою.Давайте зробимо це!</p>
            </div>
            <div className="buttons-container">
                {isLogged ? 
                    (
                        <FormButton type="button" name="Створити новий vibrLink" onClick={() => router.push('/new-link')} id="hero-button"/>
                    )
                    :
                    (
                        <>
                            <FormButton id="hero-button" type="button" name="Створити новий акаунт" onClick={() => router.push('/signup')}/>
                            <p>або</p>
                            <FormButton id="hero-button" type="button" name="Увійти" onClick={() => router.push('/login')}/>
                        </>
                    )
                }
            </div>
        </div>
    )
}