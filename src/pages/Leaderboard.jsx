import { useEffect, useState } from "react";
import styles from "./leaderboard.module.css";
import { Link } from "react-router";

const Leaderboard = () => {
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const request = await fetch(import.meta.env.VITE_LEADERBOARD);

        if (!request.ok) {
          throw new Error("A server error has occured");
        }

        const leaderboardData = await request.json();

        setLeaderboardData(leaderboardData);
        setLoading(false);
      } catch (error) {
        setError(error);
        console.error("An error has occured while fetching the date:", error);
      }
    };

    fetchData();
  }, []);

  function formatDuration(seconds) {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;

    return `${m}:${s.toString().padStart(2, "0")}`;
  }

  if (error) {
    return <div>An error has occured, {error}</div>;
  }

  if (loading) {
    return (
      <div className={styles.loadingScreen}>
        <span className={styles.loadingIcon}></span>
        <p>Loading..</p>
      </div>
    );
  }
  //player place
  let count = 1;

  return (
    <>
      <div className={styles.container}>
        <h1>Leaderboard</h1>
        <table>
          <thead>
            <tr>
              <th scope="col">Rank</th>
              <th scope="col">Name</th>
              <th scope="col">Time</th>
            </tr>
          </thead>
          <tbody>
            {leaderboardData.length > 0 &&
              leaderboardData.map((player) => {
                return (
                  <tr key={player.id}>
                    <td>{count++}</td>
                    <td>{player.name}</td>
                    <td>{formatDuration(player.time)}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
        <Link to="/">
          <button>Back</button>
        </Link>
      </div>
    </>
  );
};

export default Leaderboard;
