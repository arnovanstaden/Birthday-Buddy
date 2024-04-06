import Avatar from '@components/ui/display/Avatar/Avatar';
import styles from './BirthdayCard.module.css';
import { BirthdayCardProps } from './BirthdayCard.types';
import Typography from '@components/ui/display/Typography/Typography';

const BirthdayCard: React.FC<BirthdayCardProps> = () => {
  return (
    <div className={styles.BirthdayCard}>
      <div className={styles.left}>
        <Typography variant='h6' color='green'>4</Typography>
        <Typography color='secondary' variant='small'>days</Typography>
      </div>
      <div className={styles.divider} />
      <Avatar src='https://images.unsplash.com/photo-1475403614135-5f1aa0eb5015?q=80&w=60&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
      />
      <div className={styles.right}>
        <Typography variant='h6'>Arno van Staden</Typography>
        <Typography color='green'>Mon, 24 Jan 2022</Typography>
        <Typography color='secondary' variant='small'>Turns 29</Typography>
      </div>
    </div>
  );
};

export default BirthdayCard;
