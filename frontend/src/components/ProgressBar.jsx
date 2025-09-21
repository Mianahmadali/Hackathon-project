import React from 'react'
import styles from './ProgressBar.module.scss'

function ProgressBar({ value }) {
  const pct = Math.max(0, Math.min(100, Math.round(value)))
  return (
    <div className={styles.progressBar} role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100}>
      <div className={styles.progressFill} style={{ width: `${pct}%` }} />
    </div>
  )
}

export default ProgressBar
