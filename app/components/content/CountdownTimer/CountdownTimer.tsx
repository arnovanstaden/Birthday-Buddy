import { useEffect, useState } from 'react';
import styles from './CountdownTimer.module.css';
import { CountdownTimerProps } from './CountdownTimer.types';
import Typography from '@components/ui/display/Typography/Typography';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const TimeItem: React.FC<{ value: number, label: string }> = ({ value, label }) => (
  <div>
    <Typography
      color="green"
      variant="h5"
    >
      {value}
    </Typography>
    <Typography
      variant="small"
      color="secondary"
    >
      {label}
    </Typography>
  </div>
);

const CountdownTimer: React.FC<CountdownTimerProps> = ({ date }) => {
  const calculateTimeLeft = (): TimeLeft => {
    const today = new Date();
    let targetYear = today.getFullYear();
    const targetMonth = date.getMonth() + 1;
    const targetDay = date.getDate();

    // Check if target date has passed this year
    if (
      today.getMonth() > targetMonth - 1 ||
      (today.getMonth() === targetMonth - 1 && today.getDate() > targetDay)
    ) {
      targetYear += 1; // Set target year to next year
    }

    const targetDate = new Date(targetYear, targetMonth - 1, targetDay);
    const difference = targetDate.getTime() - today.getTime();
    let timeLeft: TimeLeft = {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

  return (
    <div className={styles.CountdownTimer}>
      {timeLeft.days > 0 && (
        <TimeItem
          value={timeLeft.days}
          label="days"
        />
      )}
      {timeLeft.hours > 0 && (
        <TimeItem
          value={timeLeft.hours}
          label="hours"
        />
      )}
      {timeLeft.minutes > 0 && (
        <TimeItem
          value={timeLeft.minutes}
          label="minutes"
        />
      )}
      {timeLeft.seconds > 0 && (
        <TimeItem
          value={timeLeft.seconds}
          label="seconds"
        />
      )}
      {/* // TOday */}
    </div>
  );
};

export default CountdownTimer;