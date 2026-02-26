"use client";

import { useEffect, useState } from "react";

interface SearchBarProps {
    className: string,
    onChange: (value: string) => void
}

export default function SearchBar({ className, onChange }: SearchBarProps) {
    const [value, setValue] = useState("");

    useEffect(() => {
        onChange(value);
    }, [value, onChange]);

    return (
        <div className={`flex items-center border pl-4 gap-2 border-border/50 bg-muted/50 dark:bg-muted/20 h-[50px] rounded-xl overflow-hidden w-full transition-all duration-300 focus-within:border-primary/50 focus-within:bg-card focus-within:shadow-lg focus-within:shadow-primary/5 ${className}`}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 30 30" fill="currentColor" className="text-muted-foreground">
                <path d="M13 3C7.489 3 3 7.489 3 13s4.489 10 10 10a9.95 9.95 0 0 0 6.322-2.264l5.971 5.971a1 1 0 1 0 1.414-1.414l-5.97-5.97A9.95 9.95 0 0 0 23 13c0-5.511-4.489-10-10-10m0 2c4.43 0 8 3.57 8 8s-3.57 8-8 8-8-3.57-8-8 3.57-8 8-8" />
            </svg>
            <input type="text" placeholder="Search delicious recipes..." className="w-full h-full outline-none text-foreground bg-transparent placeholder-muted-foreground/60 text-sm font-medium"
                value={value}
                onChange={(e) => setValue(e.target.value)} />
            {value && (
                <button onClick={() => setValue("")} className="text-muted-foreground/60 hover:text-primary pr-4 text-xl cursor-pointer transition-colors">&times;</button>
            )}
        </div>
    );
};