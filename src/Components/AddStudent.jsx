import { Button, Grid, TextField } from "@mui/material";
import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";


export const AddStudent=()=>{

    const [name,setname]=useState("")
    const [age,setage]=useState("")
    const [city,setcity]=useState("")
    const dispatch=useDispatch()
    const navigate= useNavigate()

    const handlesave=()=>{
        dispatch({
            type: "add_item",
            payload:{name,age,city}
    })
    setTimeout(()=>{
        navigate("/Studentslist")
    },500)
    }

    return(
        <React.Fragment>
            <Grid container spacing={4} aling="center">
                <Grid item xs={12}><h1>Add NeW Students</h1></Grid>
                <Grid item xs={4}><TextField fullWidth variant="outlined" placeholder="Enter Name" onChange={(e)=>setname(e.target.value)}/></Grid>
                <Grid item xs={4}><TextField fullWidth variant="outlined" placeholder="Enter Age" onChange={(e)=>setage(e.target.value)}/></Grid>
                <Grid item xs={4}><TextField fullWidth variant="outlined" placeholder="Enter City" onChange={(e)=>setcity(e.target.value)}/></Grid>
                <Grid item xs={3}><Button fullWidth variant="contained" onClick={handlesave}>Save</Button></Grid>
            </Grid>
        </React.Fragment>
    )
}