import { UseFormRegisterReturn } from 'react-hook-form';

export interface PhotoPickerProps {
  defaultImage?: string;
  name: string;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
  register: UseFormRegisterReturn;
}