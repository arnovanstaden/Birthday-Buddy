export interface TypographyProps {
  children: React.ReactNode;
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'small';
  color?: 'primary' | 'secondary' | 'green';
  className?: string;
  weight?: 300 | 400 | 500 | 600
}
