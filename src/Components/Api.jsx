import React, { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { Grid, Card,TextField } from "@mui/material";

export const Api = () => {
  const [apidata, setapidata] = useState([]);
  const [oriapidata, setoriapidata] = useState([]);
  const [text,setText]=useState("")
  console.log(apidata);

  const getdata = async () => {
    const result = await axios.get("https://gorest.co.in/public/v2/users");
    setapidata(result.data);
    setoriapidata(result.data);
  };

  useEffect(() => {
    getdata();
  }, []);
  useEffect(()=>{
    const result=oriapidata.filter((item)=>item.name.toUpperCase().includes(text.toUpperCase()))
    setapidata(result)
  },[text])

  return (
    <React.Fragment>
      <TextField onChange={(e)=>setText(e.target.value)}/>
      <Grid container spacing={3}>
        {apidata.map((item) => {
          return (
            <Grid item xs={4}>
              <Card>
                <h1>{item.name}</h1>
                <h3>{item.email}</h3>
                <h3>{item.gender}</h3>
                <h3>{item.status}</h3>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </React.Fragment>
  );
};
