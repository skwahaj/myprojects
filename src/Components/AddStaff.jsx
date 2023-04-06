import { Button, Grid, TextField } from "@mui/material";
import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";


export const AddStaff=()=>{

    const [name,setname]=useState("")
    const [department,setdepartment]=useState("")
    const [experience,setexperience]=useState("")
    const dispatch=useDispatch()
    const navigate= useNavigate()

    const handlesave=()=>{
        dispatch({
            type: "add_item",
            payload:{name,department,experience}
    })
    setTimeout(()=>{
        navigate("/Stafflist")
    },500)
    }

    return(
        <React.Fragment>
            <Grid container spacing={4} aling="center">
                <Grid item xs={12}><h1>Add New Stafff</h1></Grid>
                <Grid item xs={4}><TextField fullWidth variant="outlined" placeholder="Enter Name" onChange={(e)=>setname(e.target.value)}/></Grid>
                <Grid item xs={4}><TextField fullWidth variant="outlined" placeholder="Enter Department" onChange={(e)=>setdepartment(e.target.value)}/></Grid>
                <Grid item xs={4}><TextField fullWidth variant="outlined" placeholder="Enter Experience" onChange={(e)=>setexperience(e.target.value)}/></Grid>
                <Grid item xs={3}><Button fullWidth variant="contained" onClick={handlesave}>Save</Button></Grid>
            </Grid>
        </React.Fragment>
    )
}