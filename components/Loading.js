import React from 'react';
import { StyleSheet, View , ActivityIndicator } from 'react-native';
import { useStyle } from '../Hooks/useStyle';


const Loading = () => {
    const { primary } = useStyle();

    return (
        <View style={style.container}>
            <ActivityIndicator style={{ padding : 10 }} size="large" color={primary} />
        </View>
    )
}

const style = StyleSheet.create({
    container : {
        flex : 1,
        width: "100%",
        alignItems : 'center',
        justifyContent : 'center',
    },

});

export default Loading;