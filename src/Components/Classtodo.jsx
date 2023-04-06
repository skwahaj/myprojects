import React, { Component } from "react";




export default class Classtodo extends Component{
    
    state={
        text:"",
        list:[]
    }
    handleadd=()=>{
        this.setState({list:[...this.state.list,this.state.text]})
        // this.setState({text:this.state.add})

      }
      handledelet=(ind)=>{
        const result=this.state.list.filter((item,i)=> i!==ind)
        this.setState({list:result})
      }
    
    render(){
        return(
            <div>
                <input onChange={(e)=>this.setState({text:e.target.value})} type="text" />
                <button onClick={this.handleadd}>add</button>
               { this.state.list.map((item,ind)=>{
                   return(
                       <>
                       <h3>{item}{ind+1}</h3>
                       <button onClick={()=>this.handledelet(ind)}>delet</button>
                
                </>
                )
    })}
            </div>

        )
    }
}