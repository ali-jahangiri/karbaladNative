import { combineSlice, createStore } from "./Y-state";

// slices
import insuranceOrderSlice from "./Slices/insuranceOrderSlice";
import initialSlice from "./Slices/initialSlice";
import authSlice from "./Slices/authSlice";
import navigationSlice from "./Slices/navigationSlice";
import uiSlice from "./Slices/uiSlice";
import dynamicComponentSlice from "./Slices/dynamicComponentSlice";

const myStore = createStore(combineSlice({
    initial : initialSlice , 
    insuranceOrder : insuranceOrderSlice,
    auth : authSlice,
    navigation : navigationSlice,
    ui : uiSlice,
    dynamicComponent : dynamicComponentSlice
}));

export default myStore;