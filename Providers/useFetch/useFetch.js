import { useContext, useEffect, useState } from "react";
import { FetchContext } from "./FetchProvider";

import Input from "../../components/Input";

const useFetch = (path, config) => {
  const { api } = useContext(FetchContext);
  //  using hook in immediate way
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);


  const [inputValue, setInputValue] = useState({});


  const inputChangeHandler= (key , value) => {
    setInputValue(prev => ({
      ...prev,
      [key] : value
    }))
  }

  const enhancedApi = () => {
    // TODO handle status error ;
    
  }

  useEffect(() => {
    // we use useEffect to force our parent component that already use this hoo to re render with this new state
    if (path) {
      if (typeof config === "object") {
        api
          .post(path, config)
          .then(({ data }) => {
            setResponse(data);
            setLoading(false);
          })
          .catch((err) => {
            setError(err);
            setLoading(false);
          });
      } else {
        api
          .get(path)
          .then(({ data }) => {

            setResponse(data);
            setLoading(false);
          })
          .catch((err) => {
            setError(err);
            setLoading(false);
          });
      }
    }
  }, [path , api]);

  return path ? { response, loading, error } : api;
};

export default useFetch;
