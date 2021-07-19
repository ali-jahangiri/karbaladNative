import React, { useEffect } from 'react';
import { AppState } from 'react-native';
import { setNavigationNewHash } from '../Store/Slices/navigationSlice';
import { useDispatch } from '../Store/Y-state';


const CommutingProvider = ({ children  }) => {
    const dispatcher = useDispatch();

    useEffect(() => {
        AppState.addEventListener("change" , e => {
            if(e === "active") {
                dispatcher(() => setNavigationNewHash())
            }
        })
        return () => AppState.removeEventListener("change" , () => {})
    } , [])


    return children
}



export default CommutingProvider;