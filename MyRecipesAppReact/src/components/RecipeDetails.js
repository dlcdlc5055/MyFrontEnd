import React from 'react'

export default function RecipeDetails({recipe}) {
    const cousineType=recipe.cuisineType[0]
    const dishType=recipe.dishType[0]
    const mealType=recipe.mealType[0]
    const healthLabels=recipe.healthLabels
    const cautions=recipe.cautions
    let  healthList=(
    <div className="detail_container">
        <h2>Health</h2>
        <ul>
            {healthLabels.map(healthLabel =>(<h6  key={healthLabel}>{healthLabel}</h6>))}
        </ul>
    </div>)
    let cautionsList=(
        <div className="detail_container">
            <h2>Caution</h2>
            <ul>
                {cautions.map(caution =>(<h6 key={caution}>{caution}</h6>))}
            </ul>
        </div>)
    if(healthLabels.length === 0)
        healthList=(<div className=""></div>)
    if(cautions.length === 0)
        cautions=(<div className=""></div>)
    return (
        <div className="recipeDetails">
            <div className="p1">
                <div className="detail_container">
                    <h2>{"Cousine Type"}</h2>
                    <h5>{cousineType}</h5>
                </div>
                <div className="detail_container">
                    <h2>{"Dish Type"}</h2>
                    <h5>{dishType}</h5>
                </div>
                <div className="detail_container">
                    <h2>{"Meal Type"}</h2>
                    <h5>{mealType}</h5>
                </div>
            </div>
            <div className="p2">
                {healthList}
            </div>
            <div className="p3">
                {cautionsList}
            </div>
            <div className="buffer_right"></div>
        </div>
    )
}
