import React, { useState,useMemo } from "react";
import axios from "axios";
import { useSelector,useDispatch, } from "react-redux";
import { useEffect } from "react";
import { Grid, Card, CardContent,Button } from "@mui/material";
import {useNavigate } from "react-router-dom";

export const Display = () => {
  const [users, setUsers] = useState([]);

const navigate=useNavigate()
  const dispatch=useDispatch()
  const usersData = useSelector((state) => state.UsersReduers.users);
  console.log("display", usersData);
  console.log("users",users)
   
  const handledelete=(index)=>{
    dispatch({type:"Delete_user",payload:index})
  }

  useMemo(()=>{
      handledelete()
      
  },[])


  const handleedit=(item,index)=>{  
    navigate("/edituser",{state:{item,index}})

  }
  const handlehome=()=>{
    navigate("/")
  }

  useEffect(() => {
    setUsers(usersData);
  }, []);

  useEffect(()=>{
      setUsers(usersData)
  },[usersData])
  return (
    <React.Fragment>
      <h1>Users Details</h1>
      <Grid container>
        <Grid item xs={3}>
            <table border={"2px"}>
                <tr>
                    <th>Name</th>
                    <th>Phone</th>
                    <th>Email</th>
                    <th>Username</th>
                    <th>Password</th>
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>
          {users.map((item,index) => (
            <>
              <tr>
                <td>{item.name}</td>
                <td>{item.phone}</td>
                <td>{item.email}</td>
                <td>{item.username}</td>
                <td>{item.password}</td>
                <td><Button variant="contained" onClick={()=>handleedit(item,index)}>Edit</Button></td>
                <td><Button variant="contained" onClick={()=>handledelete(index)}>Delete</Button></td>
              </tr>
            </>
          ))}
          </table>
        </Grid>
      </Grid>
        <Grid item xs={3}><Button variant="contained" onClick={handlehome}>Back to LoginPage</Button></Grid>
    </React.Fragment>
  );
};
