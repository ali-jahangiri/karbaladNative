import { useContext } from "react";
import encrypt from "../../utils/encrypt";
import { FetchContext } from "./FetchProvider";

import appConfig from "../../app.json";


import { useSelector } from "../../Store/Y-state";
import client from "../../client";

const useFetch = () => {
  const { api } = useContext(FetchContext);
  
  const ticket = useSelector(state => state.auth.appKey) || ""
    
  return (path = "" , config) => {
    return new Promise((resolve , _) => {
        api.post(`${appConfig.customConfigDetails.serverPath}/baseApi/getServerTime`)
          .then(({data}) => {
            console.log('FETCH START');
            let serverTime = +data.split(" ")[1].split(':')[1];
            api.post(`${appConfig.customConfigDetails.serverPath}/baseApi/getAppToken` , {
              Key : encrypt.encrypt({
                  UserName : appConfig.customConfigDetails.adminUserName,
                  Password : appConfig.customConfigDetails.adminPassword,
                  PackageName : appConfig.customConfigDetails.packageName
              }, serverTime)
              })
              .then(({ data }) => {
                if(data === client.static.ACCESS_DENIED) throw new Error (data)
                resolve(api.post(path , config , {
                  headers : { appToken : data, ticket },
                  timeout : 1,
                  timeoutErrorMessage : "shot"
                }))
              })
          })

    })
  }
  
};

export default useFetch;
