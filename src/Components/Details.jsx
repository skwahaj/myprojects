import React from "react"
import { TextField,Button,Grid,Card,CardContent,Avatar } from "@mui/material";
import { useState } from "react";


export const Details =()=>{
    const [Fname,setFname]=useState("")
    const [Mname,setMname]=useState("")
    const [Lname,setLname]=useState("")
    const [Dob,setDob]=useState("")
    const [Email,setEmail]=useState("")
    const [Phone,setPhone]=useState("")
    const [Add,setAdd]=useState("")
    const [Offadd,setOffadd]=useState("")
    // const [pan,setPan]=useState("")


    const [alldetails,setAlldetails]=useState([])
    console.log(alldetails)
    
    const handlesave=()=>{
        setAlldetails([...alldetails,{Fname,Lname,Mname,Dob,Email,Phone,Add,Offadd}])
        // const newPan = genPan();
        // setPan(newPan);
    }
    const handledelte=(index)=>{
        const result =alldetails.filter((elem,ind)=>ind  !==index)
        setAlldetails(result)
    }

    // function genPan() {
    //     const alpha = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    //     const nums = "1234567890";
    //     let pan = "";
    
    //     for (let i = 0; i < 5; i++) {
    //       pan += alpha.charAt(Math.floor(Math.random() * alpha.length));
    //     }
    
    //     for (let i = 0; i < 4; i++) {
    //       pan += nums.charAt(Math.floor(Math.random() * nums.length));
    //     }
    
    //     pan += alpha.charAt(Math.floor(Math.random() * alpha.length));
    
    //     return pan;
    //   }
    

    return(
        <div>
            <Grid container spacing={2} sx={{padding:5}}>
            
                <Grid item xs={4} > <TextField label=" First Name" variant="outlined" fullWidth  onChange={(e)=>setFname(e.target.value)}/> </Grid>
                <Grid item xs={4} > <TextField label="Middle Name" variant="outlined" fullWidth onChange={(e)=>setMname(e.target.value)}/> </Grid>
                <Grid item xs={4} > <TextField label="Last Name" variant="outlined" fullWidth onChange={(e)=>setLname(e.target.value)}/> </Grid>

                <Grid item xs={4}> <TextField  label="Date of Birth" variant="outlined"fullWidth onChange={(e)=>setDob(e.target.value)} /></Grid>
                <Grid item xs={4}> <TextField  label="Email" variant="outlined" fullWidth onChange={(e)=>setEmail(e.target.value)}/></Grid>
                <Grid item xs={4}> <TextField  label="Mobile number" variant="outlined" fullWidth onChange={(e)=>setPhone(e.target.value)}/></Grid>


                <Grid item xs={12} ><label htmlFor="" style={{fontSize:18,fontWeight:"bolder"}}>Address:</label></Grid>
                <Grid item xs={6}><TextField id="outlined-basic"  label="Permanent" variant="outlined"  fullWidth onChange={(e)=>setAdd(e.target.value)}/></Grid>
               
                <Grid item xs={6}><TextField id="outlined-basic"  label="Official" variant="outlined" fullWidth onChange={(e)=>setOffadd(e.target.value)}/></Grid>
               

                <Grid item xs={4}></Grid>
                <Grid item xs={2}> <Button variant="contained"color="success" fullWidth onClick={handlesave}> Save</Button> </Grid>
                
                <Grid item xs={2}> <Button variant="contained" color="error" fullWidth  >Cancle</Button> </Grid>
                <Grid item xs={4}></Grid>
            </Grid><br />

            <Grid container spacing={2}>
                {alldetails.map((item,index)=>{
                    return(
                        <Grid item xs={3}>
                            <Card sx={{bgcolor:"aqua",}}>
                                <CardContent align="center">
                                    <Avatar  />
                                    <h2>Full Name:{`${item.Fname} ${item.Mname} ${item.Lname}`}</h2>
                                    <h3>DOB:{item.Dob}</h3>
                                    <h4>Email:{item.Email}</h4>
                                    <h5>Phone{item.Phone}:</h5>
                                    <h6>Address:{item.Add}</h6>
                                    <h6>office Address:{item.Offadd}</h6>
                                    <Button variant="contained" onClick={()=>handledelte(item,index)}>Delete</Button>
                                </CardContent>
                            </Card>
                        </Grid>
                    )
                })
                }

            </Grid>















            {/* <h1>Your Detailes</h1> */}




            





        </div>


    );
};