'use client'

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from "react";
import {signIn, signOut, useSession, getProviders, ClientSafeProvider, LiteralUnion } from 'next-auth/react';
import { BuiltInProviderType } from 'next-auth/providers';


const Nav = () => {
    const isUserLoggedIn: boolean = true;

    const [providers, setProviders] = useState<Record<LiteralUnion<BuiltInProviderType, string>, ClientSafeProvider> | null>(null);

    useEffect(() => {
        const fetchProviders = async () => {
            const response = await getProviders();

            setProviders(response);
        }

        fetchProviders();
    }, []);

    const signOut = () => {

    }
    return (<nav className='flex-between w-full mb-16 pt-3'>
        <Link href='/' className='flex gap-2 flex-center'>
            <Image src="assets/images/logo.svg" alt='logo' 
            width={30} 
            height={30}
            className='object-contain'/>

            <p className='logo_text'>PromptHub</p>
        </Link>

        {/* Desktop Navbar */}

        <div className='sm:flex hidden'>
            {isUserLoggedIn ? (
                <div className='flex gap-3 md:gap-5'>
                    <Link href="/create-prompt"
                    className='black_btn'>
                        Craete Post
                    </Link>

                    <button type='button' onClick={signOut} className='ourline-btn'>
                        Sign Out
                    </button>

                    <Link href="/Profile">
                        <Image
                        src="/assets/images/logo.svg"
                        width={37}
                        height={37}
                        className='rounded-full'
                        alt="profile"
                        />
                    </Link>
                </div>
            ): (
                <>
                </>
            )}
        </div>
    </nav>)
}

export default Nav;