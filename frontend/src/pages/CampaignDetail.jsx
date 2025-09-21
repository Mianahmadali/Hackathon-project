import React from 'react'
import { useParams, Link } from 'react-router-dom'
import styles from './CampaignDetail.module.scss'
import ProgressBar from '../components/ProgressBar'

const campaigns = {
  '1': { id: '1', title: 'Clean Water for Rural Villages', ngo: 'AquaLife NGO', category: 'Water', image: 'https://images.unsplash.com/photo-1529101091764-c3526daf38fe?q=80&w=1600&auto=format&fit=crop', goal: 25000, raised: 14250, description: 'Provide clean water access by building wells and filtration systems in rural areas.' },
}

function CampaignDetail() {
  const { id } = useParams()

  const data = campaigns[id] || Object.values(campaigns)[0]
  const pct = Math.round((data.raised / data.goal) * 100)

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <img src={data.image} alt={data.title} />
        <div className={styles.meta}>
          <h1>{data.title}</h1>
          <p className={styles.ngo}>by {data.ngo} • {data.category}</p>
          <p className={styles.desc}>{data.description}</p>
          <ProgressBar value={pct} />
          <div className={styles.progressMeta}>
            <span><strong>${data.raised.toLocaleString()}</strong> raised</span>
            <span>of ${data.goal.toLocaleString()}</span>
          </div>
          <div className={styles.actions}>
            <Link to={`/donate?campaign=${encodeURIComponent(data.id)}`} className={styles.donateLink}>
              Donate
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CampaignDetail
