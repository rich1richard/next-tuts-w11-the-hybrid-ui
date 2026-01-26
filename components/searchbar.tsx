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
        <div className={`
            p-2 border border-gray-400 rounded-full max-w-full w-4/5 mx-auto
            relative flex justify-between items-center gap-2 ${className}`}>
            <input type="text" placeholder="Search"
                className="w-full outline-none text-center"
                value={value} onChange={(e) => setValue(e.target.value)} />
            <button
                className={`text-gray-400 h-full px-2 ${value.length > 0 ? "" : "hidden"}
                    absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer`}
                onClick={() => setValue("")}>&times;</button>
        </div>
    )
}
