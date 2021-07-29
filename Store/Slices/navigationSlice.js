import { createSlice } from "../Y-state";

const navigationSlice = createSlice({
    name : "navigation",
    initialState : {
        navigationHash : 0,
        currentTab : "",
        currentStack : ""
    },
    reducers : {
        setNavigationNewHash(){
            return {
                navigationHash : Date.now()
            }
        },
        setCurrentTab(state , payload) {
            return {
                ...state,
                currentTab : payload
            }
        },
        setCurrentStack(state , payload) {
            return {
                ...state,
                currentStack : payload
            }
        }
    }
})

export const { setNavigationNewHash , setCurrentStack , setCurrentTab } = navigationSlice.actions
export default navigationSlice.reducer;