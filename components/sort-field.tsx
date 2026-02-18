import { useState, useEffect, useRef } from "react";

interface SortData {
    id: string,
    display: string
}

interface SortFieldProps {
    sortData: SortData[];
    onChange: (id: string, ascending: boolean) => void;
    className?: string
}

export default function SortField({ sortData, onChange, className }: SortFieldProps) {
    const [showSort, setShowSort] = useState(false);
    const [sortField, setSortField] = useState(sortData[0].id);
    const [ascending, setAscending] = useState(true);

    const sortFieldRef = useRef<HTMLDivElement>(null);

    // Detect clicks outside the component to close the dropdown
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (sortFieldRef.current && !sortFieldRef.current.contains(event.target as Node)) {
                setShowSort(false);
            }
        };

        // Add event listener when dropdown is open
        if (showSort) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        // Cleanup event listener
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showSort]);

    const handleSortChange = (value: string) => {
        setSortField(value);
        onChange(value, ascending);
        setShowSort(false);
    };

    const handleAscendingChange = (value: boolean) => {
        setAscending(value);
        onChange(sortField, value);
        setShowSort(false);
    };

    return (
        <div ref={sortFieldRef} className="relative z-10 text-gray-600 dark:text-gray-200">
            <div className={`${className} flex items-center gap-3`}>
                <div className="cursor-pointer flex items-center bg-gray-200 border border-gray-300 dark:bg-gray-600 dark:border-gray-600 py-1 px-2 gap-3 rounded-md" onClick={() => setShowSort((prev) => !prev)}>
                    <span >{sortData.find((item) => item.id === sortField)?.display}</span>

                    <svg xmlns="http://www.w3.org/2000/svg"
                        width="24" height="24"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="rotate-180 w-2 h-2">
                        <path d="M13.73 4a2 2 0 0 0-3.46 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
                    </svg>
                </div>

                <button type="button" className="cursor-pointer bg-gray-200 border border-gray-300 dark:bg-gray-600 dark:border-gray-600 p-2 rounded-md" onClick={() => handleAscendingChange(!ascending)}>{ascending
                    ? <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3"><path d="m3 8 4-4 4 4" /><path d="M7 4v16" /><path d="M11 12h10" /><path d="M11 16h7" /><path d="M11 20h4" /></svg>
                    : <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3"><path d="m3 8 4-4 4 4" /><path d="M7 4v16" /><path d="M11 12h4" /><path d="M11 16h7" /><path d="M11 20h10" /></svg>
                }</button>
            </div>

            <div className={showSort ? "absolute top-10 right-0 bg-gray-200 border border-gray-300 dark:bg-gray-600 dark:border-gray-600 rounded-md shadow-lg overflow-hidden" : "hidden"}>
                {sortData.map((item) => (
                    <button key={item.id} type="button" onClick={() => handleSortChange(item.id)}
                        className="w-full text-left cursor-pointer py-2 px-2 hover:bg-gray-300 transition-colors duration-200">{item.display}</button>
                ))}
            </div>
        </div>
    );
}