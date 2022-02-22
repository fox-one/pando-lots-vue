export function getQuerystring(qs: string) {
  const querystring = location.href
    .split(new RegExp(`((&|\\?){1}${qs}=)`))?.[3]
    ?.split('&')?.[0]
    ?.replace(/\/$/g, '')
    ?.replace(/\?/g, '%3F');
  return querystring || '';
}