export const numberToRoman = (num: number): string => {
  if (num <= 0 || num >= 4000) {
    throw new Error('El número debe estar entre 1 y 3999');
  }

  const romanMap: Array<[number, string]> = [
    [1000, 'M'],
    [900, 'CM'],
    [500, 'D'],
    [400, 'CD'],
    [100, 'C'],
    [90, 'XC'],
    [50, 'L'],
    [40, 'XL'],
    [10, 'X'],
    [9, 'IX'],
    [5, 'V'],
    [4, 'IV'],
    [1, 'I'],
  ];

  let result = '';
  let remaining = num;

  for (const [value, symbol] of romanMap) {
    while (remaining >= value) {
      result += symbol;
      remaining -= value;
    }
  }

  return result;
};
