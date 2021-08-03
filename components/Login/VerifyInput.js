import React , { useRef, useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { useStyle } from '../../Hooks/useStyle';
import { generateColor } from '../../utils';

const VerifyInput = ({  changeHandler }) => {
    const appendStyle = useStyle(style);
    const [value, setValue] = useState(new Array(4).fill(""));
    const refs = useRef(new Array(4).fill("").map((_ , i) => React.createRef()));
    const [force, setForce] = useState(null);

    const onChange = (newValue , index) => {
        if(newValue) {
            refs?.current?.[index + 1]?.current?.focus();
        }else {
            refs?.current?.[index - 1]?.current?.focus();
        }
        setValue(prev => {
            prev[index] = newValue;
            return prev
        });
        setForce(Date.now());
        changeHandler(value.join(""));
    }
    
    return (
        <View style={appendStyle.container} > 
            {
                new Array(4).fill("").map((_ , i) => (
                    <TextInput 
                        value={value[i]} 
                        autoFocus={!i} 
                        keyboardType="number-pad"
                        ref={refs.current[i]} 
                        maxLength={1} 
                        key={i}
                        style={[appendStyle.input , value[i] ? appendStyle.activeInput : {}]}
                        onChangeText={value => onChange(value , i)} />
                ))
            }
        </View>
    )
}


const style = ({ primary , baseBorderRadius }) => StyleSheet.create({
    container : {
        flexDirection : 'row' , 
        justifyContent : 'space-between' , 
        marginVertical : 50 , 
        width : "95%" , 
        marginHorizontal : "2.5%"
    },
    input : {
        borderWidth : 2, 
        fontSize : 24 , 
        borderColor : generateColor(primary, 5), 
        width : "20%" ,
        textAlign : "center" , 
        fontFamily : "bold",
        color: primary,
        borderRadius : baseBorderRadius,
        padding: 15
    },
    activeInput : {
        borderColor : primary,
        backgroundColor : generateColor(primary , 2)
    }
})


export default VerifyInput;