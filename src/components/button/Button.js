import styles from './component.module.css';

const Button = ({ onClick }) => {
  return (
    <button onClick={onClick} className={styles.button}>
      Start
    </button>
  );
};

export default Button;
