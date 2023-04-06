import React, { useState } from "react"

export const Task=()=>{
   const [text,setText]=useState("")
   const [data,setData]=useState([])
   const [ind,setInd]=useState(null)
   const [edit,setEdit]=useState(false)

   const handleadd=()=>{

     if(edit===true){
       data.splice(ind,1,text)
       setInd(null)
       setEdit(false)
       setText("")
     } else{

     setData([...data,text])
     setText("")
   }
  }
   const handledlt=(index)=>{
     const fil=data.filter((elem,i)=>i!==index)
     setData(fil)
   }
   const handleEdit=(item,index)=>{
     setText(item)
     setInd(index)
     setEdit(true)

   }

  return(
    <div>
      <h1>Hello</h1>
      <input type="text" value={text} onChange={(e)=>setText(e.target.value)}/>
      <button onClick={handleadd}>add</button>
      

{
  data.map((item,index)=>{
    return(
      <div>
        <h1>{item}-{index+1}</h1>
        <button onClick={()=>handledlt(index)}>Dlt</button>
        <button onClick={()=>handleEdit(item,index)}>edit</button>
      </div>
    )
  })
}

    </div>
  )
}

