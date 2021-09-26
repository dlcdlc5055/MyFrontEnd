import React,{useState} from 'react'

export default function InputRecipe({processSearch,recipes}) {
    const [search,setSearch]=useState('')
    const updateSearch= e=>setSearch(e.target.value)
    const onsubmit= e=>{
        e.preventDefault();
        processSearch(search);
        setSearch('')
    }
    return (
        <div className="input_container">
            <form onSubmit={onsubmit}  className="input-group">
                <input onChange={updateSearch} value={search} type="text input-font" class="form-control" placeholder="" aria-label="" aria-describedby="button-addon2"/>
                <button type="submit" class="btn btn-outline-light input-font" id="button-addon2">search</button>
            </form>
        </div>
    )
}
