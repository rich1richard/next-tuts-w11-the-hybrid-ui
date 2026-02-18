import { Recipe, Recipes } from "@/data/models";

export async function getRecipes() {
    const recipes = await fetch('https://dummyjson.com/recipes?limit=9999')
        .then<Recipes>(res => res.json())
        .then<Recipe[]>(data => data.recipes);

    return recipes;
}

export function recipeHasKeywords(recipe: Recipe, keywords: string[]) {
    const searchArea = [recipe.name, recipe.ingredients.join(", "), recipe.cuisine, recipe.tags.join(", "), recipe.mealType.join(", ")].join(" ").toLowerCase();

    return keywords.some(keyword => searchArea.includes(keyword));
}

export function getTags(recipes: Recipe[]): string[] {
    const tagSet = new Set<string>();

    recipes.forEach(recipe => {
        tagSet.add(recipe.cuisine);

        recipe.tags.forEach(tag => tagSet.add(tag));

        recipe.mealType.forEach(mealType => tagSet.add(mealType));
    });

    return Array.from(tagSet).sort(() => Math.random() - 0.5);
}

export function updateArray(arr: string[], value: string) {
    return arr.includes(value) ? arr.filter((t) => t !== value) : [...arr, value];
}

// Fisher-Yates shuffle algorithm for stable randomization
export function shuffleArray<T>(array: T[]): T[] {
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
