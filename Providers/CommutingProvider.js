import React, { useEffect } from 'react';
import { AppState } from 'react-native';

import { useDispatch } from '../Store/Y-state';
import { setNavigationNewHash } from '../Store/Slices/navigationSlice';


const CommutingProvider = () => {
    const dispatcher = useDispatch();
    
    useEffect(() => {
        AppState.addEventListener("change" , e => {
            if(e === "active") {
                dispatcher(() => setNavigationNewHash())
            }
        })
        return () => AppState.removeEventListener("change" , () => {})
    } , [])
    
    return null;
}



export default CommutingProvider;