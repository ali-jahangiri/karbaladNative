import React from 'react';
import { Text } from 'react-native';

const Para = ({ size , align = "right", color = "black" , weight = "regular", children , style , ...rest }) => (
    <Text numberOfLines={3} style={{ fontFamily: weight,textAlign : align ,fontSize : size , color ,  ...style }} {...rest} >{children}</Text>
)



export default Para;