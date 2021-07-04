import { useContext, useEffect, useState } from "react";
import client from "../../client";
import encrypt from "../../utils/encrypt";
import { FetchContext } from "./FetchProvider";

import appConfig from "../../config";

import clientConfig from "../../client";

const useFetch = (path, config) => {
  const { api } = useContext(FetchContext);
  //  using hook in immediate way
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const enhancedApi = (() => {
    return api.post(`/baseApi/getServerTime`)
                .then(({ data }) => {
                    let serverTime = +data.split(" ")[1].split(':')[1];
                        return api.post("/baseApi/getAppToken" , {
                            Key : encrypt.encrypt({
                                UserName : appConfig.adminUserName,
                                Password : appConfig.adminPassword
                            }, serverTime)
                            })
                            .then(({ data }) => {
                              if(data === clientConfig.static.ACCESS_DENIED) throw new Error(data)
                              else return api
                            }).catch(err => {
                                throw new Error(err.message)
                            })
                }).catch(err => {
                  throw new Error(err);
                });
  })()

  if(path === true) return enhancedApi

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
