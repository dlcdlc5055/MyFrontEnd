import React from 'react'

export default function RecipePageCore({recipe}) {
    const image=recipe.image
    const title=recipe.label
    const totalWeight = recipe.totalWeight
    const calories = recipe.calories
    const portions = recipe.yield
    const source = recipe.source
    const original_url = recipe.url
    return (
        <div className="recipe_page_core">
            <div className="part1">
                <img alt={"image"} src={image}/>
            </div>
            <div className="part2">
                <h1>{title}</h1>
                <h3>{"Weight: "+Math.floor(totalWeight)+" g"}</h3>
                <h3>{"Calories: "+Math.floor(calories)+" kcal"}</h3>
                <h3>{"Yield: "+Math.floor(portions)+""}</h3>
                <h3>{"Author: "+source+""}</h3>
                <a className="btn border-black  btn-outline-light original_link" href={original_url}>see original page</a>
            </div>
        </div>
    )
}
