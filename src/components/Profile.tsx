import styles from '../styles/components/Profile.module.scss';

export function Profile() {

  return (
    <div className={styles.profileContainer}>
      <img src="https://github.com/christianaurichzm.png" alt="Christian Aurich"/>
      <div>
        <strong>Christian Aurich</strong>
      </div>
    </div>
  );
}