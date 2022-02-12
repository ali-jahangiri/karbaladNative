// import { useMemo } from "react";
import { useContext } from "react";
import { StyleContext } from "../../HOC/StyleProvider/StyleProvider";


const useStyle = (componentStyle , ...additionalStyle) => {
    const { style } = useContext(StyleContext);
    if(typeof componentStyle === "function") {
        // Memoized return pattern (Need to test)
        // const memo = 1;
        // return useMemo(() => {
        //     console.log('run in memo');
        //     return componentStyle(style , ...additionalStyle);
        // } , [memo]);
        return componentStyle(style , ...additionalStyle);
    }else return style;
}


export default useStyle;