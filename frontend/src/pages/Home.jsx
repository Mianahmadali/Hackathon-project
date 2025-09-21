import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Home.module.scss';

const dummyCampaigns = [
  {
    id: 'cmp-1',
    title: 'Clean Water for Rural Villages',
    image:
      'https://images.unsplash.com/photo-1529101091764-c3526daf38fe?q=80&w=1600&auto=format&fit=crop',
    category: 'Water & Sanitation',
    ngo: 'AquaLife NGO',
    goal: 25000,
    raised: 14250,
  },
  {
    id: 'cmp-2',
    title: 'Education Kits for Kids',
    image:
      'https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=1600&auto=format&fit=crop',
    category: 'Education',
    ngo: 'BrightFuture Org',
    goal: 18000,
    raised: 9200,
  },
  {
    id: 'cmp-3',
    title: 'Emergency Relief for Flood Victims',
    image:
      'https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?q=80&w=1600&auto=format&fit=crop',
    category: 'Disaster Relief',
    ngo: 'RescueNow',
    goal: 50000,
    raised: 38780,
  },
  {
    id: 'cmp-4',
    title: 'Tree Plantation Drive',
    image:
      'https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=1600&auto=format&fit=crop',
    category: 'Environment',
    ngo: 'GreenEarth',
    goal: 12000,
    raised: 6150,
  },
  {
    id: 'cmp-5',
    title: 'Healthcare Access for All',
    image:
      'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?q=80&w=1600&auto=format&fit=crop',
    category: 'Healthcare',
    ngo: 'HealthBridge',
    goal: 30000,
    raised: 21040,
  },
  {
    id: 'cmp-6',
    title: 'Women Empowerment Workshops',
    image:
      'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1600&auto=format&fit=crop',
    category: 'Community',
    ngo: 'EmpowerHer',
    goal: 16000,
    raised: 8800,
  },
];

const formatCurrency = (n) =>
  n.toLocaleString(undefined, { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });

const calcPercent = (raised, goal) => Math.min(100, Math.round((raised / goal) * 100));

function Home() {
  return (
    <div className={styles.home}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <span className={styles.badge}>DonateHub</span>
          <h1 className={styles.title}>
            Empower change with every donation
          </h1>
          <p className={styles.subtitle}>
            A modern platform connecting donors and NGOs. Discover impactful campaigns, donate securely,
            and track the difference you make.
          </p>
          <div className={styles.ctaGroup}>
            <Link to="/campaigns" className={styles.primaryCta}>
              Explore Campaigns
            </Link>
            <Link to="/signup" className={styles.secondaryCta}>
              Start a Campaign
            </Link>
          </div>
          <ul className={styles.heroStats}>
            <li>
              <strong>1,200+</strong>
              <span>Donors</span>
            </li>
            <li>
              <strong>350+</strong>
              <span>NGOs</span>
            </li>
            <li>
              <strong>$2.4M+</strong>
              <span>Raised</span>
            </li>
          </ul>
        </div>
        <div className={styles.heroVisual} aria-hidden="true" />
      </section>

      {/* Featured Campaigns */}
      <section className={styles.campaignsSection}>
        <div className={styles.sectionHeader}>
          <h2>Featured campaigns</h2>
          <p>Handpicked initiatives that need your support right now.</p>
        </div>
        <div className={styles.grid}>
          {dummyCampaigns.map((c) => {
            const pct = calcPercent(c.raised, c.goal);
            return (
              <article key={c.id} className={styles.card}>
                <div className={styles.cardMedia}>
                  <img src={c.image} alt={c.title} loading="lazy" />
                  <span className={styles.category}>{c.category}</span>
                </div>
                <div className={styles.cardBody}>
                  <h3 className={styles.cardTitle}>{c.title}</h3>
                  <p className={styles.cardNgo}>by {c.ngo}</p>

                  <div className={styles.progressBar} role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100}>
                    <div className={styles.progressFill} style={{ width: `${pct}%` }} />
                  </div>
                  <div className={styles.progressMeta}>
                    <span className={styles.raised}>{formatCurrency(c.raised)}</span>
                    <span className={styles.goal}>of {formatCurrency(c.goal)}</span>
                  </div>

<div className={styles.cardActions}>
                    <Link className={styles.donateBtn} to={`/donate?campaign=${encodeURIComponent(c.id)}`} aria-label={`Donate to ${c.title}`}>
                      Donate
                    </Link>
                    <Link className={styles.detailsLink} to={`/campaigns/${c.id}`}>
                      Details
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* How it Works */}
      <section className={styles.howSection}>
        <div className={styles.sectionHeader}>
          <h2>How it works</h2>
          <p>From discovery to impact in three simple steps.</p>
        </div>
        <div className={styles.howGrid}>
          <div className={styles.howCard}>
            <div className={styles.howIcon} aria-hidden>
              🔎
            </div>
            <h3>Discover</h3>
            <p>Browse verified campaigns by NGOs across categories that matter to you.</p>
          </div>
          <div className={styles.howCard}>
            <div className={styles.howIcon} aria-hidden>
              🤝
            </div>
            <h3>Donate</h3>
            <p>Contribute securely with transparent goals and real-time progress.</p>
          </div>
          <div className={styles.howCard}>
            <div className={styles.howIcon} aria-hidden>
              📈
            </div>
            <h3>Track Impact</h3>
            <p>Follow updates, see outcomes, and celebrate milestones together.</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
