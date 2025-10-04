import styles from "./welcome.module.css";

const Welcome = () => {
  return (
    <div className={styles.mainMenu}>
      <div className={styles.blurredOverlay}>
        <h1 className={styles.title}>Where Are They?</h1>
        <div className={styles.actions}>
          <button className={styles.btn}>Start Game</button>
          <button className={styles.btn}>LeaderBoard</button>
        </div>
        <ol className={styles.rulesList}>
          <li>Start the game to begin the timer.</li>
          <li>Search the picture for 3 hidden characters.</li>
          <li>Click a character and confirm who you found.</li>
          <li>Find all 3 as fast as you can!</li>
        </ol>
      </div>
    </div>
  );
};

export default Welcome;
