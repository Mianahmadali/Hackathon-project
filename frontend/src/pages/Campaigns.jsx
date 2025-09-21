import React, { useMemo, useState } from 'react'
import styles from './Campaigns.module.scss'
import CampaignCard from '../components/CampaignCard'
import { Input, Select } from 'antd'

const allCampaigns = [
  { id: '1', title: 'Clean Water for Rural Villages', ngo: 'AquaLife NGO', category: 'Water', image: 'https://images.unsplash.com/photo-1529101091764-c3526daf38fe?q=80&w=1600&auto=format&fit=crop', goal: 25000, raised: 14250 },
  { id: '2', title: 'Education Kits for Kids', ngo: 'BrightFuture Org', category: 'Education', image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=1600&auto=format&fit=crop', goal: 18000, raised: 9200 },
  { id: '3', title: 'Emergency Relief for Flood Victims', ngo: 'RescueNow', category: 'Relief', image: 'https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?q=80&w=1600&auto=format&fit=crop', goal: 50000, raised: 38780 },
  { id: '4', title: 'Tree Plantation Drive', ngo: 'GreenEarth', category: 'Environment', image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=1600&auto=format&fit=crop', goal: 12000, raised: 6150 },
  { id: '5', title: 'Healthcare Access for All', ngo: 'HealthBridge', category: 'Healthcare', image: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?q=80&w=1600&auto=format&fit=crop', goal: 30000, raised: 21040 },
  { id: '6', title: 'Women Empowerment Workshops', ngo: 'EmpowerHer', category: 'Community', image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1600&auto=format&fit=crop', goal: 16000, raised: 8800 },
]

function Campaigns() {
  const [q, setQ] = useState('')
  const [cat, setCat] = useState('All')

  const categories = useMemo(() => ['All', ...Array.from(new Set(allCampaigns.map(c => c.category)))], [])

  const filtered = useMemo(() => {
    return allCampaigns.filter(c => {
      const matchQ = [c.title, c.ngo, c.category].join(' ').toLowerCase().includes(q.toLowerCase())
      const matchCat = cat === 'All' || c.category === cat
      return matchQ && matchCat
    })
  }, [q, cat])

  return (
    <div className={styles.page}>
      <div className={styles.header}> 
        <h1>Find a cause to support</h1>
        <p>Search across verified NGO campaigns. Filter by category to narrow results.</p>
        <div className={styles.controls}>
          <Input.Search placeholder="Search campaigns..." allowClear onChange={(e) => setQ(e.target.value)} className={styles.search} />
          <Select value={cat} onChange={setCat} options={categories.map(c => ({ value: c, label: c }))} className={styles.select} />
        </div>
      </div>
      <div className={styles.grid}>
        {filtered.map(c => (
          <CampaignCard key={c.id} {...c} />
        ))}
      </div>
    </div>
  )
}

export default Campaigns
