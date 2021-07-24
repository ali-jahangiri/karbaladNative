import React, { useEffect, useState } from 'react';
import { Keyboard, StatusBar, StyleSheet, TouchableOpacity, View } from 'react-native';
import Para from '../components/Para';

import ScreenWrapper from '../components/ScreenWrapper';
import { useStyle } from '../Hooks/useStyle';
import { useDispatch, useSelector } from '../Store/Y-state';
import { generateColor } from '../utils';
import { Feather } from '@expo/vector-icons';
import useFetch from '../Providers/useFetch';
import { setInsCat, setUserData, setWasCompletelyLoaded } from '../Store/Slices/initialSlice';
import client from '../client';

const Welcome = ({ continueHandler }) => {
    const appendStyle = useStyle(style);
    const ticket = useSelector(state => state.auth.appKey);
    const storeDispatcher = useDispatch();
    const [loading, setLoading] = useState(true);


    
    const fetcher = useFetch(true);

    useEffect(() => {
        Keyboard.dismiss();
        fetcher()
            .then(({ api , appToken }) => {
                return api.post('userProfile' , {} ,{
                    headers : {
                        ticket,
                        appToken
                    }
                }).then(({ data }) => {
                    storeDispatcher(() => setUserData(data))
                    return data
                }).then(_ => {
                    api.post("getCategories" , {} , {
                        headers : {
                            appToken
                        }
                    }).then(({data}) => {
                        storeDispatcher(() => setInsCat(data.cat));
                        storeDispatcher(() => setWasCompletelyLoaded(true));
                        setLoading(false);
                    })
                })
                
            })
    } , []);



    return (
        <ScreenWrapper >
            <View style={appendStyle.container} >
                <Para weight="bold" size={22}>خوش آمدید</Para>
                <View style={appendStyle.deskContainer}>
                    <Para>{client.static.WELCOME_DESK}</Para>
                </View>
                <TouchableOpacity style={[appendStyle.cta , loading ? appendStyle.ctaInLoading : {}]} disabled={loading} onPress={continueHandler}>
                    <Feather style={{ marginRight : 10 }} name={loading ? "loader" : "arrow-left"} size={24} color="black" />
                    <Para weight="bold" size={16} align="center">{loading ? "در حال دریافت اطلاعات اولیه" : "ادامه"}</Para>
                </TouchableOpacity>
            </View>
        </ScreenWrapper>
    )
}

const style = ({ primary , baseBorderRadius }) => StyleSheet.create({
    container : {
        margin: StatusBar.currentHeight + 10,
        flex : 1,
        justifyContent : 'center'
    },
    cta : {
        backgroundColor : generateColor(primary , 5),
        borderRadius : baseBorderRadius,
        padding: 15,
        flexDirection : "row",
        alignItems : 'center',
        justifyContent : 'center'
    },
    deskContainer : {
        marginVertical : 10
    },
    ctaInLoading : {
        opacity: .5
    }
})

export default Welcome;