import { useContext, useEffect, useState } from "react";
import encrypt from "../../utils/encrypt";
import { FetchContext } from "./FetchProvider";

import appConfig from "../../config";

import { useSelector } from "../../Store/Y-state";
import axios from "axios";

const useFetch = (path, config) => {
  const { api } = useContext(FetchContext);
  //  using hook in immediate way
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const timeDiff = useSelector(state => state.auth.systemTime);

  const ticket = useSelector(state => state.auth.appKey)

  const fetcher = (path , config) => {
    return new Promise((resolve , _) => {
        api.post(`${appConfig.serverPath}/baseApi/getServerTime`)
          .then(({data}) => {
            console.log('FETCH START');
            let serverTime = +data.split(" ")[1].split(':')[1];
            api.post(`${appConfig.serverPath}/baseApi/getAppToken` , {
              Key : encrypt.encrypt({
                  UserName : appConfig.adminUserName,
                  Password : appConfig.adminPassword
              }, serverTime)
              })
              .then(({ data }) => {
                console.log('fetcher' , data);

                // const instance = axios.create({
                //   baseURL : appConfig.serverPath,
                //   method : "POST",
                //   headers : {
                //     packageName : appConfig.packageName,
                //     appToken : data,
                //     ticket
                //   },
                //   timeout : 5000,
                // });

                // resolve(instance(path , config))
                resolve({ api , appToken : data })
              }).catch(err => {
                console.log('!!!!!!!!!catch' , err);
                fetcher()
              })
          })

    })
  }

  const fetcher2 = (path , config) => {
    return new Promise((resolve , _) => {
        api.post(`${appConfig.serverPath}/baseApi/getServerTime`)
          .then(({data}) => {
            console.log('FETCH START');
            let serverTime = +data.split(" ")[1].split(':')[1];
            api.post(`${appConfig.serverPath}/baseApi/getAppToken` , {
              Key : encrypt.encrypt({
                  UserName : appConfig.adminUserName,
                  Password : appConfig.adminPassword
              }, serverTime)
              })
              .then(({ data }) => {
                resolve(api.post(path , config , {
                  headers : { appToken : data, ticket },
                  timeout : 5000
                }))
              }).catch(err => {
                console.log('!!!!!!!!!catch' , err);
                fetcher()
              })
          })

    })
  }
  if(path === false) return fetcher2

  if(path === true) return fetcher
  return path ? { response, loading, error } : api;
};

export default useFetch;
