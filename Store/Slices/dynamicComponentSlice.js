import { createSlice } from "../Y-state";

const dynamicComponentSlice = createSlice({
    name : "dynamicComponent",
    initialState : [],
    reducers : {
        setDynamicComponent(_ , payload) {
            return payload
        }
    }
})


export const { setDynamicComponent } = dynamicComponentSlice.actions;
export default dynamicComponentSlice.reducer;