import React, { useEffect } from 'react';
import { Alert, StyleSheet, TextInput, View } from 'react-native';
import { useStyle } from '../Hooks/useStyle';
import { Feather } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { generateColor, numberSeparator, toFarsiNumber } from '../utils';

const makePureNumber = (string = '') => Number(String(string).replace(/\W+/g, ''))

var
persianNumbers = [/۰/g, /۱/g, /۲/g, /۳/g, /۴/g, /۵/g, /۶/g, /۷/g, /۸/g, /۹/g],
arabicNumbers  = [/٠/g, /١/g, /٢/g, /٣/g, /٤/g, /٥/g, /٦/g, /٧/g, /٨/g, /٩/g],
fixNumbers = function (str)
{
  if(typeof str === 'string')
  {
    for(var i=0; i<10; i++) {
      str = str.replace(persianNumbers[i], i).replace(arabicNumbers[i], i);
    }
  }
  return str;
};

const InputNumber = ({ onChange , stepForEachOperation = 10000, length : { max , min } , value = min , isNotLimited , triggersStyle , liftValueForFirstTime }) => {
    const appendStyle = useStyle(style , triggersStyle);
    const { primary } = useStyle();


    useEffect(() => {
        if(liftValueForFirstTime) onChange({ value : min });
    } , [])


    const changeHandler = value => {
        let newValue = makePureNumber(fixNumbers(value))
        if(newValue < min) {
            Alert.alert(`حداقل مقدار ورودی ${numberSeparator(min)} میباشد` , null , [{ text : "تایید" }])
            onChange({ value : min })
        }else if(newValue > max) {
            Alert.alert(`حداکثر مقدار ورودی ${numberSeparator(max)} میباشد` , null , [{ text : "تایید" }])
            onChange({ value  : max })
        }else {
            onChange({ value : newValue })
        }
    }

    const increaseHandler = () => value < max && onChange({ value : +value + stepForEachOperation });

    const decreaseHandler = () => value > stepForEachOperation && onChange({ value : +value - stepForEachOperation });

    return (
        <View style={{ flex : 1 , alignItems : 'center' , justifyContent : 'center'}}>
            <View style={appendStyle.container}>
                <TouchableOpacity onPress={increaseHandler} style={appendStyle.controller}>
                    <Feather name="plus" size={24} color={primary} />
                </TouchableOpacity>
                <View style={appendStyle.inputContainer}>
                    <TextInput 
                        value={numberSeparator(toFarsiNumber(value))} 
                        keyboardType="numeric"
                        maxLength={numberSeparator(max).length} 
                        style={appendStyle.input} 
                        onChangeText={changeHandler} 
                        />
                </View>
                <TouchableOpacity onPress={decreaseHandler} style={[appendStyle.controller , value <= stepForEachOperation ? appendStyle.disabledCta : null]}>
                    <Feather name="minus" size={24} color={primary} />
                </TouchableOpacity>
            </View>
        </View>
    )
}


const style = ({ baseBorderRadius , primary } , triggersStyle) => StyleSheet.create({
    container : {
        flexDirection : 'row',
        alignItems : 'center',
    },
    controller : {
        backgroundColor : generateColor(primary , 5),
        borderRadius : baseBorderRadius,
        alignItems : 'center',
        padding: 20,
        ...triggersStyle
    },
    inputContainer : {
        flex: 1,
        justifyContent : 'center',
    },
    input : {
        fontSize : 22,
        fontFamily : "bold",
        textAlign : 'center',
    },
    disabledCta : {
        backgroundColor :  generateColor('#B2B1B9' , 1) ,
    }
})

export default InputNumber;