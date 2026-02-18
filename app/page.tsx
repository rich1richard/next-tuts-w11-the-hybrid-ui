import { Suspense } from "react";
import RecipeView from "@/components/recipe-view";
import { getRecipes } from "@/data/utils";

export default function Home() {
  const recipes = getRecipes();

  return (
    <div className="p-4">
      <Suspense fallback={<div className="text-center">Loading recipes...</div>}>
        {recipes.then(recipes => (
          <RecipeView recipes={recipes} />
        ))}
      </Suspense>
    </div>
  );
}
