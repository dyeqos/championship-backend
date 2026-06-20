import { stringDateRegex } from 'src/common/constants/regex.constant';

export const getAge = (birthdate?: Date) => {
  if (!birthdate) return;
  const hoy = new Date();

  let age = hoy.getFullYear() - birthdate.getFullYear();

  const month = hoy.getMonth();
  const day = hoy.getDate();
  const monthBirthdate = birthdate.getMonth();
  const dayBirthdate = birthdate.getDate();
  if (
    month < monthBirthdate ||
    (month === monthBirthdate && day < dayBirthdate)
  ) {
    age--;
  }

  return age;
};

export const dateToString = (date?: Date | null): string => {
  if (!date) return 'Sin fecha';
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

export const stringToDate = (dateStr: string): Date | null => {
  const m = stringDateRegex.exec(dateStr);
  if (!m) return null;
  const day = Number(m[1]);
  const month = Number(m[2]);
  const year = Number(m[3]);
  if (month < 1 || month > 12) return null;
  if (day < 1) return null;
  const d = new Date(year, month - 1, day);
  if (
    d.getFullYear() !== year ||
    d.getMonth() !== month - 1 ||
    d.getDate() !== day
  )
    return null;
  return d;
};
