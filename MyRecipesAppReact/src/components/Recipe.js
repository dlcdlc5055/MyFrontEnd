import React from 'react'

export default function Recipe({title,image,totalWeight,calories,portions,source,id,openRecipePage}) {
    return (
        <div className="recipe_container">
            <div className="recipe_inner_container">
                <div className="recipe_left">
                    <img src={image} image/>
                </div>
                <div className="recipe_right">
                    <h1 className="recipe_title_browser">{title}</h1>
                    <h4>{"Weight: "+Math.floor(totalWeight)+" g"}</h4>
                    <h4>{"Calories: "+Math.floor(calories)+" kcal"}</h4>
                    <h4>{"Yield: "+Math.floor(portions)}</h4>
                    <h4>{"Author: "+source}</h4>
                </div>
            </div>
            <button onClick={() =>{openRecipePage(id)}} className="btn border-black  btn-outline-light">{'see more'}</button>
        </div>
    )
}
