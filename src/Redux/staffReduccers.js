const initialState = {
  staffData: [
    { name: "aamer", department: "sceince", experience: "3 years" },
    { name: "wahaj", department: "sceince", experience: "4 years" },
    { name: "israr", department: "sceince", experience: "6 years" },
    { name: "samad", department: "sceince", experience: "5 years" },
    { name: "burhan", department: "sceince", experience: "2 years" },
  ],
};

export const staffReduccers = (state = initialState, action) => {
  if(action.type==="add_item"){
    return{
      ...state,staffData:[...state.staffData,action.payload]
    }
  }

  if (action.type === "Delete_Item") {
    const result = state.staffData.filter((elem, i) => i !=action.payload);
    return { ...state, staffData: result };
  }
  return state;
};
