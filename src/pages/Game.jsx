import styles from "./game.module.css";
import { useEffect, useState, useRef } from "react";
import { Link } from "react-router";
const Game = () => {
  const [second, setSeconds] = useState(0);
  const [minute, setMinute] = useState(0);
  const quitMenu = useRef(null);
  const characterMenu = useRef(null);
  const [charMenuStatus, setCharMenuStatus] = useState(false);
  const wrongAnswer = useRef(null);
  const [wrongAnswerStatus, setWrongAnswerStatus] = useState(false);
  const [currentCoordsPercentage, setCurrentCoordsPercentage] = useState({});
  const [currentCoords, setCurrectCords] = useState({});
  const [markers, setMarker] = useState([]);
  const [charactersFound, setCharactersFound] = useState({
    ginger: false,
    troublemaker: false,
    cat: false,
  });
  const [winStatus, setWinStatus] = useState(false);
  const intervalRef = useRef(null);

  //set Timer
  useEffect(() => {
    if (intervalRef.current) return;

    intervalRef.current = setInterval(() => {
      setSeconds((s) => {
        if (s === 59) {
          setMinute((m) => m + 1);
          return 0;
        }
        return s + 1;
      });
    }, 1000);

    return () => {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (
      charactersFound.cat &&
      charactersFound.ginger &&
      charactersFound.troublemaker
    ) {
      setWinStatus(true);
      clearInterval(intervalRef.current);
    }
  }, [charactersFound]);

  const showQuitMenu = () => {
    quitMenu.current.showModal();
  };

  const imageClickHandler = (e) => {
    const rect = e.target.getBoundingClientRect();
    // console.log(
    //   `client X: ${e.clientX} page Y:${e.clientY} \n rect: height: ${rect.top} width: ${rect.left} \n coords: ${(e.clientX - rect.left) / rect.width}, ${(e.clientY - rect.top) / rect.height}`,
    // );
    setCurrentCoordsPercentage({
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height,
    });
    setCurrectCords({
      x: e.clientX,
      y: e.clientY,
    });
    characterMenu.current.style.left = `${e.pageX}px`;
    characterMenu.current.style.top = `${e.pageY}px`;
    setCharMenuStatus(!charMenuStatus);
    setWrongAnswerStatus(false);
  };

  const menuOptionClickhandler = async (e) => {
    // console.log(
    //   e.target.textContent.toLowerCase() ||
    //     e.target.parentElement.outerText.toLowerCase(),
    // );
    // console.log(currentCoords);
    const name =
      e.target.textContent.toLowerCase() ||
      e.target.parentElement.outerText.toLowerCase();
    try {
      const response = await fetch(import.meta.env.VITE_CHECK_ANSWER, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          x: currentCoordsPercentage.x,
          y: currentCoordsPercentage.y,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status ${response.status}`);
      }

      const result = await response.json();

      // console.log(result);

      setCharMenuStatus(!charMenuStatus);

      if (result.msg) {
        setMarker((prev) => [
          ...prev,
          {
            x: currentCoordsPercentage.x * 667,
            y: currentCoordsPercentage.y * 1000,
          },
        ]);
        setCharactersFound((prev) => ({
          ...prev,
          [name]: !charactersFound[name],
        }));
      } else {
        wrongAnswer.current.style.left = `${currentCoords.x}px`;
        wrongAnswer.current.style.top = `${currentCoords.y}px`;
        setWrongAnswerStatus(!wrongAnswerStatus);
        setTimeout(() => {
          setWrongAnswerStatus(false);
        }, 2000);
      }
    } catch (error) {
      console.log("An error has occured", error);
    }
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
          <img
            src="./characters/character1.png"
            alt="character 1"
            style={{ filter: charactersFound.ginger ? "" : "grayscale(1)" }}
          />
          <img
            src="./characters/character2.png"
            alt="character 2"
            style={{ filter: charactersFound.cat ? "" : "grayscale(1)" }}
          />
          <img
            src="./characters/character3.png"
            alt="character 3"
            style={{
              filter: charactersFound.troublemaker ? "" : "grayscale(1)",
            }}
          />
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
        {markers.length > 0 &&
          markers.map((marker, i) => {
            return (
              <div
                key={i}
                className={styles.marker}
                style={{ left: marker.x - 10, top: marker.y - 10 }}
              />
            );
          })}
      </div>
      <div
        className={`${styles.characterMenu}`}
        ref={characterMenu}
        style={{ display: charMenuStatus ? "flex" : "none" }}
        data-testid="characterSelect"
      >
        <div
          className={styles.characterMenuOption}
          onClick={menuOptionClickhandler}
        >
          <img src="./characters/character1.png" alt="character 1" />
          <p>Ginger</p>
        </div>
        <div
          className={styles.characterMenuOption}
          onClick={menuOptionClickhandler}
        >
          <img src="./characters/character2.png" alt="character 2" />
          <p>Cat</p>
        </div>
        <div
          className={styles.characterMenuOption}
          onClick={menuOptionClickhandler}
        >
          <img src="./characters/character3.png" alt="character 3" />
          <p>Troublemaker</p>
        </div>
      </div>
      <div
        className={styles.wrongAnswer}
        ref={wrongAnswer}
        style={{ display: wrongAnswerStatus ? "flex" : "none" }}
      >
        Wrong!
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
