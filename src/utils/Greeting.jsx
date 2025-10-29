import { useState } from "react";

export default function Greeting() {
    const[name,setName]=useState('')
    const[greeting,setGreeting]=useState('')

    const handleClick=()=>{
        setGreeting(`Hello, ${name}!`)
    }

    return (
        <div>
            <label htmlFor="name-input">Enter your name:</label>
            <input 
            type="text" 
            id='name-input'
            placeholder="Your Name"
            value={name}
            onChange={(e)=>setName(e.target.value)}    
            />
            <button onClick={handleClick}>Greet</button>
            {greeting && <p data-testid='greetind-message'>{greeting}</p>}
        </div>
    )
}