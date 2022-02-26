export function toThousandSeparator(n: number) {
  /* eslint-disable @typescript-eslint/restrict-plus-operands */
  let str = '';
  while (n / 1000 >= 1) {
    let mod = '' + n % 1000;
    if (+mod === 0) {
      mod = '000';
    } else if (+mod < 10) {
      mod = `00${mod}`;
    } else if (+mod < 100) {
      mod = `0${mod}`;
    }

    str = ',' + mod + str;
    n = Math.floor(n / 1000);
  }
  return n + str;
  /* eslint-enable @typescript-eslint/restrict-plus-operands */
}