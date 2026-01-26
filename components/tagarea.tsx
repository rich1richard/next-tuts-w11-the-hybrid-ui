import { useEffect, useState, useMemo } from "react";

interface TagAreaProps {
    className: string,
    tags: string[],
    onSelectionChange: (tags: string[]) => void
}

function updateTags(tags: string[], tag: string) {
    return tags.includes(tag) ? tags.filter((t) => t !== tag) : [...tags, tag];
}

// Fisher-Yates shuffle algorithm for stable randomization
function processArray<T>(array: T[]): T[] {
    const shuffled: T[] = [];

    array.forEach((item) => {
        if (!shuffled.includes(item)) {
            shuffled.push(item);
        }
    });

    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

export default function TagArea({ className, tags, onSelectionChange }: TagAreaProps) {
    // Memoize the shuffled tags to prevent re-shuffling on every render
    const displayTags = useMemo(() => {
        return processArray(tags).slice(0, 10).sort((t1, t2) => t1.localeCompare(t2));
    }, [tags]);

    const [selectedTags, setSelectedTags] = useState<string[]>([]);

    useEffect(() => {
        onSelectionChange(selectedTags);
    }, [selectedTags, onSelectionChange]);

    return (
        <div className={`flex flex-wrap justify-center gap-2 overflow-x-auto ${className}`}>
            {displayTags.map((tag) => (
                <button
                    key={tag}
                    className={`whitespace-nowrap px-2 py-1 border rounded-full cursor-pointer
                    border-gray-400 text-gray-900
                    ${selectedTags.includes(tag) ? "bg-amber-500" : "bg-amber-100"}`}
                    onClick={() => setSelectedTags(updateTags(selectedTags, tag))}
                >
                    {tag}
                </button>
            ))}
        </div>
    )
}