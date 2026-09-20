import { Transform } from 'class-transformer';
import { stringToDate as stringToDateTools } from '../tools/utils/date.util';

export function StringToDate() {
  return Transform(({ value }: { value: unknown }): unknown => {
    if (typeof value === 'string' && value.length >= 10) {
      return stringToDateTools(value);
    }
    return value;
  });
}
