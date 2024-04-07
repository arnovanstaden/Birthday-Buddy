
import Typography from '@components/ui/display/Typography/Typography';
import styles from './Setting.module.css';
import { SettingProps } from './Setting.types';
import Toggle from '@components/ui/input/Toggle/Toggle';
import { Link } from '@remix-run/react';

const Setting: React.FC<SettingProps> = (props) => {
  const withToggle = 'onToggle' in props && 'toggled' in props;

  const base = (
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
        weight={300}
      >
        {props.subtitle}
      </Typography>
    </div>
  );

  if ('link' in props && props.link) {
    return (
      <Link to={props.link}>
        {base}
      </Link>
    );
  }

  return base;
};

export default Setting;
