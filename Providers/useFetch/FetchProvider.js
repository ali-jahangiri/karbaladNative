import axios from "axios";
import React, { createContext, useState } from "react";

export const FetchContext = createContext({
  changeHandler: () => {},
  api: axios.create({}),
});


const FetchProvider = ({ children, baseURL , packageName }) => {
  const [fetcherOption, setFetcherOption] = useState(null);

  const api = axios.create({
    baseURL,
    headers: {
      packageName,
      ...fetcherOption,
    },
  });

  return (
    <FetchContext.Provider value={{ api, setFetcherOption }}>
      {children}
    </FetchContext.Provider>
  );
};

export default FetchProvider;
