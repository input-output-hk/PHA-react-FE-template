//Local file
import styles from './styles/app.module.css';

const NotFound = () => {
  return (
    <div className={styles.notFoundContainer}>
      <h1 className={styles.statusCode}>404</h1>
      <p className={styles.description}>Page Not Found</p>
    </div>
  );
};

export default NotFound;
