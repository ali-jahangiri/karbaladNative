import { useContext } from "react";
import { StyleContext } from "../../HOC/StyleProvider/StyleProvider";


const useStyle = componentStyle => {
    const {style} = useContext(StyleContext)
    return  componentStyle?.(style) || style;
}


export default useStyle;