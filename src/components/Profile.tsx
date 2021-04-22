import { useChallenges } from "../hooks/useChallenges";

import styles from "../styles/components/Profile.module.scss";

export function Profile() {
  const { level, user } = useChallenges();

  return (
    <div className={styles.profileContainer}>
      <img src={user.avatar_url} alt={user.name} />
      <div>
        <strong>{user.name}</strong>
        <p>
          <img src="icons/level.svg" alt="Level" />
          Level {level}
        </p>
      </div>
    </div>
  );
}
