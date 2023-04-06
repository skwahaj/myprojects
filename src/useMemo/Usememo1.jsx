import React from "react";
import { useState,useMemo } from "react";
import { Button, Grid,TextField } from "@mui/material";


export const Usememo=()=>{
    const [text,setText]=useState("")
    const [data,setData]=useState([])
    const [count,setCount]=useState(0)

    const norender=useMemo(()=>{
        return(
            <h1>{count}</h1>
        )
    },[data])

    const handleadd=()=>{
        setData([...data,text])
    }


    return(
        <React.Fragment>
            <Grid container> 
            <Grid item xs={4}></Grid>
            <Grid item xs={4}><h1>Counter:- {count}</h1>
            <Button variant="contained" onClick={()=> count <10 && setCount (count +1)}>Inc</Button>
            <Button variant="contained" onClick={()=> count > 0 && setCount (count -1)}>Dec</Button>
            </Grid>
            <Grid item xs={4}></Grid>
            </Grid>
            <Grid container>
              <Grid item xs={4}></Grid>
              <Grid item xs={4}>
                <TextField  onChange={(e)=>setText(e.target.value)} />
                <Button variant="contained" onClick={handleadd}>Add</Button>
                {norender}
                
                {
                    data.map((item)=>{
                        return(
                            <>
                            <h2>{item}</h2>
                            </>
                        )
                    })
                }
                </Grid>
            </Grid>
        </React.Fragment>
    )
}