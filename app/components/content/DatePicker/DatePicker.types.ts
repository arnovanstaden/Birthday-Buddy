import { BirthdayDateObject } from 'app/types';

export interface DatePickerProps {
  label?: string;
  defaultValue?: BirthdayDateObject;
  onChange?: (newValue: BirthdayDateObject) => void;
}