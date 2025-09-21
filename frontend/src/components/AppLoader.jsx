import React from 'react'
import styles from './AppLoader.module.scss'

function AppLoader() {
  return (
    <div className={styles.overlay} role="status" aria-live="polite" aria-label="Loading application">
      <div className={styles.loaderWrap}>
        <div className={styles.spinner} />
        <div className={styles.brand}>DonateHub</div>
        <div className={styles.hint}>Preparing your experience…</div>
      </div>
    </div>
  )
}

export default AppLoader