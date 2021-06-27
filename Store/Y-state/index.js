import combineSlice from "./combineSlice";
import createSlice from "./createSlice";
import createStore from "./createStore";
import StoreProvider from "./StoreProvider";
import useDispatch from "./useDispatcher";
import useSelector from "./useSelector";


export {
    useSelector,
    useDispatch,
    createSlice,
    createStore,
    combineSlice
}

export default StoreProvider;