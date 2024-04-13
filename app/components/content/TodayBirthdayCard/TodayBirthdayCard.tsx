import Typography from '@components/ui/display/Typography/Typography';
import styles from './TodayBirthdayCard.module.css';
import Button from '@components/ui/input/Button/Button';
import IconButton from '@components/ui/input/IconButton/IconButton';
import Avatar from '@components/ui/display/Avatar/Avatar';
import { Birthday } from 'app/types';

const TodayBirthdayCard: React.FC<Birthday> = (birthday) => {
  return (
    <div className={styles.TodayBirthdayCard}>
      <div className={styles.top}>
        <Avatar size={64} src={birthday.avatar}
        />
        <div>
          <Typography variant='h6'>
            {birthday.name}
          </Typography>
          <div className={styles.date}>
            <Typography color='green' weight={500}>
              Today
            </Typography>
            {birthday.age && (
              <Typography color='secondary' variant='small'>
                •   Turns {birthday.age}
              </Typography>
            )}
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
