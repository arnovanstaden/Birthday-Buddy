import Typography from '../Typography/Typography';
import styles from './Heading.module.css';
import { HeadingProps } from './Heading.types';

const Heading: React.FC<HeadingProps> = (props) => {
  return (
    <div className={styles.Heading}>
      <div className={styles.left}>
        <Typography
          variant='h3'
        >
          {props.title}
        </Typography>
        <Typography
          variant='h6'
          color='secondary'
          weight={500}
        >
          {props.subtitle}
        </Typography>
      </div>
      {props.action}
    </div>
  );
};

export default Heading;
