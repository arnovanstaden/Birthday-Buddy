import { UseFormRegisterReturn } from 'react-hook-form';

export interface TextAreaProps {
  name: string;
  className?: string
  textareaProps?: React.TextareaHTMLAttributes<HTMLTextAreaElement>;
  register: UseFormRegisterReturn;
  error?: string;
}