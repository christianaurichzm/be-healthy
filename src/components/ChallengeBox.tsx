import { useChallenges } from "../hooks/useChallenges";
import { useCountdown } from "../hooks/useCountdown";

import styles from "../styles/components/ChallengeBox.module.scss";

export function ChallengeBox() {
  const {
    activeChallenge,
    completeChallenge,
    resetChallenge,
  } = useChallenges();
  const { resetCountdown } = useCountdown();

  function handleChallengeSucceeded() {
    completeChallenge();
    resetCountdown();
  }

  function handleChallengeFailed() {
    resetChallenge();
    resetCountdown();
  }

  return (
    <div className={styles.challengeContainer}>
      {activeChallenge ? (
        <div className={styles.challengeActive}>
          <header>Gain {activeChallenge.amount} xp</header>

          <main>
            {activeChallenge.type === "exercise" ? (
              <img src="/icons/exercise.svg" />
            ) : (
              <img src="/icons/food.svg" />
            )}
            <strong>New challenge</strong>
            <p>{activeChallenge.description}</p>
          </main>

          <footer>
            <button
              type="button"
              className={styles.challengeFailedButton}
              onClick={handleChallengeFailed}
            >
              Failed
            </button>
            <button
              type="button"
              className={styles.challengeSucceededButton}
              onClick={handleChallengeSucceeded}
            >
              Completed
            </button>
          </footer>
        </div>
      ) : (
        <div className={styles.challengeNotActive}>
          <strong>Finish a cycle to receive new challenges</strong>
          <p>
            <img src="icons/level-up.svg" alt="Level up" />
            Level up completing challenges.
          </p>
        </div>
      )}
    </div>
  );
}
