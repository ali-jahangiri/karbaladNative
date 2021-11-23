import config from "../config"

const imageFinder = (path = "") => {
    if(path.includes("{") && path.includes("}")) {
        return `${config.serverPath}/files/${path.slice(0 , path.indexOf("{"))}`
    }else return `${config.serverPath}/files/${path}`
}


export default imageFinder;