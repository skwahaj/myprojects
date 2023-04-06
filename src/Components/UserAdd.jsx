import React,{userState}from "react";
import {Button, Grid, TextField}from "@mui/material";

export const UserAdd = () => {
    const [fname,setfName] = userState("")
    const [mname,setmName] = userState("")
    const [lname,setlName] = userState("")
    const [dob,setdob] = userState("")
    const [email,setemail] = userState("")
    const [mobile,setmobile] = userState("")
    const [address,setaddress] = userState("")
    const [peradd,setperadd] = userState("")
    const [alldata,setalldata]=userState([])

    const handlesave=()=>{
        setalldata([...alldata,{fname,mname,lname,dob,email,mobile,address,peradd}])
        console.log(setalldata)
    }

  return (
    <div>
      <h1>Enter Details</h1>
      <Grid container spacing={3}>
        <Grid item xs={4}>
          <TextField fullWidth variant="outlined" label="First Name" onChange={(e)=>setfName(e.target.value)} />
        </Grid>
        <Grid item xs={4}>
          <TextField fullWidth variant="outlined" label="Middle Name"onChange={(e)=>setmName(e.target.value)} />
        </Grid>
        <Grid item xs={4}>
          <TextField fullWidth variant="outlined" label="Last Name"onChange={(e)=>setlName(e.target.value)} />
        </Grid>
        <Grid item xs={4}>
          <TextField fullWidth variant="outlined" label="D.O.B"onChange={(e)=>setdob(e.target.value)} />
        </Grid>
        <Grid item xs={4}>
          <TextField fullWidth variant="outlined" label="Email Id" onChange={(e)=>setemail(e.target.value)}/>
        </Grid>
        <Grid item xs={4}>
          <TextField fullWidth variant="outlined" label="Mobile Number"onChange={(e)=>setaddress(e.target.value)} />
        </Grid>
        <Grid item xs={4}>
          <TextField fullWidth variant="outlined" label="Address" onChange={(e)=>setperadd(e.target.value)}/>
        </Grid>
        <Grid item xs={8}>
          <TextField fullWidth variant="outlined" label="Permanent official"onChange={(e)=>setmobile(e.target.value)} />
        </Grid>
        <Grid item xs={3}></Grid>
        <Grid item xs={3}>
          <Button fullWidth variant="contained" color="success" onClick={handlesave}>
            Save
          </Button>{""}
        </Grid>
        <Grid item xs={3}>
          <Button fullWidth variant="contained" color="error">
            Cancel
          </Button>{""}
        </Grid>
      </Grid>
    </div>
  );
};