import styles from "./game.module.css";
import { useEffect, useState } from "react";

const Game = () => {
    
    const [second, setSeconds] = useState(0);
    const [minute, setMinute] = useState(0);

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

    return (
        <div className={styles.gameContainer}>
            <div className={styles.topBar}>
                <div className={styles.timerContainer}>
                    <img src="./clock.svg" alt="timer" />
                    <div className={styles.timer}>{second < 10 ? `${minute}:0${second}` : `${minute}:${second}` }</div>
                </div>
                <button>Give up</button>
            </div>
            <div className={styles.gameMap}>
                <img src="./gameImage.jpg" alt="game image" />
            </div>
        </div>
    )
}

export default Game;