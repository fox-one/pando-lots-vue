import { getUA } from 'peeler-js/es/getUA';
import { mediaQuery } from './helper';

const ua = getUA(window?.navigator?.userAgent);

const { phone, handheld } = mediaQuery() || {};
export const isMobile = phone || handheld || ua.isMobile;
export const isIOS = ua.isIOS;
export const isAndroid = ua.isAndroid;


export default ua;