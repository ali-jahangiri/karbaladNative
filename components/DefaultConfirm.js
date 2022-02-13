import React from 'react';
import { View , StyleSheet } from "react-native";
import { useStyle } from '../Hooks/useStyle';
import { generateColor } from '../utils';
import InsConfirmItem from './InsConfirmItem';


const DefaultConfirm = ({ factorItems }) => {
    const appendStyle = useStyle(style);

    return (
        <React.Fragment>
            <View style={appendStyle.starterBullet} />
            {
                factorItems?.map((el , i) => (
                    <InsConfirmItem
                        index={i}
                        label={el.lable} 
                        value={el.show_Value} 
                        key={i} />
                ))
            }
        </React.Fragment>
    )
}

const style = ({ primary , baseBorderRadius }) => StyleSheet.create({
    starterBullet : {
        width : 15,
        height : 15,
        marginTop : 10,
        borderRadius : baseBorderRadius,
        backgroundColor : generateColor(primary , 3),
        alignSelf : "center",
    }
})


export default DefaultConfirm;