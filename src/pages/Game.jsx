import styles from "./game.module.css";
import { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router";

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
  let navigate = useNavigate();
  const [loaded, setLoaded] = useState(false);

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

    if (charactersFound[name]) {
      return;
    }

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

  const leaderboard = async (formData) => {
    try {
      const name = formData.get("playerName");
      const time = minute * 60 + second;
      const data = { name, time };

      const request = await fetch(import.meta.env.VITE_LEADERBOARD, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!request.ok) {
        throw new Error("Something went wrong.");
      }

      navigate("/leaderboard");
    } catch (error) {
      console.error("Something went wrong:", error);
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
        {!loaded && (
          <div className={styles.loadingScreen}>
            <span className={styles.loadingIcon}></span>
            <p>Loading...</p>
          </div>
        )}
        <img
          src="./gameImage.jpg"
          alt="game image"
          onClick={(e) => imageClickHandler(e)}
          onLoad={() => setLoaded(true)}
          style={{ display: loaded ? "block" : "none" }}
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
          style={
            charactersFound.ginger
              ? {
                  filter: "grayscale(1)",
                  backgroundColor: "gray",
                  pointerEvents: "none",
                }
              : {}
          }
        >
          <img src="./characters/character1.png" alt="character 1" />
          <p>Ginger</p>
        </div>
        <div
          className={styles.characterMenuOption}
          onClick={menuOptionClickhandler}
          style={
            charactersFound.cat
              ? {
                  filter: "grayscale(1)",
                  backgroundColor: "gray",
                  pointerEvents: "none",
                }
              : {}
          }
        >
          <img src="./characters/character2.png" alt="character 2" />
          <p>Cat</p>
        </div>
        <div
          className={styles.characterMenuOption}
          onClick={menuOptionClickhandler}
          style={
            charactersFound.troublemaker
              ? {
                  filter: "grayscale(1)",
                  backgroundColor: "gray",
                  pointerEvents: "none",
                }
              : {}
          }
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
      <dialog ref={quitMenu} role="dialog" className={styles.quitDialog}>
        <p>Are you sure you want to give up?</p>
        <form method="dialog" className={styles.dialogForm}>
          <button className={styles.btn}>No</button>
          <Link to="/">
            <button className={styles.btn}>Yes</button>
          </Link>
        </form>
      </dialog>
      <div
        className={styles.winScreen}
        style={{ display: winStatus ? "flex" : "none" }}
      >
        <form className={styles.winForm} action={leaderboard}>
          <img src="./check-circle.svg" alt="checkmark" />
          <p className={styles.formTitle}>Well Played!</p>
          <p className={styles.formTime}>
            {second < 10 ? `${minute}:0${second}` : `${minute}:${second}`}
            <img src="./winTimer.svg" alt="timer" />
          </p>
          <div className={styles.formInputField}>
            <label htmlFor="playerName">
              Enter your name to be displayed in the leaderboard:
            </label>
            <input
              type="text"
              name="playerName"
              id="playerName"
              maxLength={8}
            />
          </div>
          <div className={styles.btnContainer}>
            <button type="submit" className={styles.btn}>Submit</button>
            <Link to="/">
              <button type="button" className={styles.btn}>Exit</button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Game;
