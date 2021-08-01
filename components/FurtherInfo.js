import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useStyle } from '../Hooks/useStyle';
import { generateColor } from '../utils';
import Para from './Para';
import RequirementInput from './RequirementInput';


const FurtherInfo = ({ setValue , items , value , setIsValid }) => {
    const appendStyle = useStyle(style);
    
    const validation = (newObject) => {
        const reqListForPassing = items.map(el => el.formName);
        reqListForPassing.forEach(el => {
            if(!newObject?.[el]) setIsValid(false);
            else setIsValid(true)
        })
    }

    const onInputChange = (key , value) => {
        setValue(prev => ({
                ...prev,
                [key] : value
        }));
        // validation({...value , [key] : value});
    }

    return (
        <View style={appendStyle.container}>
            <View style={appendStyle.header}>
                <View style={{ flexDirection : "row" , alignItems : "center" }}>
                    <Para weight="bold" size={18}>مدارک مورد نیاز</Para>
                    <View style={appendStyle.titleDivider} />
                </View>
            </View>
            
            <View>
            {
                items.map((el , i) => (
                    <RequirementInput
                        setIsValid={setIsValid}
                        defaultValue={value[el.formName]}
                        key={i}
                        store={value} 
                        onChange={onInputChange} 
                        label={el.name} 
                        formName={el.formName} />
                ))
            }
            </View>
        </View>
    )
}

const style = ({ primary , baseBorderRadius }) => StyleSheet.create({
    container : {
        width: "90%",
        marginHorizontal : "5%",
    },
    header : {
        flexDirection : 'row',
        justifyContent : "flex-end",
        alignItems : "center",
        marginTop : 20,
        marginBottom : 15
    },
    titleDivider : {
        width: 15,
        height: 15,
        borderRadius : baseBorderRadius,
        backgroundColor : generateColor(primary , 5),
        marginLeft : 10
    },

})

export default FurtherInfo;