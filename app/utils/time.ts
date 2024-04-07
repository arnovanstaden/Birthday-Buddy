/**
 * Returns the age of a person given their birthdate.
 */
export const getAge = (date: Date): number => {
  return new Date().getFullYear() - date.getFullYear();
}

/**
 * Returns the number of days until the next year on the same day.
 */
export const daysUntilNextYearSameDay = (date: Date): number => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();

  const targetYear = currentYear + 1;
  const targetDate = new Date(targetYear, date.getMonth(), date.getDate());

  const timeDifference = targetDate.getTime() - currentDate.getTime();
  const daysUntilNextYear = Math.round(timeDifference / (1000 * 60 * 60 * 24));
  return daysUntilNextYear;
}