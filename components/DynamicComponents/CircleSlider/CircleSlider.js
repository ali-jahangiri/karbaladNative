import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';

import { booleanExtractor } from '../../../utils';
import CircleSliderItem from './CircleSliderItem';


const CircleSlider = ({ componentStyles , componentDatas , onPressOverwrite }) => {
    const appendStyle = style(componentStyles);
    const items = Object.entries(componentDatas).filter(([key]) => key.includes("slideText")).map(([_ , value]) => value);
    const bgColorList = Object.entries(componentStyles).filter(([key]) => key.includes("bgColorSlide")).map(([_ , value]) => value);
    const linkList = Object.entries(componentStyles).filter(([key]) => key.includes("internalPathRedirection")).map(([_ , value]) => value);
    const simpleSlideWebLinkList = Object.entries(componentDatas).filter(([key]) => key.includes("simpleWebRedirection")).map(([_ , value]) => value);
    
        return (
        <ScrollView showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false} horizontal style={appendStyle.container}>
            {
                // * IMPORTANT when we remove an item from between of arr , we lose some order of depended list like bgColor and internal path of item , therefore we should be careful about remove process
                booleanExtractor(componentStyles.shouldUseIcon) ? JSON.parse(componentDatas.slides).map((el , i) => <CircleSliderItem passedStyle={componentStyles} key={i} bgColor={bgColorList[i]} title={el.TEXT} internalPath={linkList[i]} webLink={el.Link} icon={el.value} />)
                : items
                    .filter(el => el)
                    .map((el , i) => <CircleSliderItem onPressOverwrite={onPressOverwrite} passedStyle={componentStyles} webLink={simpleSlideWebLinkList[i]} key={i} internalPath={linkList[i]} bgColor={bgColorList[i]} title={el} />)
            }
        </ScrollView>
    )
}


const style = ({ containerMarginTop , containerMarginBottom }) => StyleSheet.create({
    container : {
        marginTop : Number(containerMarginTop),
        marginBottom : Number(containerMarginBottom)
    }
})

export default CircleSlider;