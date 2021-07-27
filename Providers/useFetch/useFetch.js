import { useContext } from "react";
import encrypt from "../../utils/encrypt";
import { FetchContext } from "./FetchProvider";

import appConfig from "../../config";

import { useSelector } from "../../Store/Y-state";

const useFetch = () => {
  const { api } = useContext(FetchContext);
    // const timeDiff = useSelector(state => state.auth.systemTime);

  const ticket = useSelector(state => state.auth.appKey)

  
  return (path = "" , config) => {
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
  
};

export default useFetch;
