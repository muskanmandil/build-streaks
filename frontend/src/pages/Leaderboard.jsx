import React from 'react'
import "./CSS/Leaderboard.css"
import LeaderboardEntry from '../components/leaderboard-entry/LeaderboardEntry'

const Leaderboard = () => {
  return (

    <div className="leaderboard-container">
      <h1 className='leaderboard-heading'>🏆 Leaderboard 🏆</h1>
      <div className='leaderboard'>
      <LeaderboardEntry rank="01"/>
      <LeaderboardEntry rank="02"/>
      <LeaderboardEntry rank="03"/>
      <LeaderboardEntry rank="04"/>
      <LeaderboardEntry rank="05"/>
      <LeaderboardEntry rank="06"/>
      <LeaderboardEntry rank="07"/>
      <LeaderboardEntry rank="08"/>
      <LeaderboardEntry rank="09"/>
      <LeaderboardEntry rank="10"/>
      
    </div>

    </div>
    
  )
}

export default Leaderboard