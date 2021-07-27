import { createSlice } from "../Y-state";

const initialSlice = createSlice({
    name : "initial",
    initialState : [],
    reducers : {
       setInsCat(_ , payload) {
           return payload
       },
    }
})

export const { setInsCat } = initialSlice.actions;
export default initialSlice.reducer;