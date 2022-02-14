import appConfig from "../app.json";

const imageFinder = (path = "") => {
    if(path.includes("{") && path.includes("}")) {
        return `${appConfig.customConfigDetails.serverPath}/files/${path.slice(0 , path.indexOf("{"))}`
    }else return `${appConfig.customConfigDetails.serverPath}/files/${path}`
}


export default imageFinder;