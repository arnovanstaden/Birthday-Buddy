import Avatar from '@components/ui/display/Avatar/Avatar';
import styles from './BirthdayCard.module.css';
import { BirthdayCardProps } from './BirthdayCard.types';
import Typography from '@components/ui/display/Typography/Typography';
import { daysUntilNextYearSameDay, getAge } from 'app/utils/time';
import TodayBirthdayCard from '../TodayBirthdayCard/TodayBirthdayCard';
import { Link } from '@remix-run/react';

const BirthdayCard: React.FC<BirthdayCardProps> = (props) => {
  const { date } = props;
  const isBirthdayToday = date.getDate() === new Date().getDate() && date.getMonth() === new Date().getMonth();

  if (isBirthdayToday) {
    return <TodayBirthdayCard {...props} />;
  }

  return (
    <Link to="birthday/1">
      <div className={styles.BirthdayCard}>
        <div className={styles.left}>
          <Typography variant='h5' color='green'>
            {daysUntilNextYearSameDay(date)}
          </Typography>
          <Typography color='secondary' variant='small'>days</Typography>
        </div>
        <div className={styles.divider} />
        <Avatar src={props.avatarSrc} size={64}
        />
        <div className={styles.right}>
          <Typography variant='h6'>
            {props.name}
          </Typography>
          <Typography color='green' weight={500}>
            {date.toDateString()}
          </Typography>
          <Typography color='secondary' variant='small'>
            Turns {getAge(date)}
          </Typography>
        </div>
      </div>
    </Link>
  );
};

export default BirthdayCard;
