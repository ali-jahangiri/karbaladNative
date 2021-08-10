import React from 'react';
import BadgeHeader from '../../components/Header/BadgeHeader/BadgeHeader';
import BoxHeader from '../../components/Header/BoxHeader/BoxHeader';
import FadeHeader from '../../components/Header/FadeHeader/FadeHeader';
import HeaderFullWith from '../../components/Header/HeaderFullWith/HeaderFullWith';
import NegativeHeader from '../../components/Header/NegativeHeader/NegativeHeader';
import { useStyle } from '../../Hooks/useStyle';

const _headerClone = ({ ...rest }) => ({
    box : <BoxHeader {...rest} />,
    fade : <FadeHeader {...rest} />,
    fullWith : <HeaderFullWith {...rest} />,
    negative : <NegativeHeader {...rest} /> ,
    badge : <BadgeHeader {...rest} />
})

const HeaderProvider = ({ title }) => {
    const { indexHeader } = useStyle();
    return _headerClone({ title })[indexHeader]
}


export default HeaderProvider;