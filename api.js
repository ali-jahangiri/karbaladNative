import axios from "axios"
import config from "./config"

const api = axios.create({
    headers : {
        packageName : config.packageName
    },
    baseURL : `${config.serverPath}/MobileApi/`
})


export default api;
