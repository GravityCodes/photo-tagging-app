import styles from "./game.module.css";
import { useState } from "react";

const Game = () => {
    
    return (
        <div className={styles.gameContainer}>
            <div className={styles.topBar}>
                <div className={styles.timerContainer}>
                    <img src="./clock.svg" alt="timer" />
                    <div className={styles.timer}></div>
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