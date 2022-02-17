import { getUA } from 'peeler-js/es/getUA';

const ua = getUA(window?.navigator?.userAgent);

export const isMobile = ua.isMobile;
export const isIOS = ua.isIOS;
export const isAndroid = ua.isAndroid;


export default ua;