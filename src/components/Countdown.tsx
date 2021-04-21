import styles from "../styles/components/Countdown.module.scss";

export function Countdown() {
  return (
    <>
      <div className={styles.countdown}>
        <div>
          <span>0</span>
          <span>0</span>
        </div>
        <span>:</span>
        <div>
          <span>0</span>
          <span>0</span>
        </div>
      </div>

      <button type="button" className={styles.startCycleButton}>
        Start a cycle
      </button>
    </>
  );
}
