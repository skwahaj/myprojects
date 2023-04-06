import React from "react";
import { Grid,Button,Card,CardContent } from "@mui/material";
import { Link } from "react-router-dom";


export const Nav = () => {
  return (
    <React.Fragment>
      <Card sx={{bgcolor:"cadetblue"}}><CardContent>
      <Grid container spacing={2}>
        <Grid item xs={1}><Link to="/"><Button fullWidth variant="contained" color="success">Home</Button></Link></Grid> 
        <Grid item xs={1}><Link to="/todo"><Button fullWidth variant="contained" color="secondary">TodoList</Button></Link></Grid>
        <Grid item xs={1}><Link to="/undoredo"><Button fullWidth variant="contained" color="secondary">Undoredu</Button></Link></Grid>
        <Grid item xs={1}><Link to="/counter"><Button fullWidth variant="contained" color="secondary">Counter</Button></Link></Grid>
        <Grid item xs={1}><Link to="/api"><Button fullWidth variant="contained" color="secondary">Api</Button></Link></Grid>
        <Grid item xs={1}><Link to="/turnary"><Button fullWidth variant="contained" color="secondary">Turnary</Button></Link></Grid>
        <Grid item xs={1}><Link to="/classcomponent"><Button fullWidth variant="contained" color="secondary">Classcomp</Button></Link></Grid>
        <Grid item xs={1}><Link to="/classtodo"><Button fullWidth variant="contained" color="secondary">Clstodo</Button></Link></Grid>
        <Grid item xs={1}><Link to="/Bulb"><Button fullWidth variant="contained" color="secondary">Bulb</Button></Link></Grid>
        <Grid item xs={1}><Link to="/Details"><Button fullWidth variant="contained" color="secondary">Details</Button></Link></Grid>
        <Grid item xs={1}><Link to="/Studentslist"><Button fullWidth variant="contained" color="secondary">Studentslist</Button></Link></Grid>
        <Grid item xs={1}><Link to="/Stafflist"><Button fullWidth variant="contained" color="secondary">Stafflist</Button></Link></Grid>
        <Grid item xs={1}><Link to="/AddStaff"><Button fullWidth variant="contained" color="secondary">AddStaff</Button></Link></Grid>
        <Grid item xs={1}><Link to="/AddStudent"><Button fullWidth variant="contained" color="secondary">AddStudent</Button></Link></Grid>
        <Grid item xs={1}><Link to="/EditStaff"><Button fullWidth variant="contained" color="secondary">EditStaff</Button></Link></Grid>
        <Grid item xs={1}><Link to="/Useref"><Button fullWidth variant="contained" color="secondary">Useref</Button></Link></Grid>
        <Grid item xs={1}><Link to="/Usememo"><Button fullWidth variant="contained" color="secondary">Usememo</Button></Link></Grid>
      </Grid>
      </CardContent></Card>
    </React.Fragment>
  );
};
