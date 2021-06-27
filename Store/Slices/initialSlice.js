import { createSlice } from "../Y-state";

const initialSlice = createSlice({
    name : "initial",
    initialState : {
        insuranceItems : [],
        insuranceHistoryItems : [],
        wallet : {},
        profile : {}
    },
    reducers : {
        setInitial(state , payload) {

        }
    }
})

export const { setInitial } = initialSlice.actions;
export default initialSlice.reducer;