// src/components/home/StatsCard.jsx
import React from 'react'
import '../../pages/landing/home.css'

const StatsCard = ({ title, value, subtitle }) => {
  return (
    <div className="stats-card">
      <div className="stats-value">{value}</div>
      <div className="stats-title">{title}</div>
      {subtitle && <div className="stats-sub">{subtitle}</div>}
    </div>
  )
}

export default StatsCard
