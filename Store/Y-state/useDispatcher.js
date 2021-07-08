import { useContext } from "react";

import { Store } from "./StoreProvider";

const useDispatch = () => {
    const { setStore } = useContext(Store);
    return action => setStore(action())
}


export default useDispatch;