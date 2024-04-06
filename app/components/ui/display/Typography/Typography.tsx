import React from 'react';
import classNames from 'classnames';
import { TypographyProps } from './Typography.types';
import styles from './Typography.module.css';

const Typography: React.FC<TypographyProps> = ({
  variant = 'p',
  color = 'primary',
  children,
  className,
}) => {
  const classes = classNames(
    className,
    styles.Typography,
    styles[`color-${color}`],
    styles[`variant-${variant}`]
  );

  switch (variant) {
    case 'h1':
      return <h1 className={classes}>{children}</h1>;
    case 'h2':
      return <h2 className={classes}>{children}</h2>;
    case 'h3':
      return <h3 className={classes}>{children}</h3>;
    case 'h4':
      return <h4 className={classes}>{children}</h4>;
    case 'h5':
      return <h5 className={classes}>{children}</h5>;
    case 'h6':
      return <h6 className={classes}>{children}</h6>;
    case 'p':
      return <p className={classes}>{children}</p>;
    case 'small':
      return <small className={classes}>{children}</small>;
    default:
      return null;
  }
};

export default Typography;
