import { useContext } from "react";
import { DataContext } from "../../HOC/DataProvider/DataProvider";

const useData = () => {
    const { data } = useContext(DataContext);
    return data;
}



export default useData;