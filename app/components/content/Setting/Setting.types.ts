interface SettingPropsBase {
  title: string;
  subtitle?: string;
}

interface SettingWithClickProps extends SettingPropsBase {
  onClick: () => void;
}

interface SettingWithLinkProps extends SettingPropsBase {
  link: string;
}

interface SettingWithToggleProps extends SettingPropsBase {
  toggled: boolean;
  onToggle: () => void;
}

export type SettingProps = SettingWithLinkProps | SettingWithToggleProps | SettingWithClickProps;