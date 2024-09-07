"use client"

import { signIn } from "next-auth/react"

export default function GoogleSignInButton() {
    return (
        <button onClick={() => signIn('google')} >
            Sign In
            {/* <Image src={GoogleIcon} alt="Google Icon" className="w-6 h-6" /> */}
        </button>
)
}