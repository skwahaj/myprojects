import React from "react";
import { BrowserRouter,Routes,Route } from "react-router-dom";
import { Nav } from "../Components/Nav";
import { Display } from "./Display";
import { Edituser } from "./Edituser";
import { Login } from "./Login";
import { Signup } from "./Signup";

export const Landing=()=>{
    return(
        <React.Fragment>
            <BrowserRouter> 
            <Routes>
                <Route path="/" element ={ <Login/>}/>
                <Route path="/signup" element ={ <Signup/>}/>
                <Route path="/display" element ={ <Display/>}/>
                <Route path="/edituser" element ={ <Edituser/>}/>    
            </Routes>
            </BrowserRouter>
        </React.Fragment>
    )
}