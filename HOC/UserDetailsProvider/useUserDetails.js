import React, { useContext } from 'react';

import { UserDetails } from './UserDetailsProvider';

const useUserDetails = () => {
    const { setUserDetails : setter , userDetails : data } = useContext(UserDetails);
    return {
        setter,
        data
    }
}


export default useUserDetails;