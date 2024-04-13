import classNames from 'classnames';
import styles from './Icon.module.css';
import { IconProps } from './Icon.types';

const customIcons = ['apple', 'google'];

const Icon: React.FC<IconProps> = ({ colour = 'green', size = 24, name, ...props }) => {
  const classes = classNames(
    styles.Icon,
    props.className,
    styles[`colour-${colour}`],
  );

  const { dataTestId, ...restProps } = { ...props };

  const isCustomIcon = customIcons.includes(name);

  if (isCustomIcon) {
    return (
      <img
        src={`/icons/${name}.svg`}
        aria-label={`${name} icon`}
        alt={`${name} icon`}
        width={size - 4}
        height={size - 4}
      />
    );
  }

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
