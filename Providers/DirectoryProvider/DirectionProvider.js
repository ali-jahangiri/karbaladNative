import React from 'react';

import { useStyle } from '../../Hooks/useStyle';
import SimpleDirectory from '../../components/Directory/SimpleDirectory/SimpleDirectory';
import NegativeDirectory from '../../components/Directory/NegativeDirectory/NegativeDirectory';

const DirectionProvider = ({ children , isNested }) => {
    const { indexHeader , nestedHeader } = useStyle();
    
    const renderChecker = () => {
        if(isNested) {
            if(nestedHeader === "negative") return <NegativeDirectory children={children} />;
            else return <SimpleDirectory children={children} />;
        }else {
            if(indexHeader === "negative") {
                return <NegativeDirectory children={children} />
            }else {
                return <SimpleDirectory children={children} />
            }
        }
    }
    return renderChecker()
}


export default DirectionProvider;