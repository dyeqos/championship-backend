// src/common/decorators/transform-date-dmy.decorator.ts
import { Transform } from 'class-transformer';

export function StringToDate() {
  return Transform(({ value }: { value: unknown }): unknown => {
    if (typeof value === 'string' && value.length >= 10) {
      const [day, month, year] = value.split('/');
      if (!day || !month || !year) return value;

      const d = Number(day);
      const m = Number(month);
      const y = Number(year);

      if (Number.isNaN(d) || Number.isNaN(m) || Number.isNaN(y)) return value;

      return new Date(y, m - 1, d);
    }
    return value;
  });
}
