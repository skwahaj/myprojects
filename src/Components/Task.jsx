import React, { useState } from "react"

export const Task=()=>{
    const [name,setName]=useState("")
    const [data,setData]=useState([])
    const [isNum,setIsnum]=useState(null)
    const[isEdit,setisedit]=useState(false)

    const handleAdd=()=>{
     
        if(isEdit==true){
            data.splice(isNum,1,name)
            
            setIsnum(null)
            setisedit(false)
        }else{

        setData([...data,name])
        }
    }
    const handledlt=(index)=>{
        const fil=data.filter((elem,i)=>i!==index)
        setData(fil)
    }
    const handleedit=(item,index)=>{
        setName(item)
        setIsnum(index)
        setisedit(true)
    }

    return(
        <>
        <h1>Task</h1>
        <input type="text" onChange={(e)=>setName(e.target.value)}/>
        <button onClick={handleAdd}>Add</button>
            {
                data.map((item,index)=>{
                    return(
                        <>
                        <h1>{item}</h1>
                        <button onClick={()=>handledlt(index)}>Dlt</button>
                        <button onClick={()=>handleedit(item,index)}>Edit</button>
                        </>
                    )
                })
            }
        </>
    )
}