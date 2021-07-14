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


  const fetcher = (() => {
    return new Promise((resolve , _) => {
      (function test(){
        api.post(`${appConfig.serverPath}/baseApi/getServerTime`)
                  .then(({ data }) => { 
                      let serverTime = +data.split(" ")[1].split(':')[1];
                      return api.post(`${appConfig.serverPath}/baseApi/getAppToken` , {
                              Key : encrypt.encrypt({
                                  UserName : appConfig.adminUserName,
                                  Password : appConfig.adminPassword
                              }, serverTime)
                              })
                              .then(({ data }) => {
                                
                                if(data === clientConfig.static.ACCESS_DENIED) {
                                  console.warn('need to get again')
                                  test()
                                };
                                resolve({ api , appToken : data })
                              })
                  }).catch(err => {
                    console.warn('need to get error');
                    test()
                  });
      })();
    })
  })();


  // const enhancedApi = (function sequentialReqHandler() {
  //   return api.post(`${appConfig.serverPath}/baseApi/getServerTime`)
  //               .then(({ data }) => {
  //                   let serverTime = +data.split(" ")[1].split(':')[1];
  //                   return api.post(`${appConfig.serverPath}/baseApi/getAppToken` , {
  //                           Key : encrypt.encrypt({
  //                               UserName : appConfig.adminUserName,
  //                               Password : appConfig.adminPassword
  //                           }, serverTime)
  //                           })
  //                           .then(({ data }) => {
  //                             if(data === clientConfig.static.ACCESS_DENIED) throw new Error(data)
                              
  //                             // const baseHeaders = {
  //                             //   headers : {
  //                             //     appToken : data,
  //                             //     packageName : appConfig.packageName
  //                             //   }
  //                             // }
                              
  //                             // return {
  //                             //   get(url) {
  //                             //     api.get(url, baseHeaders.headers )
  //                             //   },
  //                             //   post(url , data) {
  //                             //     return api.post(url , data , baseHeaders.headers)
  //                             //   }
  //                             // }
  //                             return {
  //                               api , appToken : data
  //                             }
  //                           }).catch(err => {
  //                               // sequentialReqHandler();
  //                               console.warn("appToken expired")
  //                           })
  //               }).catch(err => {
  //                 // sequentialReqHandler()
  //                 console.warn("appToken expired")
  //                 // throw new Error(`YOU GET STUCK WITH INITIAL REQ WITH THIS ERROR ${err}`);
  //               });
  // })()

  // const enhancedApi = (function sequentialReqHandler() {
  //   return new Promise((resolve , _) => {
  //       (function ss(){
  //         api.post(`${appConfig.serverPath}/baseApi/getServerTime`)
  //               .then(({ data }) => {
  //                 console.log('--------------------*******-----------------' , data);
  //                   let serverTime = +data.split(" ")[1].split(':')[1];
  //                   return api.post(`${appConfig.serverPath}/baseApi/getAppToken` , {
  //                           Key : encrypt.encrypt({
  //                               UserName : appConfig.adminUserName,
  //                               Password : appConfig.adminPassword
  //                           }, serverTime)
  //                           })
  //                           .then(({ data }) => {
  //                             if(data === clientConfig.static.ACCESS_DENIED) throw new Error(data)
  //                             resolve({ api , appToken : data })
  //                           }).catch(err => {
  //                             console.warn("appToken expired")
  //                             ss()
  //                           throw new Error(`YOU GET STUCK WITH INITIAL REQ WITH THIS ERROR ${err}`); 
  //                           })
  //               }).catch(err => {
  //                 console.warn("appToken expired")
  //                 ss()
  //                 throw new Error(`YOU GET STUCK WITH INITIAL REQ WITH THIS ERROR ${err}`);
                  
  //               });
  //       })()
  //   }) 
  // })()

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