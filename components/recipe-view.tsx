"use client";

import SearchBar from "@/components/search-bar";
import RecipeCard from "@/components/recipe-card";

import { useState } from "react";
import { Recipe } from "@/data/models";
import { recipeHasKeywords } from "@/data/utils";
import SortField from "./sort-field";

interface RecipeViewProps {
    recipes: Recipe[];
}

function encodeDifficulty(difficulty: string) {
    if (difficulty.toLowerCase() === 'easy') return 1;
    if (difficulty.toLowerCase() === 'medium') return 2;
    if (difficulty.toLowerCase() === 'hard') return 3;
    return 0;
}

function sortRecipe(by: string, asc: boolean, recipes: Recipe[]) {
    if (by === 'name') {
        return recipes.sort((a, b) => asc ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name));
    } else if (by === 'rating') {
        return recipes.sort((a, b) => asc ? a.rating - b.rating : b.rating - a.rating);
    } else if (by === 'difficulty') {
        return recipes.sort((a, b) => asc ? encodeDifficulty(a.difficulty) - encodeDifficulty(b.difficulty) : encodeDifficulty(b.difficulty) - encodeDifficulty(a.difficulty));
    }
    return recipes;
}

export default function RecipeView({ recipes }: RecipeViewProps) {
    const sortOptions = [
        { id: 'name', display: 'Name' },
        { id: 'rating', display: 'Rating' },
        { id: 'difficulty', display: 'Difficulty' },
    ];

    const [keywords, setKeywords] = useState('');
    const [sortId, setSortId] = useState(sortOptions[0].id);
    const [ascending, setAscending] = useState(true);

    const displayedRecipes = sortRecipe(sortId, ascending, recipes.filter(
        recipe => recipeHasKeywords(recipe, keywords.split(" "))));

    return (
        <div className="w-full lg:w-250 mx-auto">
            <SearchBar className="w-full my-6" onChange={(value) => setKeywords(value)} />

            <div className="flex justify-between items-center text-muted-foreground text-xs font-bold uppercase tracking-widest py-4 border-b border-border/30 mb-4">
                <p>{displayedRecipes.length} recipe{displayedRecipes.length !== 1 ? "s" : ""} found</p>

                <SortField sortData={sortOptions} onChange={(id, ascending) => { setSortId(id); setAscending(ascending) }} />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {displayedRecipes.map((recipe) => (
                    <RecipeCard key={recipe.id} recipe={recipe} />
                ))}
            </div>
        </div>
    );
}