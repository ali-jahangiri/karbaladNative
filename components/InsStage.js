import React, { useState } from 'react';
import { StatusBar, StyleSheet, View , ScrollView, PermissionsAndroid } from 'react-native';
import { useStyle } from '../Hooks/useStyle';
import { generateColor } from '../utils';
import InputDetector from '../utils/inputDetector';
import InsStageController from './InsStageController';
import Para from './Para';


const InsStage = (props) => {
    const { title , stageNumber , nextStageHandler , previousStageHandler , categoryName , inputValue , inputValueSetter , typesName , formData , formName , carCategory} = props
    const appendStyle = useStyle(style);
    const [temporaryValue, setTemporaryValue] = useState({value : "" , key : ""});
    

    const changeHandler = value => {

    }

    return (
        <View style={appendStyle.container}>
            <View style={appendStyle.header}>
                <View style={appendStyle.stageNumber}>
                    <Para> مرحله {stageNumber.currentStage} از {stageNumber.length}</Para>
                </View>
                <View>
                    <Para weight="bold" size={20}>{categoryName}</Para>
                    <View style={{ flexDirection : "row" , alignItems : 'center' , justifyContent : 'center' }}>
                        <Para color='grey' size={18}>{title}</Para>
                        <View style={appendStyle.divider} />
                    </View>

                </View>
            </View>
            <ScrollView>
                <View style={appendStyle.stagePlayground}>
                    {
                        <InputDetector
                            isCarCase={carCategory}
                            typesName={typesName} 
                            carCategory={carCategory}  
                            temporary={{value : temporaryValue , setValue : setTemporaryValue}} 
                            {...props} />
                    }
                </View>
            </ScrollView>
            <InsStageController onNext={nextStageHandler} onPrevious={previousStageHandler} />
        </View>
    )
}


const style = ({ primary , baseBorderRadius }) => StyleSheet.create({
    container : {
        flex: 1,
        width : "90%",
        marginHorizontal : "5%"
    },
    header : {
        flexDirection : 'row',
        marginTop: StatusBar.currentHeight + 10,
        alignItems : 'center',
        justifyContent : 'space-between',
    },
    stageNumber : {
        flexDirection : 'row',
    },
    stagePlayground : {
        flex : 1,
    },
    divider : {
        width: 25,
        height: 10,
        backgroundColor : generateColor(primary , 3),
        borderRadius : baseBorderRadius,
        marginLeft : 10
    }   
})

export default InsStage;