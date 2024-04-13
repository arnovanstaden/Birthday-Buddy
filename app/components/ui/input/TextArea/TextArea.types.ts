export interface TextAreaProps extends Omit<React.HTMLProps<HTMLTextAreaElement>, 'onChange'> {
  onChange?: (value: string) => void;
}