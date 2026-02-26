import { Suspense } from "react";
import RecipeView from "@/components/recipe-view";
import { getRecipes } from "@/data/utils";

export default function Home() {
  const recipes = getRecipes();

  return (
    <div className="p-4">
      <Suspense
        fallback={
          <div className="flex flex-col items-center justify-center min-h-[250px] w-full">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary mb-6" />
            <p className="text-primary italic font-serif animate-bounce">Loading recipes...</p>
          </div>
        }
      >
        {recipes.then(recipes => (
          <RecipeView recipes={recipes} />
        ))}
      </Suspense>
    </div>
  );
}
