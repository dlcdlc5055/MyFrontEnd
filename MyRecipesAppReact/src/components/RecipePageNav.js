import React from 'react'

export default function RecipePageNav({back}) {
    return (
        <div className="nav"><button onClick={() =>{back()}} className="btn btn-outline-light back_btn">{'<'}</button></div>
    )
}
