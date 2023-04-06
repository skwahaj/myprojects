import React from "react";
import { Button,Card,Grid } from "@mui/material";
import { useState } from "react";
import ToggleOffIcon from '@mui/icons-material/ToggleOff';
import ToggleOnIcon from '@mui/icons-material/ToggleOn';

export const Bulb = () => {
  const [image, setimage] = useState(false);

  return (
    <React.Fragment>
    <Grid container align="center">
     <Grid item={12}> <Card >    <img src= {image ? "https://images.twinkl.co.uk/tr/raw/upload/u/ux/lightbulb-1875247-1920_ver_1.jpg"  : "https://media.istockphoto.com/id/519960558/photo/digital-illustration-of-electric-bulb.jpg?s=612x612&w=0&k=20&c=_rhoFOZdoLU0z5hW10NkRfQ6UQbDXJ9SrK7ldVRrvDo="   } style={{height:300, width:500}}/> </Card> </Grid>
     <Grid item={12}> <Button variant="contained" onClick={() => setimage(!image)}>{image ? < ToggleOffIcon style={{width:"40px",height:"40px"}}/> : < ToggleOnIcon style={{width:"40px",height:"40px"}}/> }
      </Button></Grid>
      </Grid>
    </React.Fragment>
  );
};
 