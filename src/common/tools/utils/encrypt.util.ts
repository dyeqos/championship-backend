import { hashSync, compareSync } from 'bcrypt';

/**
 * Encriptar password para guardar en DB
 * @param password password a encriptar
 * @returns password encriptado
 */
export const encryptPassword = (password: string): string => {
  return hashSync(password, 10);
};

/**
 * Compara passwords
 * @param password password entrada
 * @param passwordEncrypted password encriptado
 * @returns si el password son iguales devuelve true
 */
export const isValidPassword = (
  password: string,
  passwordEncrypted: string,
): boolean => {
  return compareSync(password, passwordEncrypted);
};
