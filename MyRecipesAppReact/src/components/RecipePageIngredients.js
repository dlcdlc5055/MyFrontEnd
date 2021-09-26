import React from 'react'

export default function RecipePageIngredients({ingredients}) {
    return (
        <div className="ingredients_container">
            <h1>Ingredients</h1>
            <ul>
                {ingredients.map((ingredient=>{
                    let ingredient_text = ingredient.text
                    return(<li key={ingredient_text}><h5>{ingredient_text}</h5></li>)
                }))}
            </ul>
        </div>
    )
}
