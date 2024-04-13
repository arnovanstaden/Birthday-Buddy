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
  const avatarSrc = 'https://www.tandem.net/_next/image?url=https%3A%2F%2Fimages.ctfassets.net%2F0uov5tlk8deu%2F3EhMdZzYvroc6S5lN9ntZD%2F32df91b1dc1522ccacbdf1a9aaf5e235%2Farno.jpg&w=767&q=100';

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
        <Avatar src={avatarSrc} size={64}
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
