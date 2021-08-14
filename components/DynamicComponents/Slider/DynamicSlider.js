import React from 'react';
import { Dimensions } from 'react-native';

import Carousel from "pinar";
import { booleanExtractor } from '../../../utils';
import Slide from './Slide';
import SliderController from './SliderController';


const DynamicSlider = ({ componentStyles , componentDatas })  => {
    const { showDot , showArrow , autoPlay , autoPlayTime , infinite , controllerPosition , controllerBgColor , controllerColor, height , width , } = componentStyles;
    
    const bgColorList = Object.entries(componentStyles).filter(([key] ) => key.includes("bgColorSlide")).map(([_ , value]) => value)
    const descList = Object.entries(componentDatas).filter(([key]) => key.includes("slideDesc")).map(([_ , value]) => value);
    const internalPathList = Object.entries(componentStyles).filter(([key]) => key.includes("internalPathRedirection")).map(([_ , value]) => value);

    const carouselStyle = {
        height : Dimensions.get("screen").height * (Number(height) / 100) , 
        width : `${width}%` , marginHorizontal : `${(100 - Number(width)) / 2}%`
    }

    return (
        <Carousel
            showsDots={booleanExtractor(showDot)}
            showsControls={booleanExtractor(showArrow)}
            autoplay={booleanExtractor(autoPlay)}
            autoplayInterval={Number(autoPlayTime)}
            loop={booleanExtractor(infinite)} 
            renderControls={handler => <SliderController position={controllerPosition} bgColor={controllerBgColor} color={controllerColor} {...handler} />} 
            style={carouselStyle}>
        {
            JSON.parse(componentDatas.slides)
                .map((el , i) => <Slide
                                        webLinkLabel={componentDatas.webLinkLabel} 
                                        passedStyle={componentStyles}
                                        backgroundColor={bgColorList[i]}
                                        desc={descList[i]}
                                        internalRedirection={internalPathList[i]}
                                        {...el} 
                                        key={i} />)
        }
        </Carousel>
    )
}


export default DynamicSlider;