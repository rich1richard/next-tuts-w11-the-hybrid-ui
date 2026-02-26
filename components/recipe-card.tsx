import { Recipe } from '@/data/models';
import Image from 'next/image';

interface RecipeCardProps {
    recipe: Recipe;
    onRead: () => void;
}

export default function RecipeCard({ recipe, onRead }: RecipeCardProps) {
    return (
        <div className="group bg-card border border-border/50 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 rounded-xl overflow-hidden shadow-sm shadow-black/5">
            <div className="relative w-full h-36 overflow-hidden">
                <Image className="max-h-40 w-full object-cover group-hover:scale-105 transition-transform duration-500" src={recipe.image} alt={recipe.name} fill />
                <div className={`absolute top-2 right-2 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase text-white shadow-sm
                    ${recipe.difficulty === "Easy" ? "bg-emerald-500/80" : recipe.difficulty === "Medium" ? "bg-amber-500/80" : "bg-rose-500/80"}`}>{recipe.difficulty}</div>
            </div>
            <div className="flex flex-col justify-between px-3 py-3 w-full h-52">
                <div>
                    <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-widest mb-1">{recipe.cuisine}</p>
                    <p className="text-foreground text-lg font-bold leading-tight line-clamp-2">{recipe.name}</p>
                    <p className="text-foreground/70 text-sm/5 mt-3 line-clamp-3 italic font-serif">
                        This {recipe.cuisine} cuisine takes {recipe.prepTimeMinutes} minutes to be prepared and {recipe.cookTimeMinutes} minutes to be cooked.
                    </p>
                </div>
                <div className="flex justify-between items-center w-full mt-2">
                    <p className="text-xl text-primary font-bold">{recipe.rating}<span className="text-muted-foreground font-normal text-[60%] ml-0.5">/ 5</span></p>
                    <button type="button" onClick={onRead}
                        className="bg-primary hover:bg-primary/90 cursor-pointer px-5 py-2 active:scale-95 font-bold rounded-lg text-primary-foreground text-xs transition-all duration-200 shadow-sm shadow-primary/20">
                        Read
                    </button>
                </div>
            </div>
        </div>
    );
};