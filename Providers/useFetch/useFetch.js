import { useContext, useEffect, useState } from "react";
import encrypt from "../../utils/encrypt";
import { FetchContext } from "./FetchProvider";

import appConfig from "../../config";

import clientConfig from "../../client";
import { useSelector } from "../../Store/Y-state";

const useFetch = (path, config) => {
  const { api } = useContext(FetchContext);
  //  using hook in immediate way
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const timeDiff = useSelector(state => state.auth.systemTime);

  const fetcher = (() => {
    let count = 1;
    return new Promise((resolve , _) => {
      (function test(){
        if(count < 4) {
          api.post(`${appConfig.serverPath}/baseApi/getAppToken` , {
            Key : encrypt.encrypt({
                UserName : appConfig.adminUserName,
                Password : appConfig.adminPassword
            }, new Date().getMinutes() - (timeDiff))
            })
            .then(({ data }) => {
              if(data === clientConfig.static.ACCESS_DENIED) {
                throw new Error("")
              };
              resolve({ api , appToken : data })
            }).catch(err => {
              count++;
              test()
            })
        }
      })();
    })
  })();

  if(path === true) return fetcher

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







// const baseHeaders = {
//   headers : {
//     appToken : data,
//     packageName : appConfig.packageName
//   }
// }

// return {
//   get(url) {
//     api.get(url, baseHeaders.headers )
//   },
//   post(url , data) {
//     return api.post(url , data , baseHeaders.headers)
//   }
// }