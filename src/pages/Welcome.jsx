import styles from "./welcome.module.css";
import { Link } from "react-router";

const Welcome = () => {
  return (
    <div className={styles.mainMenu}>
        <h1 className={styles.title}>Where Are They?</h1>
        <div className={styles.actions}>
          <Link to="/game">
            <button className={`${styles.btn} ${styles.start}`}>
              Start Game
            </button>
          </Link>
          <Link to="/leaderboard">
            <button className={`${styles.btn} ${styles.leaderboard}`}>
              Leaderboard
            </button>
          </Link>
        </div>
        <ol className={styles.rulesList}>
          <p>How to Play</p>
          <li>Start the game to begin the timer.</li>
          <li>Search the picture for 3 hidden characters.</li>
          <li>Click a character and confirm who you found.</li>
          <li>Find all 3 as fast as you can!</li>
        </ol>
    </div>
  );
};

export default Welcome;
