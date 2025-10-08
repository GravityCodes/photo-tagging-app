import Welcome from "./pages/Welcome";
import Game from "./pages/Game";
import Leaderboard from "./pages/Leaderboard";

const routes = [
  {
    path: "/",
    element: <Welcome />,
  },
  {
    path: "/game",
    element: <Game />,
  },
  {
    path: "/leaderboard",
    element: <Leaderboard />,
  },
];

export default routes;
