import React from "react";
import { Component } from "react";
import { Button } from "@mui/material";


export default class Classcomponent extends Component{
    
    state={
            count:0,
            count2:10,
            text:"hello"
    }
    handleAdd=()=>{
      this.setState({count:this.state.count+1,text:this.state.text="Increment"})
    }
    // // handleAdd2=()=>{
    // //   this.setState({count2:this.state.count2+1,text:this.state.text="Increment"})
    // // }
    // // componentDidMount(){
    // //     this.setState({count2:this.state.count2+10})
    // }
    handleAdd3=()=>{
        this.setState({count:this.state.count -1,count2:this.state.count2 -1,text:this.state.text="decrement"})
        
      }
    render(){
        return(
            <div>
                <h1>This is class component</h1>
                <h1>Counter:- {this.state.text}</h1>
                <h1>Counter:- {this.state.count}</h1>
                {/* <h1>Counter:- {this.state.count2}</h1> */}
                <Button variant="contained" onClick={this.handleAdd}>click</Button>
                {/* <Button variant="contained" onClick={this.handleAdd2}>click</Button> */}
                <Button variant="contained" onClick={this.handleAdd3 }>dec</Button>
                
            </div>
        )
    }
}