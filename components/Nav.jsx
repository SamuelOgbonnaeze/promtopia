"use client";

import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"
import { signIn, signOut, useSession, getProviders } from "next-auth/react"


const Nav = () => {
    const { data: session } = useSession();

    const [providers, setProviders] = useState(null)
    const [toggleDropdown, setToggleDropdown] = useState(false)


    useEffect(() => {
        const setUpProviders = async () => {
            const response = await getProviders();
            setProviders(response);
        }
        setUpProviders();
    }, [])

    return (
        <nav className="flex-between w-full mb-16 pt-3 ">
            <Link href='/' className="flex gap-2 flex-center" >
                <Image
                    src="/assets/images/logo.svg"
                    width={30}
                    height={30}
                    alt="Promptopia logo"
                />
                <p className="logo_text">Promtopia</p>
            </Link>
            {/* Desktop Navigation */}
            <div className="sm:flex hidden">
                {session?.user ?
                    (<div className="flex gap-3 md:gap-5">
                        <Link href="/create-prompt" className="black_btn">
                            Create Prompt
                        </Link>

                        <button type="button" className="outline_btn" onClick={signOut}>
                            Sign Out
                        </button>

                        <Link href="/profile">
                            <Image src={session?.user.image}
                                width={37}
                                height={37}
                                alt="Profile picture"
                                className="rounded-full"
                            />
                        </Link>
                    </div>) :
                    (<>
                        {
                            providers && Object.values(providers).map((providers) =>
                            (
                                <button
                                    type="button"
                                    key={providers.name}
                                    onClick={() => signIn(providers.id)}
                                    className="black_btn"
                                >
                                    Sign In
                                </button>
                            ))
                        }
                    </>)

                }
            </div>

            {/* Mobile Navigation */}
            <div className="sm:hidden flex relative">
                {session?.user ? (
                    <div className="flex">

                        <Image
                            src={session?.user.image}
                            width={30}
                            height={30}
                            alt="Promptopia logo"
                            className="rounded-full"
                            onClick={() => setToggleDropdown(
                                (prev) => !prev)
                            }
                        />
                        {toggleDropdown && (
                            <div className="dropdown">
                                <Link href="/profile"
                                    className="dropdown_item"
                                    onClick={() => setToggleDropdown(false)}
                                >
                                    My Profile
                                </Link>
                                <Link href="/create-prompt"
                                    className="dropdown_item"
                                    onClick={() => setToggleDropdown(false)}
                                >
                                    Create Prompt
                                </Link>
                                <button
                                    type="button"
                                    className="mt-5 w-full black_btn"
                                    onClick={() => {
                                        setToggleDropdown(false);
                                        signOut();
                                    }}
                                >
                                    Sign Out
                                </button>
                            </div>
                        )}
                    </div>
                ) :
                    (<>
                        {
                            providers && Object.values(providers).map((providers) =>
                            (
                                <button
                                    type="button"
                                    key={providers.name}
                                    onClick={() => signIn(provider.id)}
                                    className="black_btn"
                                >
                                    Sign In
                                </button>
                            ))
                        }
                    </>)

                }
            </div>
        </nav>
    )
}

export default Nav