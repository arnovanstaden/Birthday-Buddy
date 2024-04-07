
import Typography from '@components/ui/display/Typography/Typography';
import styles from './Setting.module.css';
import { SettingProps } from './Setting.types';
import Toggle from '@components/ui/input/Toggle/Toggle';

const Setting: React.FC<SettingProps> = (props) => {
  const withToggle = 'onToggle' in props && 'toggled' in props;

  return (
    <div className={styles.Setting}>
      <div className={styles.top}>
        <Typography>{props.title}</Typography>
        {withToggle && (
          <Toggle
            defaultToggled={false}
            onToggle={() => { }}
            label=''
          />
        )}
      </div>
      <Typography
        color='secondary'
        variant='small'
        className={styles.subtitle}
      >
        {props.subtitle}
      </Typography>
    </div>
  );
};

export default Setting;
