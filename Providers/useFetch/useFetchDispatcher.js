import { useContext } from "react";
import { FetchContext } from "./FetchProvider";

const useFetchDispatcher = () => {
  const { setFetcherOption } = useContext(FetchContext);

  return function dispatch(data) {
    setFetcherOption(data)
  }
};

export default useFetchDispatcher;
