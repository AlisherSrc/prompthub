'use client'

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from "react";
import { signIn, signOut, useSession, getProviders, ClientSafeProvider, LiteralUnion } from 'next-auth/react';
import { BuiltInProviderType } from 'next-auth/providers';


const Nav = () => {
    const isUserLoggedIn: boolean = true;

    const [providers, setProviders] = useState<Record<LiteralUnion<BuiltInProviderType, string>, ClientSafeProvider> | null>(null);
    const [toggleDropdown, setToggleDropdown] = useState<boolean>(false);


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
            <Image src="/assets/images/logo.png" alt='logo'
                width={30}
                height={30}
                className='object-contain' />

            <p className='logo_text'>PromptPeak</p>
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
                            src="/assets/images/logo.png"
                            width={37}
                            height={37}
                            className='rounded-full'
                            alt="profile"
                        />
                    </Link>
                </div>
            ) : (
                <>
                    {providers &&
                        Object.values(providers).map((provider) => (
                            <button
                                type="button"
                                key={provider.name}
                                onClick={() => signIn(provider.id)}
                                className='black_btn'>
                                Sign In
                            </button>
                        ))}
                </>
            )}
        </div>

        {/* Mobile Navbar */}
        <div className='sm:hidden flex relative'>
            {isUserLoggedIn ? (
                <div className='flex'>
                    {/* drop down menu */}
                    <Image
                        src="/assets/images/logo.png"
                        width={37}
                        height={37}
                        className='rounded-full'
                        alt="profile"
                        onClick={() => { setToggleDropdown((prev) => !prev) }}
                    />

                    {toggleDropdown && (
                        <div className='dropdown'>
                            <Link
                                href="/create-prompt"
                                className='dropdown_link'
                                onClick={() => setToggleDropdown(false)}>
                                    Create Prompt
                            </Link>
                            <button 
                            type='button'
                            onClick={() => {
                                setToggleDropdown(false);
                                signOut();
                            }}
                            className='mt-5 w-full black_btn'>Sign Out</button>
                        </div>
                    )}
                </div>
            ) : (
                <>
                    {providers &&
                        Object.values(providers).map((provider) => (
                            <button
                                type="button"
                                key={provider.name}
                                onClick={() => signIn(provider.id)}
                                className='black_btn'>
                                Sign In
                            </button>
                        ))}
                </>
            )}
        </div>
    </nav>)
}

export default Nav;