const booleanExtractor = (string = "") => {
    if(string === "yes") return true
    else if(string === "no") return false;
    else throw new Error('Find Extractor side effect for returning a value')
}


export default booleanExtractor;