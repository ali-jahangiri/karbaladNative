import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { useStyle } from '../Hooks/useStyle';
import { Feather } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { numberSeparator } from '../utils';

const makePureNumber = string => Number(string.replaceAll(',' , ""))

const InputNumber = ({ onChange , stepForEachOperation = 10000, value = String(stepForEachOperation) , length : { max , min } , isNotLimited}) => {
    const appendStyle = useStyle(style);
    
    const changeHandler = value => {
        if(makePureNumber(value) < max || isNotLimited ) {
            
            onChange({ value : makePureNumber(value) })
        }
    }

    const increaseHandler = () => 
        value < max && onChange({ value : +value + stepForEachOperation });

    const decreaseHandler = () => {
        value > min && value > stepForEachOperation && onChange({ value : +value - stepForEachOperation });
    }

    return (
        <View style={{ flex : 1 , alignItems : 'center' , justifyContent : 'center'}}>
            <View style={appendStyle.container}>
                <TouchableOpacity onPress={increaseHandler} style={appendStyle.controller}>
                    <Feather name="plus" size={24} color="black" />
                </TouchableOpacity>
                <View style={appendStyle.inputContainer}>
                    <TextInput 
                        keyboardType="numeric" 
                        maxLength={numberSeparator(max).length} 
                        style={appendStyle.input} 
                        onChangeText={changeHandler} 
                        value={numberSeparator(value)} />
                </View>
                <TouchableOpacity onPress={decreaseHandler} style={appendStyle.controller}>
                    <Feather name="minus" size={24} color="black" />
                </TouchableOpacity>
            </View>
        </View>
    )
}


const style = ({ baseBorderRadius , secondary }) => StyleSheet.create({
    container : {
        flexDirection : 'row',
        alignItems : 'center',
    },
    controller : {
        backgroundColor : secondary,
        borderRadius : baseBorderRadius,
        alignItems : 'center',
        padding: 20
    },
    inputContainer : {
        flex: 1,
        justifyContent : 'center',
    },
    input : {
        fontSize : 22,
        fontWeight : 'bold',
        textAlign : 'center',
    }
})

export default InputNumber;