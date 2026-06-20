import { stringToDate } from '../utils/date.util';

/**
 * Compare two date strings (dd/mm/yyyy) by date only (no time).
 * Returns -1 if a < b, 0 if equal, 1 if a > b. If either is invalid, returns null.
 */
const compareDates = (a: string, b: string): number | null => {
  const da = stringToDate(a);
  const db = stringToDate(b);
  if (!da || !db) return null;
  const ta =
    da.getFullYear() * 10000 + (da.getMonth() + 1) * 100 + da.getDate();
  const tb =
    db.getFullYear() * 10000 + (db.getMonth() + 1) * 100 + db.getDate();
  if (ta < tb) return -1;
  if (ta > tb) return 1;
  return 0;
};

/**
 * Devuelve true si las dos fechas (dd/mm/yyyy) son exactamente iguales.
 * Si alguna fecha no es válida devuelve false.
 */
export const isSameDate = (a: string, b: string): boolean => {
  const cmp = compareDates(a, b);
  return cmp === 0;
};

/**
 * Devuelve true si la fecha `a` es la misma o posterior a la fecha `b`.
 * Si alguna fecha no es válida devuelve false.
 */
export const isSameOrAfterDate = (a: string, b: string): boolean => {
  const cmp = compareDates(a, b);
  return cmp === 0 || cmp === 1;
};

/**
 * Devuelve true si la fecha `a` es la misma o anterior a la fecha `b`.
 * Si alguna fecha no es válida devuelve false.
 */
export const isSameOrBeforeDate = (a: string, b: string): boolean => {
  const cmp = compareDates(a, b);
  return cmp === 0 || cmp === -1;
};

/**
 * Devuelve true si la fecha `a` es estrictamente posterior a `b`.
 * Si alguna fecha no es válida devuelve false.
 */
export const isAfterDate = (a: string, b: string): boolean => {
  const cmp = compareDates(a, b);
  return cmp === 1;
};

/**
 * Devuelve true si la fecha `a` es estrictamente anterior a `b`.
 * Si alguna fecha no es válida devuelve false.
 */
export const isBeforeDate = (a: string, b: string): boolean => {
  const cmp = compareDates(a, b);
  return cmp === -1;
};

/**
 * Devuelve true si la fecha `a` (dd/mm/yyyy) es anterior a la fecha actual.
 * Reutiliza `compareDates` y `parseDDMMYYYY`. Si la fecha no es válida devuelve false.
 */
export const isBeforeToday = (a: string): boolean => {
  const da = stringToDate(a);
  if (!da) return false;
  const today = new Date();
  const dd = String(today.getDate()).padStart(2, '0');
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const yyyy = String(today.getFullYear());
  const todayStr = `${dd}/${mm}/${yyyy}`;
  const cmp = compareDates(a, todayStr);
  return cmp === -1;
};
