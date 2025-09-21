import React from 'react'
import styles from './Footer.module.scss'

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.brand}>DonateHub</div>
        <p className={styles.copy}>© {new Date().getFullYear()} DonateHub. All rights reserved.</p>
      </div>
    </footer>
  )
}

export default Footer
