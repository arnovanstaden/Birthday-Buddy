import { Birthday, BirthdayDB } from 'app/types';
import { createClient } from './supabase';
import { sortBySoonestOccurringBirthday, transformBirthday } from 'app/utils/birthdays';

export const getBirthday = async (request: Request, id: string): Promise<Birthday | null> => {
  const supabase = createClient(request);
  const result = await supabase.from('birthdays').select('*').eq('id', id).single();
  if (!result.data) return null;
  return transformBirthday(result.data);
};

export const getBirthdays = async (request: Request): Promise<Birthday[]> => {
  const supabase = createClient(request);

  const result = await supabase.from('birthdays').select('*');
  if (!result.data) return [];
  const transformedBirthdays = result.data.map((birthday: BirthdayDB) => transformBirthday(birthday));
  const sortedBirthdays = sortBySoonestOccurringBirthday(transformedBirthdays)
  return sortedBirthdays;
}