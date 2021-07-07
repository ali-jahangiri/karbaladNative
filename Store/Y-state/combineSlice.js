import { useCallback } from "react";

const combineSlice = (slices = {}) => {
    const value = {};
    Object.entries(slices)
        .map(([sliceName , internalStore]) => {
            value[sliceName] = internalStore[sliceName]
        });
        
    return {
        value,
    }
}

export default combineSlice;