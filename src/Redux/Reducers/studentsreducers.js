const initialState = {
  studentsData: [
    { name: "raj", age: 32, city: "nanded" },
    { name: "sohel", age: 30, city: "pune" },
    { name: "israr", age: 23, city: "pune" },
    { name: "samad", age: 20, city: "pune" },
  ],
};

export const studentreducer = (state = initialState, action) => {
  if(action.type==="add_item"){
    return{
      ...state,studentsData:[...state.studentsData,action.payload]
    }
  }

  if (action.type === "Delete_Item") {
    console.log("action", action.payload);
    const result = state.studentsData.filter((elem, i) => i != action.payload);
    console.log("result", result);
    return { ...state, studentsData: result };
  }
  return state;
};
