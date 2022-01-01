import { useContext } from "react";
import { DataContext } from "../../HOC/DataProvider/DataProvider";


const useDataDispatcher = () => {
    const { setData } = useContext(DataContext);

    return incomingDataFromServer => setData(incomingDataFromServer)
}

export default useDataDispatcher;
