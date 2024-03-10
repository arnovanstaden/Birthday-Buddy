import classNames from 'classnames';
import styles from './Icon.module.css';
import { IconProps } from './Icon.types';

const Icon: React.FC<IconProps> = ({ colour = 'green', size = 24, name, ...props }) => {
  const classes = classNames(
    styles.Icon,
    props.className,
    styles[`colour-${colour}`],
  );

  const { dataTestId, ...restProps } = { ...props };

  return (
    <span
      {...restProps}
      className={classes}
      translate="no" // Translation extensions translate icon names into text if this is not disabled
      aria-label={`${name} icon`}
      role="img"
      style={{
        fontSize: `${size}px`,
      }}
      data-testid={dataTestId || 'Icon'}
    >
      {name}
    </span>
  );
};

export default Icon;
