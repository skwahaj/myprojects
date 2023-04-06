import React, { useState } from "react";
import { Button,TextField,Grid } from "@mui/material";



export const Tasks=()=>{
const [name,setName]=useState("")
const [data,setData]=useState([])
const handleadd=()=>{ 
setData([...data,name])
setName("")
}


return(
<>
<h1>hello</h1>
<TextField value={name} onChange={(e)=>setName(e.target.value)} variant="outlined" />
<Button onClick={handleadd} >add</Button>
        {data.map((item,index)=>{
    return(
         <>
        <h1>{index+1}-{item}</h1>
        </>
    )
})

    
}

</>

)

}
