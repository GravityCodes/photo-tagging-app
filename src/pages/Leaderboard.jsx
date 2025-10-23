import { useEffect, useState } from "react";
import styles from "./leaderboard.module.css";

const Leaderboard = () => {

  const [leaderboardData, setLeaderboardData ] = useState([]);

  useEffect(() => {
    const fetchData = async() => {
      try{
        const request = await fetch(import.meta.env.VITE_LEADERBOARD);

        if(!request.ok) {
          throw new Error("A server error has occured");
        }

        const leaderboardData = await request.json();

        setLeaderboardData(leaderboardData);

      }catch(error){
        console.error("An error has occured while fetching the date:", error);
      }
    }

    fetchData();

  },[]);

  function formatDuration(seconds) {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
   
    return `${m}:${s.toString().padStart(2, "0")}`;
  }

  return <>
    <div className={styles.container}>
      <h1>Leaderboard</h1>
      <table>
        <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Time</th>
            </tr>
        </thead>
        <tbody>
            {leaderboardData.length > 0 && leaderboardData.map(player => {
                return <tr key={player.id}>
                    <td>{player.name}</td>
                    <td>{formatDuration(player.time)}</td>
                </tr>})}
        </tbody>
      </table>
    </div>
  </>
};

export default Leaderboard;
