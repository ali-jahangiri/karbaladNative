import { createSlice } from "../Y-state";

const insuranceOrderSlice = createSlice({
    name : "insuranceOrder",
    initialState : {
        insTitle : "",
        otherObe : []
    },
    reducers : {
        setInsTitle : (state , payload) => {
            return {
                ...state,
                insTitle : payload
            }
        }
    }
})


export const { setInsTitle } = insuranceOrderSlice.actions
export default insuranceOrderSlice.reducer;