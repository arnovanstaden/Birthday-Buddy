
import Typography from '@components/ui/display/Typography/Typography';
import styles from './Setting.module.css';
import { SettingProps } from './Setting.types';

const Setting: React.FC<SettingProps> = (props) => {
  return (
    <div className={styles.Setting}>
      <Typography>{props.title}</Typography>
      <Typography color='secondary' variant='small'>{props.subtitle}</Typography>
    </div>
  );
};

export default Setting;
