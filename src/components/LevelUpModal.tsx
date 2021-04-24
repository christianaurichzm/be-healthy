import { useChallenges } from "../hooks/useChallenges";
import styles from "../styles/components/LevelUpModal.module.scss";

export function LevelUpModal() {
  const { userLevel, closeLevelUpModal } = useChallenges();

  return (
    <div className={styles.overlay}>
      <div className={styles.content}>
        <header>{userLevel}</header>

        <strong>Congratulations</strong>
        <p>You level up.</p>

        <button type="button" onClick={closeLevelUpModal}>
          <img src="/icons/close.svg" />
        </button>
      </div>
    </div>
  );
}
