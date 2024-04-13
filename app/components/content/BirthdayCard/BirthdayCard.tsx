import Avatar from '@components/ui/display/Avatar/Avatar';
import styles from './BirthdayCard.module.css';
import Typography from '@components/ui/display/Typography/Typography';
import { daysUntilNextOccurrence, formatBirthday, isBirthdayToday } from 'app/utils/time';
import TodayBirthdayCard from '../TodayBirthdayCard/TodayBirthdayCard';
import { Link } from '@remix-run/react';
import { Birthday } from 'app/types';

const BirthdayCard: React.FC<Birthday> = (birthday) => {
  if (isBirthdayToday(birthday.day, birthday.month)) {
    return <TodayBirthdayCard {...birthday} />;
  }

  return (
    <Link to={`/birthday/${birthday.id}`}>
      <div className={styles.BirthdayCard}>
        <div className={styles.left}>
          <Typography variant='h5' color='green'>
            {daysUntilNextOccurrence(birthday.day, birthday.month)}
          </Typography>
          <Typography color='secondary' variant='small'>days</Typography>
        </div>
        <div className={styles.divider} />
        <Avatar src={birthday.avatar} size={64}
        />
        <div className={styles.right}>
          <Typography variant='h6'>
            {birthday.name}
          </Typography>
          <Typography color='green' weight={500}>
            {formatBirthday(birthday.date)}
          </Typography>
          {birthday.age && (
            <Typography color='secondary' variant='small'>
              Turns {birthday.age}
            </Typography>
          )}
        </div>
      </div>
    </Link>
  );
};

export default BirthdayCard;
