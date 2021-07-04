import { createSlice } from "../Y-state"
const authSlice = createSlice({
    name : "auth",
    initialState : {
        appKey : null,
        userName : "",
        systemTime : null
    },
    reducers : {
        setAppKey : (state , payload) => {
            return {
                ...state,
                appKey : payload
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

export const { setAppKey , setUserName , setSystemTime } = authSlice.actions;
export default authSlice.reducer;