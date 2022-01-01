import React, { useEffect, useState } from 'react';
import { StatusBar, StyleSheet, TouchableOpacity, View } from 'react-native';

import { useStyle } from '../Hooks/useStyle';
import { useDispatch } from '../Store/Y-state';
import { generateColor } from '../utils';
import { Feather } from '@expo/vector-icons';
import useFetch from '../Providers/useFetch';
import { setInsCat } from '../Store/Slices/initialSlice';
import client from '../client';



import Para from '../components/Para';
import ScreenWrapper from '../components/ScreenWrapper';
import useData from '../Hooks/useData/useData';

const { PEND_MESSAGE , CONTINUE_MESSAGE } = client.static.WELCOME;

const Welcome = ({ continueHandler }) => {
    const appendStyle = useStyle(style);
    const storeDispatcher = useDispatch();
    const [loading, setLoading] = useState(true);
    const { welcomePageContent } = useData();


    const fetcher = useFetch();

    useEffect(() => {
        fetcher("getCategories")
            .then(({ data }) => {
                storeDispatcher(() => setInsCat(data.cat));
                setLoading(false);
            })
    } , []);

    
    return (
        <ScreenWrapper >
            <View style={appendStyle.container} >
                <Para weight="bold" size={22}>خوش آمدید</Para>
                <View style={appendStyle.deskContainer}>
                    <Para>{welcomePageContent}</Para>
                </View>
                <TouchableOpacity style={[appendStyle.cta , loading ? appendStyle.ctaInLoading : {}]} disabled={loading} onPress={continueHandler}>
                    <Feather style={{ marginRight : 10 }} name={loading ? "loader" : "arrow-left"} size={24} color="black" />
                    <Para weight="bold" size={16} align="center">{loading ? PEND_MESSAGE : CONTINUE_MESSAGE }</Para>
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
    deskContainer : { marginVertical : 10 },
    ctaInLoading : { opacity: .5 }
})

export default Welcome;