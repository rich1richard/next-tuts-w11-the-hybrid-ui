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
        <div ref={sortFieldRef} className="relative z-10 text-foreground">
            <div className={`${className} flex items-center gap-2`}>
                <div className="cursor-pointer flex items-center bg-muted/50 border border-border/50 hover:border-primary/30 transition-all py-1.5 px-3 gap-2 rounded-lg min-w-28 shadow-sm" onClick={() => setShowSort((prev) => !prev)}>
                    <span className="w-full text-xs font-bold tracking-tight" >{sortData.find((item) => item.id === sortField)?.display}</span>

                    <svg xmlns="http://www.w3.org/2000/svg"
                        width="12" height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className={`transition-transform duration-300 ${showSort ? 'rotate-0' : '-rotate-90'} text-primary`}>
                        <path d="m6 9 6 6 6-6" />
                    </svg>
                </div>

                <button type="button" className="cursor-pointer bg-muted/50 border border-border/50 hover:border-primary/30 transition-all p-2 rounded-lg shadow-sm text-primary" onClick={() => handleAscendingChange(!ascending)}>{ascending
                    ? <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><path d="m3 8 4-4 4 4" /><path d="M7 4v16" /><path d="M11 12h10" /><path d="M11 16h7" /><path d="M11 20h4" /></svg>
                    : <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><path d="m3 8 4-4 4 4" /><path d="M7 4v16" /><path d="M11 12h4" /><path d="M11 16h7" /><path d="M11 20h10" /></svg>
                }</button>
            </div>

            <div className={showSort ? "absolute top-12 right-0 bg-card border border-border/50 rounded-xl shadow-xl shadow-black/10 overflow-hidden min-w-[120px] animate-in fade-in zoom-in-95 duration-200" : "hidden"}>
                {sortData.map((item) => (
                    <button key={item.id} type="button" onClick={() => handleSortChange(item.id)}
                        className="w-full text-left cursor-pointer py-2.5 px-4 hover:bg-muted transition-colors duration-200 text-xs font-bold text-foreground">{item.display}</button>
                ))}
            </div>
        </div>
    );
}