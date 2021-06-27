import { useContext } from "react";

import { Store } from "./StoreProvider";

const useSelector = (targetSlice = () => {}) => {
    const { store } = useContext(Store);
    console.log(store);
    return targetSlice({...store});
}


export default useSelector;