import styles from './Container.module.css';

const Container: React.FC<{ children: React.ReactNode }> = (props) => {
  return (
    <div className={styles.Container}>
      {props.children}
    </div>
  );
};

export default Container;
