import React, { useState } from "react";
import { Card,Grid,Button,TextField, CardContent } from "@mui/material";



export const Counter=()=>{
    const [count,setCount]=useState(0)



    return(
        <React.Fragment>
            <Grid container>
            <Button variant="contained" onClick={()=> count>0 && setCount(count-1)}>Decrement</Button>
            <Grid item xs={2}>
            <Card>
                <CardContent>{count}</CardContent>
            </Card>

            </Grid>
            <Button  variant="contained" onClick={()=> count<10 && setCount(count+1)}>Increment</Button>



            </Grid>



        </React.Fragment>
    )
}