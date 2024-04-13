/**
 * Returns the age of a person for the next birthday.
 */
export const getAge = (date: string, year: number | undefined): number | undefined => {
  if (!year) return undefined;
  const currentYear = new Date().getFullYear();
  return ((new Date(date).getFullYear() < currentYear) ? currentYear + 1 : currentYear) - year;
}

export const daysUntilNextYearSameDay = (date: Date): number => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();

  const targetYear = currentYear + 1;
  const targetDate = new Date(targetYear, date.getMonth(), date.getDate());

  const timeDifference = targetDate.getTime() - currentDate.getTime();
  const daysUntilNextYear = Math.round(timeDifference / (1000 * 60 * 60 * 24));
  return daysUntilNextYear;
}

/**
 * Returns the number of days until the next occurrence of a specific day and month.
 */
export const daysUntilNextOccurrence = (birthDay: number, birthMonth: number): number => {
  const today = new Date();
  const currentMonth = today.getMonth();

  // Calculate the target year for the next occurrence
  let targetYear = today.getFullYear();
  if (birthMonth < currentMonth || (birthMonth === currentMonth && birthDay < today.getDate())) {
    targetYear++; // Move to next year if the target date has already passed in the current year
  }

  // Construct target date for next occurrence
  const targetDate = new Date(targetYear, birthMonth - 1, birthDay); // Month indexes start from 0, so we subtract 1

  // Calculate the difference in milliseconds between today and the target date
  const differenceMillis = targetDate.getTime() - today.getTime();

  // Convert milliseconds to days and return
  return Math.ceil(differenceMillis / (1000 * 60 * 60 * 24));
}

export const isBirthdayToday = (birthDay: number, birthMonth: number): boolean => {
  const today = new Date();
  const currentDay = today.getDate();
  const currentMonth = today.getMonth();
  return currentDay === birthDay && currentMonth === birthMonth;
}

export const formatBirthday = (dateString: string): string => {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];

  const currentDate = new Date();
  const targetDate = new Date(dateString);

  // Set the target year to the current year
  let targetYear = currentDate.getFullYear();

  // If the target date has already occurred this year, set the target year to the next year
  if (
    targetDate.getMonth() < currentDate.getMonth() ||
    (targetDate.getMonth() === currentDate.getMonth() && targetDate.getDate() < currentDate.getDate())
  ) {
    targetYear += 1;
  }

  // Set the target date with the adjusted year
  targetDate.setFullYear(targetYear);

  const dayName = days[targetDate.getDay()];
  const month = months[targetDate.getMonth()];
  const day = targetDate.getDate();

  const formattedDate = `${dayName}, ${month} ${day}, ${targetYear}`;
  return formattedDate;
}
