"use client";

import { useTheme } from "next-themes";
import Image from "next/image";

export default function AppHeader() {
    const { theme, setTheme } = useTheme();

    console.log(theme);

    return (
        <header className="relative w-full h-60 md:h-80 flex items-center justify-center overflow-hidden">
            <Image
                src='/background.jpg'
                alt="A table full of spices"
                fill
                className="object-cover -z-15 blur-xs"
            />

            <div className="absolute inset-0 -z-10 bg-orange-50/30 dark:bg-black/40 backdrop-brightness-75 transition-colors duration-500"></div>

            <Image src='/logo-nobg.png' alt="Logo" className="md:hidden drop-shadow-lg" width={150} height={150} />
            <Image src='/logo-nobg.png' alt="Logo" className="hidden md:block drop-shadow-lg" width={200} height={200} />

            <label className="absolute top-5 right-5 inline-flex items-center cursor-pointer text-primary-foreground gap-3">
                <input type="checkbox" className="sr-only peer" checked={theme == "dark" ? false : true} onChange={() => setTheme(theme == "light" ? "dark" : "light")} />
                <div className="w-12 h-6 bg-primary dark:bg-muted rounded-full peer transition-colors duration-200 shadow-inner"></div>
                <span className="flex items-center justify-center dot absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform duration-200 ease-in-out peer-checked:translate-x-6 shadow-md shadow-black/20 text-primary dark:text-muted-foreground">{
                    theme == "dark" ?
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                            strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3">
                            <path d="M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401" />
                        </svg>
                        :
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                            strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3">
                            <circle cx="12" cy="12" r="4" />
                            <path d="M12 2v2" />
                            <path d="M12 20v2" />
                            <path d="m4.93 4.93 1.41 1.41" />
                            <path d="m17.66 17.66 1.41 1.41" />
                            <path d="M2 12h2" />
                            <path d="M20 12h2" />
                            <path d="m6.34 17.66-1.41 1.41" />
                            <path d="m19.07 4.93-1.41 1.41" />
                        </svg>
                }</span>
            </label>
        </header>
    );
}