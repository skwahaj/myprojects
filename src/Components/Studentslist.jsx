import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, CardContent, Grid, Button } from "@mui/material";

export const Studentslist = () => {
  const [data, setdata] = useState([]);
  const dispatch = useDispatch();
  const result = useSelector((state) => state.studentreducer.studentsData);
  console.log(result);

  useEffect(() => {
    setdata(result);
  }, []);
  useEffect(()=>{
    setdata(result);
  },[result])

  const handleDelete = (ind) => {
    dispatch({ type: "Delete_Item", payload: ind });
  };
  return (
    <>
      {/* <h1>data</h1> */}
      <Grid container spacing={2}>
        {data.map((item, ind) => {
          return (
            <React.Fragment>
              <Grid item xs={3}>
                <Card sx={{bgcolor:"coral"}}>
                  <CardContent>
                    <h3>Name: {item.name}</h3>
                    <h3>Age: {item.age}</h3>
                    <h3>City: {item.city}</h3>
                    <Button
                      variant="contained"
                      onClick={() => handleDelete(ind)}
                    >
                      delete
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            </React.Fragment>
          );
        })}
      </Grid>
    </>
  );
};
