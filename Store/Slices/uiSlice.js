import { createSlice } from "../Y-state";

const uiSlice = createSlice({
    name : "ui",
    initialState : {
        tabBarBgColor : "transparent"
    },
    reducers : {
        setTabBarState(state , payload) {
            return {
                ...state,
                tabBarBgColor : payload
            }
        }
    }
})




export const { setTabBarState } = uiSlice.actions;
export default uiSlice.reducer;