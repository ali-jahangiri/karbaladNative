import React from 'react';
import { Dimensions } from 'react-native';

import Carousel from "pinar";
import Slide from './Slide';
import SliderController from './SliderController';


const Slider = ({ style , data = [] })  => (
    <Carousel
        showsDots={style?.showDot}
        showsControls={style?.showArrow}
        autoplay={style?.autoPlay}
        autoplayInterval={style?.autoPlayTime}
        loop={style?.infinite} 
        renderControls={handler => <SliderController position={style?.controllerPosition} bgColor={style.controllerBgColor} color={style.controllerColor} {...handler} />} 
        style={{ height : Dimensions.get("screen").height * style.height , width : `${style.width}%` , marginHorizontal : `${(100 - style.width) / 2}%` }}>
        {
            data.map((el , i) => <Slide
                                    webLinkLabel={style?.webLinkLabel} 
                                    passedStyle={style.slide} 
                                    {...el} 
                                    key={i} />)
        }
    </Carousel>
)


export default Slider;