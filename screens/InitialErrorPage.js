import { Feather } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import Para from '../components/Para';


const InitialErrorPage = ({ resetHandler , errMessage }) => (
    <View style={style.container}>
        <Feather name="x" style={{ marginBottom : 10 }} size={50} color="black" />
            <Para weight="bold" size={19}>مشکلی در پردازش اطلاعات رخ داده است</Para>
            <Para color="grey" size={15} style={{ marginVertical : 10 }}>{errMessage}</Para>
            <TouchableOpacity onPress={resetHandler}>
                <Para align='center' color="green">بارگزاری مجدد</Para>
            </TouchableOpacity>
    </View>
)
const style = StyleSheet.create({
    container : {
        flex : 1,
        alignItems : 'center',
        justifyContent : 'center'
    },
})

export default InitialErrorPage;