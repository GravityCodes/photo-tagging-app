import styles from "./game.module.css";
import { useEffect, useState, useRef } from "react";
import { Link } from "react-router";
const Game = () => {
  const [second, setSeconds] = useState(0);
  const [minute, setMinute] = useState(0);
  const [charMenuStatus, setCharMenuStatus] = useState(false);
  const quitMenu = useRef(null);
  const characterMenu = useRef(null);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setSeconds((s) => s + 1);
    }, 1000);

    if (second == 60) {
      setMinute((m) => m + 1);
      setSeconds(0);
    }

    return () => clearInterval(intervalId);
  });

  const showQuitMenu = () => {
    quitMenu.current.showModal();
  };

  const imageClickHandler = (e) => {
    console.log(e);
    characterMenu.current.style.left = `${e.pageX}px`;
    characterMenu.current.style.top = `${e.pageY}px`;
    setCharMenuStatus(!charMenuStatus);
  };

  return (
    <div className={styles.gameContainer}>
      <div className={styles.topBar}>
        <div className={styles.timerContainer}>
          <img src="./clock.svg" alt="timer" />
          <div className={styles.timer}>
            {second < 10 ? `${minute}:0${second}` : `${minute}:${second}`}
          </div>
        </div>
        <div className={styles.characterContainer}>
          <img src="./characters/character1.png" alt="character 1" />
          <img src="./characters/character2.png" alt="character 2" />
          <img src="./characters/character3.png" alt="character 3" />
        </div>
        <button className={styles.quitBtn} onClick={showQuitMenu}>
          Give up
        </button>
      </div>
      <div className={styles.gameMap}>
        <img
          src="./gameImage.jpg"
          alt="game image"
          onClick={(e) => imageClickHandler(e)}
        />
      </div>
      <div
        className={`${styles.characterMenu}`}
        ref={characterMenu}
        style={{ display: charMenuStatus ? "flex" : "none" }}
        data-testid="characterSelect"
      >
        <div className={styles.characterMenuOption}>
          <img src="./characters/character1.png" alt="character 1" />
          <p>Ginger</p>
        </div>
        <div className={styles.characterMenuOption}>
          <img src="./characters/character2.png" alt="character 2" />
          <p>Cat</p>
        </div>
        <div className={styles.characterMenuOption}>
          <img src="./characters/character3.png" alt="character 3" />
          <p>Troublemaker</p>
        </div>
      </div>
      <dialog ref={quitMenu} role="dialog">
        <p>Are you sure you want to give up?</p>
        <form method="dialog" className={styles.dialogForm}>
          <button className={styles.btn}>No</button>
          <Link to="/">
            <button className={styles.btn}>Yes</button>
          </Link>
        </form>
      </dialog>
    </div>
  );
};

export default Game;
