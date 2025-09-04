import React from 'react'

export default function ProgressBar({ current, total }) {
  const pct = Math.round((current / total) * 100)
  return (
    <div className="progress">
      <div className="progress-inner" style={{ width: pct + '%' }} />
      <span className="progress-label">Question {current} of {total}</span>
    </div>
  )
}
