const initialData={
    users:[
        {name:"wahaj",phone:1234567890,email:"Sk.wahaj@gmail.com",username:"wahaj@123",password:"wahaj123"},
        {name:"admin",phone:1234567890,email:"admin@123.com",username:"admin@123",password:"admin123"},
    ]
}
export const UsersReduers=(state=initialData,action)=>{
    if(action.type==="Add_user"){
        return {...state,users:[...state.users,action.payload]}
    }
    if(action.type==="Delete_user"){
        const result=state.users.filter((item,i)=> i !=action.payload)
        return{...state,users:result}
    }
    if(action.type==="Edit-user"){
        state.users.splice(action.payload.index,1,action.payload.user)
        console.log("action====",action.payload)
        return{...state,users:state.users}
        console.log(state.users)
    }
    return state
}