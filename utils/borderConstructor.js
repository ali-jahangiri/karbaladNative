const borderConstructor = (inputBorderString = '') => {
    const [ _borderRadius , _borderWidth , _borderStyle  , borderColor ] = inputBorderString.split(' ');
    let borderRadius = Number(_borderRadius.slice(0 , _borderRadius.indexOf("px")));
    const borderStyle = ["dashed" , "solid" , 'dotted'].includes(_borderStyle) ? _borderStyle : "solid";
    const borderWidth = Number(_borderWidth.slice(0 , _borderWidth.indexOf("px")))

    
    // native bug ui fallback => if borderStyle was dashed and borderRadius was 0 , we lose style . therefore we should add one unit to borderRadius
    if(borderStyle === "dashed" && borderRadius === 0) borderRadius++
    
    // return {
    //     radius : borderRadius, 
    //     color : borderColor , 
    //     width : borderWidth , 
    //     style : ,
    // }
    return {
        borderStyle : borderStyle,
        borderWidth : borderWidth,
        borderColor : borderColor,
        borderRadius : borderRadius
    }
}


export default borderConstructor;