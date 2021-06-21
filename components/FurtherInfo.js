import { Feather } from '@expo/vector-icons';
import React, { useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { useStyle } from '../Hooks/useStyle';
import { generateColor } from '../utils';
import Para from './Para';
import RequirementInput from './RequirementInput';


const FurtherInfo = ({ onChange , items , valueStore}) => {
    const appendStyle = useStyle(style);
    const [currentFocusInput, setCurrentFocusInput] = useState(null);
    const [showMore, setShowMore] = useState(true);


    const onInputChange = (key , value) => {
        onChange(prev => ({
                ...prev,
                [key] : value
        }));
    }

    return (
        <View style={appendStyle.container}>
            <TouchableOpacity onPress={() => setShowMore(!showMore)} style={appendStyle.header}>
                <View style={{ padding : 10 }} >
                    <Feather name={`chevron-${showMore ? "up" : "down"}`} size={24} color="black" />
                </View>
                <View style={{ flexDirection : "row" , alignItems : "center" }}>
                    <Para weight="bold" size={18}>مدارک مورد نیاز</Para>
                    <View style={appendStyle.titleDivider} />
                </View>
            </TouchableOpacity>
            <View style={{ display : showMore ? "flex" : "none" }}>
            {
                items.map((el , i) => (
                    <RequirementInput 
                        store={valueStore} 
                        onChange={onInputChange} 
                        label={el.name} 
                        formName={el.formName} 
                        currentActive={currentFocusInput} 
                        setCurrentActive={setCurrentFocusInput} 
                        index={i}  />
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
        justifyContent : "space-between",
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