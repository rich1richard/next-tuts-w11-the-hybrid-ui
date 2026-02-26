"use client";

import { Recipe } from "@/data/models";
import Image from "next/image";
import { useEffect, useState } from "react";

interface RecipeModalProps {
    recipe: Recipe;
    onClose: () => void;
}

export default function RecipeModal({ recipe, onClose }: RecipeModalProps) {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        const frameId = requestAnimationFrame(() => {
            setIsMounted(true);
        });
        document.body.style.overflow = "hidden";
        return () => {
            cancelAnimationFrame(frameId);
            document.body.style.overflow = "auto";
        };
    }, []);

    const handleBackdropClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    if (!recipe) return null;

    return (
        <div
            className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-300 ${isMounted ? "opacity-100" : "opacity-0"}`}
        >
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                onClick={handleBackdropClick}
            />

            {/* Modal Content */}
            <div
                className={`relative bg-card border border-border/50 w-full max-w-4xl max-h-[90vh] overflow-hidden rounded-xl shadow-2xl transition-all duration-500 transform ${isMounted ? "scale-100 translate-y-0" : "scale-95 translate-y-8"
                    }`}
            >
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute -top-11 -right-8 z-10 pl-4 pr-10 pt-11 pb-3 bg-card border border-border text-2xl rounded-full text-foreground transition-all duration-200 cursor-pointer"
                >
                    &times;
                </button>

                <div className="flex flex-col md:flex-row">
                    {/* Image Section */}
                    <div className="relative w-full md:w-2/5 h-64 md:h-auto">
                        <Image
                            src={recipe.image}
                            alt={recipe.name}
                            fill
                            className="object-cover -z-10"
                            priority
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent" />
                        <div className="absolute bottom-3 left-3 right-3 text-white">
                            <span className={`px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase mb-1 inline-block shadow-lg
                ${recipe.difficulty === "Easy" ? "bg-emerald-500" : recipe.difficulty === "Medium" ? "bg-amber-500" : "bg-rose-500"}`}>
                                {recipe.difficulty}
                            </span>
                            <h2 className="text-2xl font-bold leading-tight">{recipe.name}</h2>
                            <p className="text-white/80 font-medium mt-1 uppercase tracking-widest text-xs">{recipe.cuisine} Cuisine</p>
                        </div>
                    </div>

                    {/* Details Section */}
                    <div className="flex-1 p-3 md:p-6 py-8! max-h-[50vh] md:max-h-[70vh] overflow-y-auto bg-card">
                        {/* Quick Stats */}
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                            <div className="bg-primary/5 p-3 rounded-2xl border border-primary/10 flex flex-col items-center">
                                <span className="text-lg md:text-2xl font-bold text-foreground">{recipe.prepTimeMinutes}</span>
                                <span className="text-[10px] text-center font-bold uppercase tracking-tighter text-muted-foreground">Prep. Minutes</span>
                            </div>
                            <div className="bg-primary/5 p-3 rounded-2xl border border-primary/10 flex flex-col items-center">
                                <span className="text-lg md:text-2xl font-bold text-foreground">{recipe.cookTimeMinutes}</span>
                                <span className="text-[10px] text-center font-bold uppercase tracking-tighter text-muted-foreground">Cook Minutes</span>
                            </div>
                            <div className="bg-primary/5 p-3 rounded-2xl border border-primary/10 flex flex-col items-center">
                                <span className="text-lg md:text-2xl font-bold text-foreground">{recipe.servings}</span>
                                <span className="text-[10px] text-center font-bold uppercase tracking-tighter text-muted-foreground">Servings</span>
                            </div>
                            <div className="bg-primary/5 p-3 rounded-2xl border border-primary/10 flex flex-col items-center">
                                <span className="text-lg md:text-2xl font-bold text-foreground">{recipe.caloriesPerServing}</span>
                                <span className="text-[10px] text-center font-bold uppercase tracking-tighter text-muted-foreground">Calories</span>
                            </div>
                        </div>

                        <div className="space-y-10">
                            {/* Ingredients */}
                            <section>
                                <h3 className="text-lg font-bold flex items-center mb-4 text-foreground">
                                    <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center mr-3 text-sm">01</span>
                                    Ingredients
                                </h3>
                                <ul className="grid grid-cols-2 md:grid-cols-2 gap-3">{
                                    recipe.ingredients.map((ingredient, index) => (
                                        <li key={index} className="flex items-center text-sm text-foreground/80 p-1 md:p-2">
                                            <div className="w-1.5 h-1.5 rounded-full bg-primary mr-3 shrink-0" />
                                            {ingredient}
                                        </li>
                                    ))
                                }</ul>
                            </section>

                            {/* Instructions */}
                            <section>
                                <h3 className="text-lg font-bold flex items-center mb-4 text-foreground">
                                    <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center mr-3 text-sm">02</span>
                                    Instructions
                                </h3>
                                <div className="space-y-4">
                                    {recipe.instructions.map((step, index) => (
                                        <div key={index} className="flex items-center gap-4 p-4 rounded-2xl bg-muted/20 border border-border/30">
                                            <span className="text-primary font-black italic opacity-30 text-2xl leading-none">{index + 1}</span>
                                            <p className="text-sm/6 text-foreground/90">{step}</p>
                                        </div>
                                    ))}
                                    <div className="flex items-center gap-4 p-4 rounded-2xl bg-muted/20 border border-border/30">
                                        <span className="text-primary font-black italic opacity-30 text-2xl leading-none">{recipe.instructions.length + 1}</span>
                                        <p className="text-sm/6 text-primary/60 font-bold">Enjoy your meal!</p>
                                    </div>
                                </div>
                            </section>

                            {/* Tags & Meta */}
                            <div className="pt-6 border-t border-border/30 flex flex-wrap justify-center gap-2">
                                {recipe.mealType.map((type) => (
                                    <span key={type} className="px-2 py-1 bg-primary/10 text-primary rounded-full text-[10px] font-bold uppercase tracking-wider">
                                        {type}
                                    </span>
                                ))}
                                {recipe.tags.map((tag) => (
                                    <span key={tag} className="px-2 py-1 bg-muted text-muted-foreground rounded-full text-[10px] font-bold uppercase tracking-wider">
                                        #{tag}
                                    </span>
                                ))}
                            </div>

                            {/* Footer info */}
                            <div className="w-full flex items-center justify-center text-muted-foreground gap-1">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-star-icon lucide-star"><path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" /></svg>
                                <span className="text-xl font-bold text-foreground">{recipe.rating}<span className="text-[70%] text-foreground/60">/5</span></span>
                                <span className="text-xs pt-2">({recipe.reviewCount} reviews)</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
