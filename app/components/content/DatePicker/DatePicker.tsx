import classNames from 'classnames';
import styles from './DatePicker.module.css';
import { DatePickerProps } from './DatePicker.types';
import Select from 'react-select';

interface Option {
  value: number;
  label: string | number;
}

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

const monthOptions: Option[] = months.map((month, index) => ({
  value: index + 1,
  label: month
}));

const days = Array.from({ length: 31 }, (_, index) => index + 1);

const dayOptions: Option[] = days.map((day) => ({
  value: day,
  label: day
}));

const years = Array.from({ length: 100 }, (_, index) => new Date().getFullYear() - index);

const yearOptions: Option[] = years.map((year) => ({
  value: year,
  label: year
}));

interface MySelectProps {
  options: Option[];
  placeholder: string;
  value?: Option;
}

const MySelect = ({ options, placeholder, value }: MySelectProps) => (
  <Select
    value={value}
    placeholder={placeholder}
    options={options}
    aria-label={placeholder}
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
    isSearchable={false}
    onChange={(selectedOption) => {
      console.log(selectedOption);
    }}
  />
);

const DatePicker: React.FC<DatePickerProps> = ({ label, defaultValue }) => {
  return (
    <div className={styles.DatePicker}>
      {label && (
        <label>
          {label}
        </label>
      )}
      <div className={styles.row}>
        <MySelect
          placeholder="Month"
          options={monthOptions}
          value={defaultValue?.month !== undefined ? {
            value: defaultValue.month,
            label: months[defaultValue.month],
          } : undefined}
        />
        <MySelect
          placeholder="Day"
          options={dayOptions}
          value={defaultValue?.day !== undefined ? {
            value: defaultValue.day,
            label: defaultValue.day.toString(),
          } : undefined}
        />
        <MySelect
          placeholder="Year"
          options={yearOptions}
          value={defaultValue?.year !== undefined ? {
            value: defaultValue.year,
            label: defaultValue.year?.toString(),
          } : undefined}
        />
      </div>
    </div>
  );
};

export default DatePicker;
