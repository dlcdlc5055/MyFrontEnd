import React,{useState} from 'react'
import InputRecipe from './InputRecipe'
import RecipeList from './RecipeList'
import Footer from './Footer'


export default function RecipeBrowser({recipes,processSearch,openRecipePage}) {
    return (
        <div className="page">
            <InputRecipe recipes={recipes} processSearch={processSearch}/>
            <RecipeList recipes={recipes} openRecipePage={openRecipePage}/>
            <Footer />
        </div>
    )
}
