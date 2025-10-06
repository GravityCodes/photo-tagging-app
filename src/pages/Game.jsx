import styles from "./game.module.css";
import { useEffect, useState, useRef } from "react";
import { Link } from "react-router";
const Game = () => {
    
    const [second, setSeconds] = useState(0);
    const [minute, setMinute] = useState(0);
    const dialog = useRef(null);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setSeconds(s => s + 1);

        }, 1000);

        if(second == 60){
            setMinute(m => m + 1);
            setSeconds(0);
        }

        return () => clearInterval(intervalId);
    });

    const showModal = () => {
        dialog.current.showModal();
    }

    return (
        <div className={styles.gameContainer}>
            <div className={styles.topBar}>
                <div className={styles.timerContainer}>
                    <img src="./clock.svg" alt="timer" />
                    <div className={styles.timer}>{second < 10 ? `${minute}:0${second}` : `${minute}:${second}` }</div>
                </div>
                <div>
                    <img src="./characters/character1.png" alt="character 1" />
                    <img src="./characters/character2.png" alt="character 2" />
                    <img src="./characters/character3.png" alt="character 3" />
                </div>
                <button className={styles.quitBtn} onClick={showModal}>Give up</button>
            </div>
            <div className={styles.gameMap}>
                <img src="./gameImage.jpg" alt="game image" />
            </div>
            <dialog ref={dialog}>
                <p>Are you sure you want to give up?</p>
                <form method="dialog" className={styles.dialogForm}>
                    <button className={styles.btn}>No</button>
                    <Link to="/"><button className={styles.btn}>Yes</button></Link>
                </form>
            </dialog>
        </div>
    )
}

export default Game;