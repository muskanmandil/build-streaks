import React from "react";
import "./Loading.css";

const Loading = () => {
  return (
    <div className="loading-container">
      <script
        src="https://unpkg.com/@dotlottie/player-component@latest/dist/dotlottie-player.mjs"
        type="module"
      ></script>

      <div className="loading">
        <dotlottie-player
          src="https://lottie.host/b3082b54-8676-40c1-9d05-16227b8e762f/lftuCYj2XX.json"
          background="transparent"
          speed="1"
          loop
          autoplay
        ></dotlottie-player>
      </div>
    </div>
  );
};

export default Loading;
