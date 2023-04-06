import React from "react";
import { Grid,TextField,Button } from "@mui/material";
import { useState,useRef } from "react";
import { useEffect } from "react";



export const Useref=()=>{
    const [text,setText]=useState("")
    const in1=useRef()
    const head1=useRef()

    console.log(text)

    const handlecolor=()=>{
        in1.current.style.color="red"
        head1.current.style.color="green"
    }

    const handleclear=()=>{
        in1.current.value=""
    }

    const handlechange=()=>{
        in1.current.value="pdac"
        head1.current.innerText="pdac"
    }

    const handlecenter=()=>{
        in1.current.style.textAlign="center"
        
    }

    useEffect(()=>{
        in1.current.focus()
    },[])

    return(
        <React.Fragment>
            <h1>UseRef Hook</h1>
           <input onChange={(e)=>setText(e.target.value)} ref={in1} type="text"/>
           <br />
           <h1 ref={head1}>wahaj</h1>
           <video src="./"></video>
           <button onClick={handlechange}>Change</button>
           <button onClick={handlecolor}>color</button>
           <button onClick={handleclear}>clear</button>
           <button onClick={handlecenter}>center</button>
        </React.Fragment>
    )
}