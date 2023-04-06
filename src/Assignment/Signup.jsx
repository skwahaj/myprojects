import React from "react";
import { Link } from "react-router-dom";
import { Grid,TextField,Card,CardContent,Button } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";



export const Signup=()=>{
 const [user,setUser]=useState({})

 const dispatch=useDispatch()
 const navigate=useNavigate()
    
 const handlesignup=()=>{
    console.log("===>",user)
    dispatch({type:"Add_user",payload:user})
    alert("User Added Successfully")
    setTimeout(() => {
        navigate("/")
    }, 1000);
 }
 console.log("userdetails=======>",user)
    
    return(
        <React.Fragment>
            <Card style={{width:"300px",marginLeft:"40%",marginTop:"80px", backgroundColor:"chocolate"}}>
                <CardContent align="center">
            <Grid container spacing={2}>
                <Grid item xs={12}><h1>Sign Up Here</h1></Grid>
                <Grid item xs={12}><TextField variant="outlined" placeholder="Name" type="text" onChange={(e)=>setUser({name:e.target.value})}/></Grid>
                <Grid item xs={12}><TextField variant="outlined" placeholder="Email" type="email" onChange={(e)=>setUser({...user,email:e.target.value})}/></Grid>
                <Grid item xs={12}><TextField variant="outlined" placeholder="Phone" type="number" onChange={(e)=>setUser({...user,phone:e.target.value})}/></Grid>
                <Grid item xs={12}><TextField variant="outlined" placeholder="Username" type="text" onChange={(e)=>setUser({...user,username:e.target.value})}/></Grid>
                <Grid item xs={12}><TextField variant="outlined" placeholder="New Password" type="password" onChange={(e)=>setUser({...user,password:e.target.value})}/></Grid>
                <Grid item xs={12}><TextField variant="outlined" placeholder="Confirm Password" type="password" onChange={(e)=>setUser({...user,confirmpassword:e.target.value})}/></Grid>
                <Grid item xs={12}><Button variant="contained" onClick={handlesignup} >SgnUp</Button></Grid>
                <Grid item xs={12}><p>Alredy have an Account? <Link to="/">Login </Link></p></Grid>
            </Grid>
            </CardContent>
            </Card>
        </React.Fragment>
    )
}