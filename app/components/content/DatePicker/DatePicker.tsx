import classNames from 'classnames';
import styles from './DatePicker.module.css';
import { DatePickerProps } from './DatePicker.types';
import Select from 'react-select'

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

const monthOptions = months.map((month, index) => ({
  value: index + 1,
  label: month
}));

const days = Array.from({ length: 31 }, (_, index) => index + 1);

const dayOptions = days.map((day) => ({
  value: day,
  label: day
}));

const DatePicker: React.FC<DatePickerProps> = () => {
  return (
    <div className={styles.DatePicker}>
      <Select
        options={monthOptions}
        aria-label="Months"
        className={styles.select}
        components={{
          IndicatorsContainer: () => null
        }}
        classNames={{
          control: ({ isFocused }) => classNames(styles.control, isFocused && styles.focused),
          menu: () => styles.menu,
          singleValue: () => styles.value,
          option: ({ isSelected }) => classNames(styles.option, isSelected && styles.selected)
        }}
      />
      <Select
        options={dayOptions}
        aria-label="Days"
        className={styles.select}
        components={{
          IndicatorsContainer: () => null
        }}
        classNames={{
          control: ({ isFocused }) => classNames(styles.control, isFocused && styles.focused),
          menu: () => styles.menu,
          singleValue: () => styles.value,
          option: ({ isSelected }) => classNames(styles.option, isSelected && styles.selected)
        }}
      />
    </div>
  );
};

export default DatePicker;
