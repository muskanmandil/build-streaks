import React from "react";
import "./LeaderboardEntry.css";
import streak from "../../assets/streak.svg";
import gold_trophy from "../../assets/gold_trophy.svg";
import silver_trophy from "../../assets/silver_trophy.svg";
import bronze_trophy from "../../assets/bronze_trophy.svg";

const LeaderboardEntry = ({ rank }) => {
  return (
    <div className="leaderboard-entry">
      <p className="leaderboard-rank">
        {rank === "01" || rank === "02" || rank === "03" ? (
          <img
            src={
              rank === "01"
                ? gold_trophy
                : rank === "02"
                ? silver_trophy
                : rank === "03"
                ? bronze_trophy
                : null
            }
            alt=""
          />
        ) : (
          rank
        )}
      </p>
      <p className="leaderboard-name">Name</p>
      <p className="leaderboard-points">1000</p>
      <p className="leaderboard-streak">
        <img src={streak} alt="" />
        100
      </p>
    </div>
  );
};

export default LeaderboardEntry;
