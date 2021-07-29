import React, { useEffect } from 'react';
import { AppState } from 'react-native';

import { useDispatch } from '../Store/Y-state';
import { setNavigationNewHash } from '../Store/Slices/navigationSlice';
import { useNavigationState } from '@react-navigation/native';


const CommutingProvider = () => {
    const dispatcher = useDispatch();
    // const state = useNavigationState(state => state);
    // const routeName = (state.routeNames[state.index])

    // console.log('====================================');
    // console.log(routeName , 'routeName');
    // console.log('====================================');

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