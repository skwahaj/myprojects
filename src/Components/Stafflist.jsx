import React, { useEffect, useState } from "react";
import { useSelector,useDispatch } from "react-redux";
import { Grid, Card, CardContent,Button } from "@mui/material";

export const Stafflist = () => {
  const [data, setdata] = useState([]);
  const dispatch=useDispatch()

  const result = useSelector((state) => state.staffReduccers.staffData);
  console.log(result);
  

  const handeDelete=(ind)=>{
    dispatch({ type: "Delete_Item", payload: ind })
  }
useEffect(()=>{
    setdata(result);
},[result])

  useEffect(() => {
    setdata(result);
  }, []);

  return (
    <React.Fragment>
      <br />
      <Grid container spacing={3}>
        {data.map((item,ind) => {
          return (
            <>
              <Grid item xs={4}>
                <Card sx={{ bgcolor: "coral" }}>
                  <CardContent>
                    <h2> Name: {item.name} </h2>
                    <h2>Department: {item.department}</h2>
                    <h2>Experience: {item.experience}</h2>
                    <Button variant="contained" onClick={()=>handeDelete(ind)}>Delete</Button>
                    <Button variant="contained" >Edit</Button>
                  </CardContent>
                </Card>
              </Grid>
            </>
          );
        })}
      </Grid>
    </React.Fragment>
  );
};
