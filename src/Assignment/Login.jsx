import React from "react";
import { Grid, TextField, Button, Card, CardContent } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useEffect } from "react";

import { InputAdornment } from '@mui/material'


export const Login = () => {
  const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [userDetails, setUserDetail] = useState(null);

  const usersData = useSelector((state) => state.UsersReduers.users);
  const result = usersData.filter((item) => item.username === username);
  console.log("==result", result);

  // useEffect(() => {
  //   console.log("==usersss", usersData);
  // }, []);

  useEffect(() => {
    setUserDetail(result);
  }, [username]);

  const navigate = useNavigate();
  const handlelogin = () => {
    if (
      username === userDetails[0].username &&
      password === userDetails[0].password
    ) {
      navigate("/display");
    } else {
      alert("please check username and pasword");
    }
  };
  return (
    <React.Fragment>
      <Card
        style={{
          width: "300px",
          marginLeft: "40%",
          marginTop: "80px",
          backgroundColor: "beige",
        }}
      >
        <CardContent align="center">
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <h1>Login Here</h1>
            </Grid>
            <Grid item xs={12}>
              <TextField variant="outlined" placeholder="Usename" type="text"
                onChange={(e) => setUsername(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                placeholder="Password"
                type="password"
              
                onChange={(e) => setPassword(e.target.value)}
              > <InputAdornment/>  </TextField>
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" 
              onClick={handlelogin}>
                Login
              </Button>
            </Grid>
            <Grid item xs={12}>
              <p>
                Need an Account? <Link to="/signup">Sign Up </Link>
              </p>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </React.Fragment>
  );
};
