import React from 'react';

import { useStyle } from '../../Hooks/useStyle';
import SimpleDirectory from '../../components/Directory/SimpleDirectory/SimpleDirectory';
import NegativeDirectory from '../../components/Directory/NegativeDirectory/NegativeDirectory';

// const _directionClone = ({ children }) => ({
//     simple : <SimpleDirectory children={children} />,
//     negative : <NegativeDirectory children={children} />
// })

const DirectionProvider = ({ children }) => {
    const { indexHeader } = useStyle();
    
    const renderChecker = () => {
        if(indexHeader === "negative") {
            return <NegativeDirectory children={children} />
        }else {
            return <SimpleDirectory children={children} />
        }
    }
    return renderChecker()
}


export default DirectionProvider;