import React, { useState, useContext, useEffect } from "react";
import "./Heatmap.css";
import { ProgressContext } from "../../context/ProgressContext";

const Heatmap = () => {
  const { progressInfo } = useContext(ProgressContext);
  const [activityCounts, setActivityCounts] = useState({});

  useEffect(() => {
    if (progressInfo?.activityData) {
      const counts = {};

      progressInfo.activityData.forEach((date) => {
        counts[date] = (counts[date] || 0) + 1;
      });

      setActivityCounts(counts);
    }
  }, [progressInfo.activityData]);

  const getIntensity = (count) => {
    if (count > 3) return "color-scale-4";
    if (count === 3) return "color-scale-3";
    if (count === 2) return "color-scale-2";
    if (count === 1) return "color-scale-1";
    return "color-empty";
  };

  const currYear = new Date().getFullYear();
  const all_months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const renderHeatmapForYear = () => {
    const yearArray = [];
    for (let month = 0; month < 12; month++) {
      const daysInMonth = new Date(currYear, month + 1, 0).getDate();
      const monthArray = Array.from({ length: daysInMonth }, (_, i) => {
        const date = new Date(currYear, month, i + 1);
        const dateStr = date
          .toLocaleString("en-IN", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          })
          .replace(/\//g, "-");
        const intensityClass = getIntensity(activityCounts[dateStr] || 0);

        return (
          <div
            key={dateStr}
            className={`heatmap-cell ${intensityClass}`}
            title={`${dateStr}: ${activityCounts[dateStr] || 0}`}
          ></div>
        );
      });

      yearArray.push(
        <div className="heatmap-month-container" key={month}>
          <div className="heatmap-month">{monthArray}</div>
          <p>{all_months[month]}</p>
        </div>
      );
    }
    return yearArray;
  };

  return (
    <div className="heatmap-container">
      <div id="heatmap">{renderHeatmapForYear()}</div>
    </div>
  );
};

export default Heatmap;
