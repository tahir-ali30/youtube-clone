"use client";

import authOptions from "../app/utils/authOptions";
import GoogleSignInButton from "./GoogleSignInButton";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { MenuIcon, MoonStar, Sun } from "lucide-react";
import useDark from "../app/utils/useDark";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function TopNavBar() {
	const { status, data } = useSession(authOptions);
	const { systemTheme, theme, setTheme } = useTheme();
	const [currentTheme, setCurrentTheme] = useState();

	useEffect(() => {
		// const currentTheme = theme === "system" ? systemTheme : theme;
		setCurrentTheme(theme === "system" ? systemTheme : theme);
	}, []);
	console.log(theme);
	return (
		<header className='flex justify-between gap-10 py-2.5 px-5 w-full items-center'>
			{/* youtube icon */}
			<div className='flex flex-shrink-0 items-center gap-3'>
				<button className='h-full w-full hover:bg-slate-300 p-1 rounded'>
					<MenuIcon />
				</button>
				<Image src={"/webtube.png"} width={100} height={100} alt='logo' />
				<button
					onClick={() =>
						theme == "dark" ? setTheme("light") : setTheme("dark")
					}
				>
					{theme === "light" ? (
						<MoonStar fill='black' />
					) : (
						<Sun color='white' />
					)}
				</button>
			</div>

			{/* search bar */}
			<form className='md:flex hidden flex-grow gap-2 items-center justify-center'>
				<div className='flex flex-grow max-w-[600px]'>
					<input
						type='text'
						placeholder='Search'
						className='w-full px-3 rounded-l-full border border-slate-400'
					/>
					<button className='px-5 py-2 border border-slate-400 hover:bg-slate-400/50 rounded-r-full'>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							fill='none'
							viewBox='0 0 24 24'
							strokeWidth={1.5}
							stroke='currentColor'
							className='w-6 h-6'
						>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								d='m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z'
							/>
						</svg>
					</button>
				</div>

				{/* microphone svg */}
				<div className='rounded-full p-4 cursor-pointer hover:bg-slate-400/50'>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						viewBox='0 0 20 20'
						fill='currentColor'
						className='w-5 h-5'
					>
						<path d='M7 4a3 3 0 0 1 6 0v6a3 3 0 1 1-6 0V4Z' />
						<path d='M5.5 9.643a.75.75 0 0 0-1.5 0V10c0 3.06 2.29 5.585 5.25 5.954V17.5h-1.5a.75.75 0 0 0 0 1.5h4.5a.75.75 0 0 0 0-1.5h-1.5v-1.546A6.001 6.001 0 0 0 16 10v-.357a.75.75 0 0 0-1.5 0V10a4.5 4.5 0 0 1-9 0v-.357Z' />
					</svg>
				</div>
			</form>

			{/* user icons */}
			<div className='flex flex-shrink gap-3 items-center'>
				<button className='hover:bg-white/10 md:hidden'>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						fill='none'
						viewBox='0 0 24 24'
						strokeWidth={1.5}
						stroke='currentColor'
						className='w-6 h-6'
					>
						<path
							strokeLinecap='round'
							strokeLinejoin='round'
							d='m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z'
						/>
					</svg>
				</button>
				{/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                    <path d="M3.25 4A2.25 2.25 0 0 0 1 6.25v7.5A2.25 2.25 0 0 0 3.25 16h7.5A2.25 2.25 0 0 0 13 13.75v-7.5A2.25 2.25 0 0 0 10.75 4h-7.5ZM19 4.75a.75.75 0 0 0-1.28-.53l-3 3a.75.75 0 0 0-.22.53v4.5c0 .199.079.39.22.53l3 3a.75.75 0 0 0 1.28-.53V4.75Z" />
                </svg> */}
				<svg
					xmlns='http://www.w3.org/2000/svg'
					height='24'
					fill='currentColor'
					viewBox='0 0 24 24'
					width='24'
					focusable='false'
				>
					<path d='M14 13h-3v3H9v-3H6v-2h3V8h2v3h3v2zm3-7H3v12h14v-6.39l4 1.83V8.56l-4 1.83V6m1-1v3.83L22 7v8l-4-1.83V19H2V5h16z' />
				</svg>

				<svg
					xmlns='http://www.w3.org/2000/svg'
					fill='none'
					viewBox='0 0 24 24'
					strokeWidth={1.5}
					stroke='currentColor'
					className='w-6 h-6'
				>
					<path
						strokeLinecap='round'
						strokeLinejoin='round'
						d='M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0'
					/>
				</svg>

				{status === "unauthenticated" ? (
					<GoogleSignInButton />
				) : (
					// <Image src={data?.user?.image} alt={data?.user?.name} width={35} height={35} className="rounded-full border-2" />
					"Sign Out"
				)}
				{/* <GoogleSignInButton /> */}
			</div>
		</header>
	);
}
