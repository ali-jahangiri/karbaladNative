import { createSlice } from "../Y-state";

const initialSlice = createSlice({
    name : "initial",
    initialState : {
        userData : {},
        insCat : [],
        completelyLoaded : false
    },
    reducers : {
       setUserData(state , payload) {
           return {
               ...state,
               userData : payload
           }
       },
       setInsCat(state , payload) {
           return {
               ...state,
               insCat : payload
           }
       },
       setWasCompletelyLoaded(state){
           return {
               ...state,
               completelyLoaded : true
           }
       }
    }
})

export const {  setUserData , setInsCat , setWasCompletelyLoaded } = initialSlice.actions;
export default initialSlice.reducer;