const createSlice = (sliceConfig = { name : "string" , initialState : {} , reducers : {} }) => {
    const actions = {};
    
    Object.entries(sliceConfig.reducers)
        .map(([actionName , actionGenerator]) => {
            actions[actionName] = function(payload) {
                return {
                    type : actionName,
                    valueMaker(store) {
                        return actionGenerator(store , payload)
                    },
                    payload,
                    sliceName : sliceConfig.name
                }
            }
    })

    
    const reducer = {
        [sliceConfig.name] : sliceConfig.initialState,
    }
    
    return {
        reducer,
        actions
    }
}

export default createSlice;