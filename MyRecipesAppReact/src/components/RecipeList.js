import React from 'react'
import Recipe from './Recipe'
import {decodeRecipes} from '../scripts/decodeRecipes'

export default function RecipeList({recipes,openRecipePage}) {
    const data=decodeRecipes(recipes) 
    return (
        <div className="RecipeList">
            {data.map(recipe =>{
                return (<Recipe key={recipe.image} source={recipe.source} image={recipe.image} calories={recipe.calories}  title={recipe.label} portions={recipe.yield} totalWeight={recipe.totalWeight} id={recipe.id} openRecipePage={openRecipePage}/>)
            })}
        </div>
    )
}
