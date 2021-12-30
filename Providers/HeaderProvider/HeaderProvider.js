import React from 'react';
import BadgeHeader from '../../components/Header/BadgeHeader/BadgeHeader';
import BoxHeader from '../../components/Header/BoxHeader/BoxHeader';
import FadeHeader from '../../components/Header/FadeHeader/FadeHeader';
import HeaderFullWidth from '../../components/Header/HeaderFullWidth/HeaderFullWidth';
import NegativeHeader from '../../components/Header/NegativeHeader/NegativeHeader';
import { useStyle } from '../../Hooks/useStyle';

const _headerClone = ({ ...rest }) => ({
    box : <BoxHeader {...rest} />,
    fade : <FadeHeader {...rest} />,
    fullWidth : <HeaderFullWidth {...rest} />,
    negative : <NegativeHeader {...rest} /> ,
    badge : <BadgeHeader {...rest} />
});

const HeaderProvider = ({ title , isNested , isInReading }) => {
    const { indexHeader , nestedHeader , headerHeight , headerBgColor } = useStyle();


    const headerInjectedStyle = {
        headerBgColor,
        headerHeight,
    }

    return _headerClone({ title , isNested , componentStyles : headerInjectedStyle , isInReading , componentData : { title } })[isNested ? nestedHeader : indexHeader]
}


export default HeaderProvider;