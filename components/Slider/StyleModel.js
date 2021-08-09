class SliderStyleModel {
    constructor() {
        return {
            showDot : true,
            showArrow : true,
            height : 1 , // from 0 - 1
            width : 100, // from 50% - 100%
            autoPlay : false,
            autoPlayTime : 2500,
            _marginHorizontal: '0%' , // base on with for fill horizontal gap
            borderRadius : 0 , 
            _overflow : 'hidden', // for border radius fallback style
            controllerColor : "black",
            controllerBgColor : "white",
            infinite : false,
            webLinkLabel : "Link to web",
            slide : {
                titleFontSize : 18,
                subTitleFontSize : 14,
                titleColor : "black",
                subTitleColor : "grey",
                imageBorderRadius : 0,
                controllerPosition : "top" || 'center' || "bottom",
                contentContainerXDirection : "top" || 'center' || "bottom",
                contentContainerYDirection : "top" || 'center' || "bottom",
                contentContainerPadding : 0,
                webLinkTriggerPosition : 'left' || "center" || 'right',
            }
        }
    }
}


class SliderDataMode {
    constructor() {
        return {
            slide : {
                backgroundColor : "",
                title : "",
                subTitle : "",
                image : "",
                webLink : "",
            }
        }
    }
}