import { createSlice } from "../Y-state";

const navigationSlice = createSlice({
    name : "navigation",
    initialState : {
        navigationHash : 0,
    },
    reducers : {
        setNavigationNewHash(){
            return {
                navigationHash : Date.now()
            }
        }
    }
})

export const { setNavigationNewHash } = navigationSlice.actions
export default navigationSlice.reducer;