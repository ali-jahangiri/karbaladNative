import { combineSlice, createStore } from "./Y-state";

// slices
import insuranceOrderSlice from "./Slices/insuranceOrderSlice";
import initialSlice from "./Slices/initialSlice";
import authSlice from "./Slices/authSlice";

const myStore = createStore(combineSlice({
    initial : initialSlice , 
    insuranceOrder : insuranceOrderSlice,
    auth : authSlice
}));

export default myStore;