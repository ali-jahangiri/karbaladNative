import { combineSlice, createStore } from "./Y-state";

// slices
import insuranceOrderSlice from "./Slices/insuranceOrderSlice";
import initialSlice from "./Slices/initialSlice";


const myStore = createStore(combineSlice({
    initial : initialSlice , 
    insuranceOrder : insuranceOrderSlice
}));

export default myStore;