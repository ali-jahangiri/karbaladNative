import React from 'react';
import { Text } from 'react-native';

const Para = ({ size , align = "right", color = "black" , weight = "normalFont", children , style , ...rest }) => (
    <Text style={{ fontFamily: weight,textAlign : align ,fontSize : size , color ,  ...style }} {...rest} >{children}</Text>
)



export default Para;