import { useChallenges } from "../hooks/useChallenges";
import styles from "../styles/components/LevelUpModal.module.scss";

export function LevelUpModal() {
  const { level, closeLevelUpModal } = useChallenges();

  return (
    <div className={styles.overlay}>
      <div className={styles.content}>
        <header>{level}</header>

        <strong>Congratulations</strong>
        <p>You level up.</p>

        <button type="button" onClick={closeLevelUpModal}>
          <img src="/icons/close.svg" />
        </button>
      </div>
    </div>
  );
}
