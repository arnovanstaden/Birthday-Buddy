import Typography from '@components/ui/display/Typography/Typography';
import { BirthdayCardProps } from '../BirthdayCard/BirthdayCard.types';
import styles from './TodayBirthdayCard.module.css';
import Button from '@components/ui/input/Button/Button';
import IconButton from '@components/ui/input/IconButton/IconButton';
import Avatar from '@components/ui/display/Avatar/Avatar';
import { getAge } from 'app/utils/time';


const TodayBirthdayCard: React.FC<BirthdayCardProps> = (props) => {
  return (
    <div className={styles.TodayBirthdayCard}>
      <div className={styles.top}>
        <Avatar size={64} src={props.avatarSrc}
        />
        <div>
          <Typography variant='h6'>
            {props.name}
          </Typography>
          <div>
            <Typography color='green'>
              Today
            </Typography>
            <Typography color='secondary' variant='small'>
              Turns {getAge(props.date)}
            </Typography>
          </div>
        </div>
      </div>
      <div className={styles.bottom}>
        <Button>Send Message</Button>
        <IconButton name='notifications' />
      </div>
    </div>
  );
};

export default TodayBirthdayCard;
