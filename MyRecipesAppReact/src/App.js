import React, {
    useState,
} from 'react'
import {getRecipes} from './scripts/getRecipes'
import RecipeBrowser from './components/RecipeBrowser'
import RecipePage from './components/RecipePage'
import 'bootstrap/dist/css/bootstrap.min.css';
import './style/pages.css'
import "./style/RecipeBrowserInput.css"
import './style/RecipePage.css'
import {decodeRecipes} from './scripts/decodeRecipes'
import './style/Recipe.css'

export default function App() {
    let [recipes,setRecipes]= useState([])
    let [backup,setBackup] = useState([])
    const processSearch = (search)=>{
        getRecipes(search).then(data=>{
            setRecipes(data)
        })
    }
    const openRecipePage=(id)=>{
        backupRecipes()
        setRecipes(recipes.filter((recipe,index)=>index===id))
    }
    const clearRecipes=()=>{
        setRecipes([])
    }
    const backupRecipes=()=>{setBackup(recipes)}
    const restoreBackup=()=>{setRecipes(backup)}
    if (recipes.length!==1) {
        return <RecipeBrowser processSearch={processSearch} openRecipePage={openRecipePage} recipes={recipes}/>
    } else {
        return <RecipePage  back={restoreBackup} recipes={recipes}/>
    }
}