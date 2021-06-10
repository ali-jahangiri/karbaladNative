import { useContext } from "react";
import { StyleContext } from "../../HOC/StyleProvider/StyleProvider";



const useStyleDispatcher = () => {
    const { setStyle } = useContext(StyleContext)
    return ({ globalStyle = {} }) => {
        setStyle(globalStyle)
    }
}



export default useStyleDispatcher;