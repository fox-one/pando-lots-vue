export function toThousandSeparator(n: number) {
  /* eslint-disable @typescript-eslint/restrict-plus-operands */
  let str = '';
  while (n / 1000 >= 1) {
    str = ',' + (n % 1000) + str;
    n = Math.floor(n / 1000);
  }
  return n + str;
  /* eslint-enable @typescript-eslint/restrict-plus-operands */
}