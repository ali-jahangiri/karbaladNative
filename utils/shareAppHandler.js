import { Share } from 'react-native';
import client from '../client';

const shareAppHandler = downloadPath => {
    Share.share({
        message : `${client.static.SHARE_WITH_FRIEND} ${downloadPath}`,
    }).then(res => {})
}


export default shareAppHandler;