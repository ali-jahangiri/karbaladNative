import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import Para from '../components/Para';


const ErrorPage = ({ resetHandler , errMessage }) => {
    return (
        <View style={style.container}>
            <Para>
                مشکلی در پردازش اطلاعات رخ داده است
            </Para>
            <Para style={{ marginVertical : 10 }}>
                {errMessage}
            </Para>
            <TouchableOpacity style={style.actionContainer} onPress={resetHandler}>
                <Para align='center' color={"blue"}>
                    بارگزاری مجدد
                </Para>
            </TouchableOpacity>
        </View>
    )
}

const style = StyleSheet.create({
    container : {
        flex : 1,
        alignItems : 'center',
        justifyContent : 'center'
    },
    actionContainer : {
        width : "100%",
        padding : 15
    }
})

export default ErrorPage;