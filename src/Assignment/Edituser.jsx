import React,{useState} from "react";
import { Grid,TextField,Card,CardContent,Button } from "@mui/material";
import { useNavigate,useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";



export const Edituser=()=>{
    const [user,setUser]=useState({})
    const [index,setIndex]=useState(null)
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const recive=useLocation()
    console.log("======recive",recive)

    const handlesave=()=>{
        dispatch({type:"Edit-user",payload:{user,index}})
        navigate("/display")
        setIndex(recive.state.index)
    }
    
    useEffect(()=>{
        setUser(recive.state.item)
    },[])

    return(
        <React.Fragment>
        <Card style={{width:"300px",marginLeft:"40%",marginTop:"80px", backgroundColor:"chocolate"}}>
            <CardContent align="center">
        <Grid container spacing={2}>
            <Grid item xs={12}><h1>Sign Up Here</h1></Grid>
            <Grid item xs={12}><TextField variant="outlined" value={user.name} placeholder="Name" type="text" onChange={(e)=>setUser({name:e.target.value})}/></Grid>
            <Grid item xs={12}><TextField variant="outlined" value={user.email} placeholder="Email" type="email" onChange={(e)=>setUser({...user,email:e.target.value})}/></Grid>
            <Grid item xs={12}><TextField variant="outlined" value={user.phone} placeholder="Phone" type="number" onChange={(e)=>setUser({...user,phone:e.target.value})}/></Grid>
            <Grid item xs={12}><TextField variant="outlined" value={user.username} placeholder="Username" type="text" onChange={(e)=>setUser({...user,username:e.target.value})}/></Grid>
            <Grid item xs={12}><TextField variant="outlined" value={user.password} placeholder="New Password" type="password" onChange={(e)=>setUser({...user,password:e.target.value})}/></Grid>
            <Grid item xs={12}><Button variant="contained" onClick={handlesave} >Save</Button></Grid>
            
        </Grid>
        </CardContent>
        </Card>
        </React.Fragment>
    )
}