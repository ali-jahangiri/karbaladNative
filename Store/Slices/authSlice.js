import { createSlice } from "../Y-state"
const authSlice = createSlice({
    name : "auth",
    initialState : {
        appKey : null,
        userName : "",
        systemTime : null,
        seeWelcome : null,
    },
    reducers : {
        setAppKey : (state , payload) => {
            return {
                ...state,
                appKey : payload
            }
        },
        setSeeWelcomeScreen(state , payload) {
            return {
                ...state,
                seeWelcome : payload
            }
            
        },
        setUserName : (state , payload) => {
            return {
                ...state,
                userName : payload
            }
        },
        setSystemTime : (state , payload) => {
            return {
                ...state,
                systemTime : payload
            }
        }
    }
})

export const { setAppKey , setUserName , setSystemTime , setSeeWelcomeScreen } = authSlice.actions;
export default authSlice.reducer;