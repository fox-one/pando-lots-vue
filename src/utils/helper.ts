/* eslint-disable no-useless-escape */
export function getQuerystring(qs: string) {
  const querystring = location.href
    .split(new RegExp(`((&|\\?){1}${qs}=)`))?.[3]
    ?.split('&')?.[0]
    ?.split('#')?.[0]
    ?.replace(/\/$/g, '')
    ?.replace(/\?/g, '%3F');
  return querystring || '';
}

export function removeQuery(q?: string) {
  const origin = location.origin;
  let hash = location.hash;
  let search = location.search;
  if (q) {
    ~search.indexOf(q) && (search = search.replace(new RegExp(`&?${q}=[^&]+`), ''));
    if (search.length <= 1) search = '';
    ~hash.indexOf(q) && (hash = hash.replace(new RegExp(`${q}=[^&]+`), ''));
  }
  window.history.replaceState(null, '', `${origin}${search}/${hash}`);
}

export const mediaQuery = () => {
  if (!window || !window.matchMedia) return null;
  return {
    phone: window.matchMedia('(max-width:575px)').matches,
    handheld:
      window.matchMedia('(min-width:576px)').matches &&
      window.matchMedia('(max-width: 767px)').matches,
    tablet:
      window.matchMedia('(min-width:768px)').matches &&
      window.matchMedia('(max-width: 1024px)').matches,
    laptop:
      window.matchMedia('(min-width:1025px)').matches &&
      window.matchMedia('(max-width: 1439px)').matches,
    desktop: window.matchMedia('(min-width:1440px)').matches,
  };
};