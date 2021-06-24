import React, { useEffect, useRef, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useStyle } from '../Hooks/useStyle';
import Para from './Para';
import SelectBoxItem from './SelectBoxItem';


import { Feather } from '@expo/vector-icons';

const SelectBoxOptimized = ({ items , onSelect , selectedItem  , labelKey = "dataName"}) => {
    const [currentStep, setCurrentStep] = useState(() => {
        if(items.findIndex(el => el.id === selectedItem) < 10) {
            return 10
        }else {
            return items.findIndex(el => el.id === selectedItem) + 5
        }
    });
    
    const appendStyle = useStyle(style);
    const containerRef = useRef();

    return (
        <View style={appendStyle.container}>
            <ScrollView ref={containerRef} onContentSizeChange={() => containerRef.current.scrollToEnd({ animated : true })}>
                {
                    items?.filter(el => el?.dataName)?.slice(0 , currentStep)?.map((el , i) => (
                        <SelectBoxItem
                            onSelect={onSelect}
                            selectedInStore={selectedItem === el.id}
                            value={el.id}
                            key={i}
                        >
                            {el?.[labelKey]}
                        </SelectBoxItem>
                    ))
                }
            </ScrollView>
            {
                currentStep <= items.length ? 
                <TouchableOpacity style={appendStyle.moreCta} onPress={() => setCurrentStep(prev => prev + 10)}>
                    <Feather style={{ marginRight : 10 }} name="plus" size={24} color="black" />
                    <Para align="center" weight="bold" >گزینه های بیشتر</Para>
                </TouchableOpacity> : null
            }
        </View>
    )
}

const style = ({ baseBorderRadius }) => StyleSheet.create({
    container : {
        flex: 1,
    },
    moreCta : {
        width: "100%",
        padding: 15,
        borderRadius : baseBorderRadius,
        backgroundColor : "#8b8d9408",
        marginBottom : 10,
        flexDirection : "row",
        justifyContent : "center"
    }
})

export default SelectBoxOptimized;