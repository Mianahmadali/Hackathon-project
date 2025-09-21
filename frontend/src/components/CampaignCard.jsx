import React from 'react'
import { Link } from 'react-router-dom'
import styles from './CampaignCard.module.scss'

const formatCurrency = (n) => n.toLocaleString(undefined, { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })

function CampaignCard({ id, title, ngo, image, category, raised, goal, onDonate, to }) {
  const pct = Math.min(100, Math.round((raised / goal) * 100))
  const donateLink = `/donate?campaign=${encodeURIComponent(id)}`
  return (
    <article className={styles.card}>
      <a href={to ?? `/campaigns/${id}`} className={styles.cardMedia}>
        <img src={image} alt={title} loading="lazy" />
        <span className={styles.category}>{category}</span>
      </a>
      <div className={styles.cardBody}>
        <h3 className={styles.cardTitle}>{title}</h3>
        <p className={styles.cardNgo}>by {ngo}</p>
        <div className={styles.progressBar} role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100}>
          <div className={styles.progressFill} style={{ width: `${pct}%` }} />
        </div>
        <div className={styles.progressMeta}>
          <span className={styles.raised}>{formatCurrency(raised)}</span>
          <span className={styles.goal}>of {formatCurrency(goal)}</span>
        </div>
        <div className={styles.cardActions}>
          {onDonate ? (
            <button className={styles.donateBtn} onClick={onDonate}>Donate</button>
          ) : (
            <Link className={styles.donateBtn} to={donateLink}>Donate</Link>
          )}
          <a className={styles.detailsLink} href={to ?? `/campaigns/${id}`}>Details</a>
        </div>
      </div>
    </article>
  )
}

export default CampaignCard
