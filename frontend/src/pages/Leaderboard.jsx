import React, { useContext } from "react";
import "./CSS/Leaderboard.css";
import LeaderboardEntry from "../components/leaderboard-entry/LeaderboardEntry";
import { AppContext } from "../context/AppContext";

const Leaderboard = () => {
  const { leaderboard } = useContext(AppContext);
  return (
    <div className="leaderboard-container">
      <h1 className="leaderboard-heading">Leaderboard</h1>
      <div className="leaderboard">
        {leaderboard.map((user) => {
          return (
            <LeaderboardEntry
              key={user.email}
              email={user.email}
              rank={user.rank}
              name={user.name}
              points={user.points}
              streak={user.streak}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Leaderboard;
