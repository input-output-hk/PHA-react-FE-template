//Local file
import styles from './styles/app.module.css';

const Loading = () => {
  return (
    <div className={styles.mainLoadingContainer}>
      <div className={styles.mainLoader} />
    </div>
  );
};

export default Loading;
