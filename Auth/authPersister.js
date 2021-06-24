import * as SecureStore from "expo-secure-store";
import { Alert } from "react-native";


const authPersist = (() => {
    const storeKeyHelper = "authToken";

    const setToken = async authToken => {
        try {
            await SecureStore.setItemAsync(storeKeyHelper , authToken)
        }catch(err) {
            alert("مشکلی در ورود به برنامه رخ داده است")
        }
    }

    const getToken = async () => {
        try {
            return await SecureStore.getItemAsync(storeKeyHelper)
        }catch(err) {
            alert("مشکلی در ورود به برنامه رخ داده است")
        }
    }

    const clearToken = async () => {
        try {
            await SecureStore.deleteItemAsync(storeKeyHelper)
        }catch(err) {
            alert("مشکلی در ورود به برنامه رخ داده است")
        }
    }

    return {
        setToken,
        getToken,
        clearToken
    }
})()



export default authPersist;