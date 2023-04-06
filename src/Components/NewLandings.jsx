import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Details } from "./Details";
import { Todolist } from "./Todolist";
import { Task } from "./Task";
import { Tasks } from "./Tasks";
import { Practice } from "./Practice";
import { Counter } from "./Counter";
import { UndoRedu } from "./UndoRedu";
import { Home } from "./Home";
import { Api } from "./Api";
import { Turnary } from "./Turnary";
import Classcomponent from "./Classcomponent";
import Classtodo from "./Classtodo";
import { Bulb } from "./Bulb";
import { Studentslist } from "./Studentslist";
import { Stafflist } from "./Stafflist";
import { AddStaff } from "./AddStaff";
import { AddStudent } from "./AddStudent";
import { EditStaff } from "./EditStaff";
import { Nav } from "./Nav";
import { Hom } from "./Hom";
import { Login } from "../Assignment/Login";
import { Signup } from "../Assignment/Signup";
import { Display } from "../Assignment/Display";
import { Edituser } from "../Assignment/Edituser";



export const NewLandings=()=>{
  return (
    <div className="App">
      <BrowserRouter>
      <Nav/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/hom" element ={ <Hom/>}/> 
        <Route path="/todo" element={<Todolist />} />
        <Route path="/undoredu" element={<UndoRedu />} />
        <Route path="/counter" element={<Counter />} />
        <Route path="/api" element={<Api />} />
        <Route path="/turnary" element={<Turnary />} />
        <Route path="/classcomponent" element={<Classcomponent />} />
        <Route path="/classtodo" element={<Classtodo />} />
        <Route path="/bulb" element={<Bulb />} />
        <Route path="/details" element={<Details />} /> 
        <Route path="/studentslist" element={<Studentslist/>} />
        <Route path="/stafflist" element={<Stafflist/>} />
        <Route path="/addStaff" element={<AddStaff/>} />
        <Route path="/addStudent" element={<AddStudent/>} />
        <Route path="/editStaff" element={<EditStaff/>} />
        <Route path="/" element ={ <Login/>}/>
        <Route path="/signup" element ={ <Signup/>}/>
        <Route path="/display" element ={ <Display/>}/>
        <Route path="/edituser" element ={ <Edituser/>}/>
      </Routes>
      </BrowserRouter>
    
    </div>
  );
}

