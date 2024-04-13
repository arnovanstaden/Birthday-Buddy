import Typography from '@components/ui/display/Typography/Typography';
import styles from './TodayBirthdayCard.module.css';
import Button from '@components/ui/input/Button/Button';
import IconButton from '@components/ui/input/IconButton/IconButton';
import Avatar from '@components/ui/display/Avatar/Avatar';
import { Birthday } from 'app/types';

const TodayBirthdayCard: React.FC<Birthday> = (birthday) => {
  const avatarSrc = 'https://www.tandem.net/_next/image?url=https%3A%2F%2Fimages.ctfassets.net%2F0uov5tlk8deu%2F3EhMdZzYvroc6S5lN9ntZD%2F32df91b1dc1522ccacbdf1a9aaf5e235%2Farno.jpg&w=767&q=100';

  return (
    <div className={styles.TodayBirthdayCard}>
      <div className={styles.top}>
        <Avatar size={64} src={avatarSrc}
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
