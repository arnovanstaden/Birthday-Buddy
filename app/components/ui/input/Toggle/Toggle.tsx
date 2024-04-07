import classNames from 'classnames';
import styles from './Toggle.module.css';
import { ToggleProps } from './Toggle.types';
import { useState } from 'react';

const Toggle: React.FC<ToggleProps> = (props) => {
  const [toggled, setToggled] = useState(props.defaultToggled);

  const classes = classNames(
    styles.Toggle,
    toggled && styles.toggled,
  );

  const handleToggle = () => {
    setToggled((prev) => {
      if (props.onToggle) props.onToggle(!prev);
      return !prev;
    });
  };

  return (
    <label className={classes}>
      <input
        type="checkbox"
        checked={toggled}
        onChange={handleToggle}
        aria-checked={toggled}
        aria-label={props.label}
      />
      <span className={styles.handle}></span>
    </label>
  );
};

export default Toggle;
