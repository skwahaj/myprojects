import { createStore, combineReducers } from "redux";
import { studentreducer } from "./studentsreducers";
import { staffReduccers } from "../staffReduccers";
import { UsersReduers } from "../Reducers/Usersreducers";

export const configureStore = () => {
  const store = createStore(
    combineReducers({ studentreducer,staffReduccers,UsersReduers }),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );


  return store;
};
