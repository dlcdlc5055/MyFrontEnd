import React from 'react'
import Footer from './Footer'
import RecipePageNav from './RecipePageNav'
import RecipePageCore from './RecipePageCore'
import RecipePageIngredients from './RecipePageIngredients'
import RecipeDetails from './RecipeDetails'

export default function RecipePage({recipes,back}) {
    const recipe = recipes[0].recipe
    const ingredients=recipe.ingredients
    return (
        <div className="page">
            <RecipePageNav back={back}/>
            <RecipePageCore recipe={recipe}/>
            <RecipePageIngredients ingredients={ingredients}/>
            <RecipeDetails recipe={recipe}/>
        </div>
    )
}
