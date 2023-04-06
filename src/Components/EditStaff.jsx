import { Grid, TextField,Button } from "@mui/material";
import React,{useState} from "react";
import { useSelector,useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";



export const EditStaff=()=>{
    const navigate=useNavigate()

    const [name,setname]=useState("")
    const [department,setdepartment]=useState("")
    const [experience,setexperience]=useState("")

    
    

    return(
        <React.Fragment>
            <Grid container spacing={3}>
                <Grid iteem xs={3}><TextField fullWidth variant="outlined" value={name} onChange={(e)=>setname(e.target.value)}/></Grid>
                <Grid iteem xs={3}><TextField fullWidth variant="outlined" value={department} onChange={(e)=>setdepartment(e.target.value)}/></Grid>
                <Grid iteem xs={3}><TextField fullWidth variant="outlined" value={experience} onChange={(e)=>setexperience(e.target.value)}/></Grid>
                <Grid iteem xs={3}><Button fullWidth variant="contained" ></Button></Grid>
            </Grid>
        </React.Fragment>
    )
    }