export interface BirthdayDB {
  id: string,
  created_at: string,
  name: string,
  month: number,
  day: number,
  year?: number,
  notes?: string
}

export interface Birthday extends BirthdayDB {
  age?: number;
  date: string;
}