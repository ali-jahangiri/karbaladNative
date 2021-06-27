const createStore = (slice) => {
    const initialsValue = {};
    Object.entries(slice)
    .map(([sliceName , value]) => {
        initialsValue[sliceName] = value
    });
    return initialsValue
    
}


export default createStore;