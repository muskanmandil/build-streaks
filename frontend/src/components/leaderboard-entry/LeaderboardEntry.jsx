import React, { useContext } from "react";
import "./LeaderboardEntry.css";
import streak_lit from "../../assets/streak_lit.svg";
import streak_dull from "../../assets/streak_dull.svg";
import pointsxp from "../../assets/pointsxp.svg";
import rank1st from "../../assets/rank1st.svg";
import rank2nd from "../../assets/rank2nd.svg";
import rank3rd from "../../assets/rank3rd.svg";
import { AppContext } from "../../context/AppContext";

const LeaderboardEntry = (props) => {
  const { userInfo } = useContext(AppContext);
  return (
    <div
      className={`leaderboard-entry ${
        props.email === userInfo.email ? "this-user" : null
      }`}
    >
      <p className="leaderboard-rank">
        {props.rank <= 3 ? (
          <img
            src={
              props.rank === 1
                ? rank1st
                : props.rank === 2
                ? rank2nd
                : props.rank === 3
                ? rank3rd
                : null
            }
            alt=""
          />
        ) : (
          props.rank
        )}
      </p>
      <p className="leaderboard-name">{props.name}</p>
      <p className="leaderboard-points">
        <img src={pointsxp} alt="" />
        {props.points}
      </p>
      <p className="leaderboard-streak">
        <img src={props.streak !== 0 ? streak_lit : streak_dull} alt="" />
        {props.streak}
      </p>
    </div>
  );
};

export default LeaderboardEntry;
