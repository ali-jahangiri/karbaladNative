import { useContext } from "react";
import { StyleContext } from "../../HOC/StyleProvider/StyleProvider";


const useStyle = (componentStyle , ...additionalStyle) => {
    const {style} = useContext(StyleContext)
    return  componentStyle?.(style , ...additionalStyle) || style;
}


export default useStyle;