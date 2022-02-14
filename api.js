import axios from "axios"
import appConfig from "./app.json";


const api = axios.create({
    headers : {
        packageName : appConfig.customConfigDetails.packageName,
    },
    baseURL : `${appConfig.customConfigDetails.serverPath}/MobileApi/`
})


export default api;
