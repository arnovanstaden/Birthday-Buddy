import { UseFormRegisterReturn } from 'react-hook-form';

export interface InputProps {
  name: string;
  className?: string
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
  register: UseFormRegisterReturn;
  error?: string;
}