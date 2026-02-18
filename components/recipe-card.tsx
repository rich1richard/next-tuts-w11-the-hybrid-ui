import { Recipe } from '@/data/models';
import Image from 'next/image';

interface RecipeCardProps {
    recipe: Recipe;
}

export default function RecipeCard({ recipe }: RecipeCardProps) {
    return (
        <div className="group bg-white dark:bg-gray-600 border border-gray-200 dark:border-gray-500 hover:-translate-y-0.5 transition duration-300 rounded-lg shadow shadow-black/10">
            <div className="relative w-full h-36 overflow-hidden">
                <Image className="rounded-md max-h-40 w-full object-cover group-hover:scale-105 transition duration-200" src={recipe.image} alt={recipe.name} fill />
                <div className={`absolute top-2 right-2 backdrop-blur-sm px-2 py-1 rounded-md text-xs font-medium text-white
                    ${recipe.difficulty === "Easy" ? "bg-green-500/80" : recipe.difficulty === "Medium" ? "bg-yellow-500/80" : "bg-red-500/80"}`}>{recipe.difficulty}</div>
            </div>
            <div className="flex flex-col justify-between px-2 py-2 w-full h-52">
                <div>
                    <p className="text-gray-400 text-xs dark:text-gray-400">{recipe.cuisine}</p>
                    <p className="text-gray-950 text-lg font-bold dark:text-white">{recipe.name}</p>
                    <p className="text-zinc-600 text-sm/6 mt-2 dark:text-gray-300">
                        This {recipe.cuisine} cuisine takes {recipe.prepTimeMinutes} minutes to be prepared and {recipe.cookTimeMinutes} minutes to be cooked.
                    </p>
                </div>
                <div className="flex justify-between items-center w-full mt-2">
                    <p className="text-xl text-gray-900 font-semibold dark:text-white">{recipe.rating}<span className="text-gray-600 font-normal text-[70%] dark:text-gray-300">/5</span></p>
                    <button type="button" className="bg-amber-600 hover:bg-amber-700 cursor-pointer px-6 py-2 active:px-5 active:py-1 font-medium rounded-md text-white text-sm dark:bg-amber-700 dark:hover:bg-amber-600 transition-all duration-200">
                        Read
                    </button>
                </div>
            </div>
        </div>
    );
};