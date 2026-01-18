export const getAge = (birthdate: Date) => {
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

export const dateToString = (date: Date): string => {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};
