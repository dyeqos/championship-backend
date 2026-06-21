import {
  differenceInYears,
  isAfter,
  isBefore,
  isEqual,
  parse,
  isValid,
  format,
} from 'date-fns';

type DateInput = Date | string;

const toDate = (value: DateInput): Date => {
  if (value instanceof Date) {
    return value;
  }
  const date = parse(value, 'dd/MM/yyyy', new Date());
  if (!isValid(date)) {
    throw new Error(`Fecha inválida: ${value}`);
  }

  return date;
};

export const getAge = (birthDate?: DateInput | null): number | null => {
  if (!birthDate) return null;
  return differenceInYears(new Date(), toDate(birthDate));
};

export const isDateAfter = (date1: DateInput, date2: DateInput): boolean => {
  return isAfter(toDate(date1), toDate(date2));
};

export const isDateBefore = (date1: DateInput, date2: DateInput): boolean => {
  return isBefore(toDate(date1), toDate(date2));
};

export const isSameDate = (date1: DateInput, date2: DateInput): boolean => {
  return isEqual(toDate(date1), toDate(date2));
};

export const isDateBetween = (
  date: DateInput,
  start: DateInput,
  end: DateInput,
): boolean => {
  const d = toDate(date);

  return !isBefore(d, toDate(start)) && !isAfter(d, toDate(end));
};

export const dateToString = (value?: Date | null): string | null => {
  if (!value) return null;
  return format(toDate(value), 'dd/MM/yyyy');
};

export const stringToDate = (value: string | null): Date | null => {
  if (!value) return null;
  return toDate(value);
};

export const isBeforeOrEqual = (date1: DateInput, date2: DateInput): boolean =>
  !isAfter(toDate(date1), toDate(date2));

export const isAfterOrEqual = (date1: DateInput, date2: DateInput): boolean =>
  !isBefore(toDate(date1), toDate(date2));
