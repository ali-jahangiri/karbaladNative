import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { useStyle } from '../Hooks/useStyle';

import { Feather } from '@expo/vector-icons';
import Para from './Para';
import { generateColor, toFarsiNumber } from '../utils';
import { TouchableOpacity } from 'react-native-gesture-handler';


const ProfileEditableInput = ({ value , onChange , label }) => {
    const [editable, setEditable] = useState(false);
    const appendStyle = useStyle(style , editable);
    
    const inputRef = useRef();


    const editableHandler = () => {
        setEditable(prev => !prev);
    }
    
    useEffect(() => {
        if(editable) {
            inputRef.current?.focus();
        }
    } , [editable])

    return (
        <View style={appendStyle.container}> 
            <TouchableOpacity onPress={editableHandler} style={appendStyle.editableContainer}>
                <Feather style={appendStyle.editableIcon} name="edit-2" size={24} color="black" />
            </TouchableOpacity>
            
            <View>
                <Para size={15} color="grey">{label}</Para>
            {
                    editable ? <View style={{ flexDirection : "row", alignItems : 'center' ,justifyContent : "flex-end" }}>
                        <TextInput
                                    onBlur={() => setEditable(false)}
                                    ref={inputRef}
                                    style={appendStyle.input}
                                    value={'ایران'}
                                    onChangeText={value => onChange(value)} />
                    <View style={appendStyle.bullet} />
                    </View> : <Para size={16} weight="bold" >{toFarsiNumber('200002454578')}</Para>
            }
            </View>
        </View>
    )
}

const style = ({ primary , baseBorderRadius } , editable ) => StyleSheet.create({
    container : {
        width : "90%",
        marginHorizontal : "5%",
        marginVertical : 10,
        flexDirection : "row",
        justifyContent : 'space-between',
        alignItems : 'center'
    },
    input : {
        fontSize : 16,
        fontFamily : "bold"
    },
    editableContainer : {
        backgroundColor : generateColor(primary , 1),
        borderRadius : baseBorderRadius,
        padding: 10
    },
    editableIcon : {
        color: editable ?  generateColor(primary , 9) : 'grey',
    },
    bullet : {
        backgroundColor : generateColor(primary , 8),
        width: 30,
        height : 10,
        borderRadius : baseBorderRadius,
        marginLeft : 10
    }
})

export default ProfileEditableInput;