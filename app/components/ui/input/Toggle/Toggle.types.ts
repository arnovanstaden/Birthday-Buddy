export interface ToggleProps {
  defaultToggled: boolean;
  label: string;
  onToggle?: (newState: boolean) => void;
}