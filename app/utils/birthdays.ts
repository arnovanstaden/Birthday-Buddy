import { Birthday, BirthdayDB } from 'app/types'
import { getAge } from './time';

export const transformBirthday = (birthday: BirthdayDB): Birthday => {
  const date = new Date(birthday.year || 1970, birthday.month, birthday.day).toISOString();
  return {
    ...birthday,
    date,
    age: getAge(date, birthday.year),
    avatar: `https://caddasfkyvctkqlspemd.supabase.co/storage/v1/object/public/avatars/${birthday.id}.webp`
  }
}

export const sortBySoonestOccurringBirthday = (birthdays: Birthday[]): Birthday[] => {
  // Sort the birthdays array by the next occurrence of each birthday
  birthdays.sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);

    // Set the target year to the current year
    const currentYear = new Date().getFullYear();
    dateA.setFullYear(currentYear);
    dateB.setFullYear(currentYear);

    // If the target date has already occurred this year, set the target year to the next year
    if (dateA < new Date()) {
      dateA.setFullYear(currentYear + 1);
    }
    if (dateB < new Date()) {
      dateB.setFullYear(currentYear + 1);
    }

    return dateA.getTime() - dateB.getTime();
  });

  return birthdays;
}