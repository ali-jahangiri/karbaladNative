import React, { useEffect, useRef } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import IntroSlide from './IntroSlide';
import SliderLabeledItem from './SliderLabeledItem';


const SliderLabeled = ({ componentStyles , componentDatas }) => {
    const appendStyle = style({ ...componentStyles });
    const descList = Object.entries(componentDatas).filter(([key]) => key.includes("slideDesc")).map(([_ , value]) => value);
    const internalPathList = Object.entries(componentStyles).filter(([key]) => key.includes("internalPathRedirection")).map(([_ , value]) => value)

    const containerRef = useRef();

    return (
        <ScrollView ref={containerRef} onContentSizeChange={() => containerRef.current.scrollToEnd({animated: true})} contentContainerStyle={{ flexDirection : 'row-reverse', }} showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false} horizontal style={appendStyle.container}>
            <IntroSlide passedStyle={componentStyles} {...componentDatas} />
            {
                JSON.parse(componentDatas.slides).map((el , i) => <SliderLabeledItem internalPath={internalPathList[i]} passedStyle={componentStyles} key={i} desc={descList[i]} {...el} />)
            }
        </ScrollView>
    )
}   


const style = ({ containerBgColor , containerMarginTop , containerMarginBottom , containerVerticalPadding }) => StyleSheet.create({
    container : {
        marginTop : Number(containerMarginTop),
        marginBottom : Number(containerMarginBottom),
        backgroundColor : containerBgColor,
        paddingVertical : Number(containerVerticalPadding)
    }
})

export default SliderLabeled;