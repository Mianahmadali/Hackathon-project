import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import styles from './DonorDashboard.module.scss'
import DashboardChart from '../components/DashboardChart'
import CampaignCard from '../components/CampaignCard'
import { Button, Table, Tag, Progress, Avatar, Card, Empty } from 'antd'
import { FaDonate, FaHeart, FaTrophy, FaPlus, FaEye, FaCalendarAlt, FaUsers } from 'react-icons/fa'

const donations = [
  { label: 'Jan', value: 1200 },
  { label: 'Feb', value: 800 },
  { label: 'Mar', value: 1600 },
  { label: 'Apr', value: 900 },
  { label: 'May', value: 2000 },
  { label: 'Jun', value: 1400 },
]

const recentDonations = [
  {
    key: '1',
    campaign: 'Clean Water Initiative',
    amount: 150,
    date: '2024-01-15',
    ngo: 'Water Aid Foundation',
    status: 'completed'
  },
  {
    key: '2', 
    campaign: 'Education for All',
    amount: 200,
    date: '2024-01-12',
    ngo: 'Learn Together NGO',
    status: 'completed'
  },
  {
    key: '3',
    campaign: 'Emergency Relief Fund',
    amount: 500,
    date: '2024-01-10',
    ngo: 'Global Relief Corp',
    status: 'processing'
  },
  {
    key: '4',
    campaign: 'Children Healthcare',
    amount: 75,
    date: '2024-01-08',
    ngo: 'Kids First Foundation',
    status: 'completed'
  }
]

const supportedCampaigns = [
  {
    id: 1,
    title: 'Clean Water Initiative',
    ngo: 'Water Aid Foundation',
    raised: 14250,
    goal: 25000,
    image: 'https://images.unsplash.com/photo-1541123437800-1bb1317badb2?w=400&h=300&fit=crop',
    category: 'Health',
    myDonation: 150
  },
  {
    id: 2,
    title: 'Education for All',
    ngo: 'Learn Together NGO', 
    raised: 8750,
    goal: 15000,
    image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&h=300&fit=crop',
    category: 'Education',
    myDonation: 200
  },
  {
    id: 3,
    title: 'Emergency Relief Fund',
    ngo: 'Global Relief Corp',
    raised: 38750,
    goal: 50000,
    image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=400&h=300&fit=crop',
    category: 'Emergency',
    myDonation: 500
  }
]

function DonorDashboard() {
  const [user, setUser] = useState(null)
  const [activeTab, setActiveTab] = useState('overview')

  useEffect(() => {
    // Get user data from localStorage
    const userData = localStorage.getItem('user')
    if (userData) {
      setUser(JSON.parse(userData))
    }
  }, [])

  const totalDonated = donations.reduce((a, b) => a + b.value, 0)
  const totalCampaigns = supportedCampaigns.length
  const totalImpact = supportedCampaigns.reduce((sum, campaign) => sum + campaign.myDonation, 0)

  const donationColumns = [
    {
      title: 'Campaign',
      dataIndex: 'campaign',
      key: 'campaign',
      render: (text) => <span className={styles.campaignName}>{text}</span>
    },
    {
      title: 'NGO',
      dataIndex: 'ngo',
      key: 'ngo'
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      render: (amount) => <span className={styles.amount}>${amount}</span>
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date'
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag color={status === 'completed' ? 'green' : 'orange'}>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </Tag>
      )
    }
  ]

  return (
    <div className={styles.page}>
      {/* Header Section */}
      <div className={styles.header}>
        <div className={styles.welcomeSection}>
          <div className={styles.userInfo}>
            <Avatar size={64} className={styles.avatar}>
              {user?.name?.charAt(0) || 'U'}
            </Avatar>
            <div>
              <h1>Welcome back, {user?.name || 'Donor'}!</h1>
              <p className={styles.sub}>Track your impact and support more causes.</p>
            </div>
          </div>
          <div className={styles.quickActions}>
            <Link to="/campaigns">
              <Button type="primary" icon={<FaPlus />} size="large">
                Find Campaigns
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className={styles.statsGrid}>
        <div className={`${styles.statCard} ${styles.primary}`}>
          <div className={styles.statIcon}>
            <FaDonate />
          </div>
          <div className={styles.statContent}>
            <h3>Total Donated</h3>
            <div className={styles.statValue}>${totalDonated.toLocaleString()}</div>
            <span className={styles.statLabel}>This year</span>
          </div>
        </div>
        
        <div className={`${styles.statCard} ${styles.success}`}>
          <div className={styles.statIcon}>
            <FaHeart />
          </div>
          <div className={styles.statContent}>
            <h3>Campaigns Supported</h3>
            <div className={styles.statValue}>{totalCampaigns}</div>
            <span className={styles.statLabel}>Active campaigns</span>
          </div>
        </div>
        
        <div className={`${styles.statCard} ${styles.warning}`}>
          <div className={styles.statIcon}>
            <FaTrophy />
          </div>
          <div className={styles.statContent}>
            <h3>Impact Score</h3>
            <div className={styles.statValue}>{Math.round(totalImpact / 10)}</div>
            <span className={styles.statLabel}>Based on donations</span>
          </div>
        </div>
        
        <div className={`${styles.statCard} ${styles.info}`}>
          <div className={styles.statIcon}>
            <FaUsers />
          </div>
          <div className={styles.statContent}>
            <h3>Lives Impacted</h3>
            <div className={styles.statValue}>{Math.round(totalImpact / 5)}</div>
            <span className={styles.statLabel}>Estimated reach</span>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className={styles.tabNavigation}>
        <button 
          className={`${styles.tabButton} ${activeTab === 'overview' ? styles.active : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          Overview
        </button>
        <button 
          className={`${styles.tabButton} ${activeTab === 'campaigns' ? styles.active : ''}`}
          onClick={() => setActiveTab('campaigns')}
        >
          My Campaigns
        </button>
        <button 
          className={`${styles.tabButton} ${activeTab === 'history' ? styles.active : ''}`}
          onClick={() => setActiveTab('history')}
        >
          Donation History
        </button>
      </div>

      {/* Tab Content */}
      <div className={styles.tabContent}>
        {activeTab === 'overview' && (
          <div className={styles.overviewTab}>
            {/* Charts Section */}
            <div className={styles.chartSection}>
              <Card title="Donation Trends" className={styles.chartCard}>
                <DashboardChart type="area" data={donations} />
              </Card>
            </div>

            {/* Recent Activity */}
            <div className={styles.activitySection}>
              <Card title="Recent Donations" className={styles.activityCard}>
                {recentDonations.slice(0, 3).map(donation => (
                  <div key={donation.key} className={styles.activityItem}>
                    <div className={styles.activityInfo}>
                      <h4>{donation.campaign}</h4>
                      <p>{donation.ngo}</p>
                    </div>
                    <div className={styles.activityAmount}>
                      ${donation.amount}
                    </div>
                  </div>
                ))}
              </Card>
            </div>
          </div>
        )}

        {activeTab === 'campaigns' && (
          <div className={styles.campaignsTab}>
            <div className={styles.sectionHeader}>
              <h2>Your Supported Campaigns</h2>
              <p>Track the progress of campaigns you've contributed to</p>
            </div>
            
            <div className={styles.campaignsGrid}>
              {supportedCampaigns.length > 0 ? (
                supportedCampaigns.map(campaign => (
                  <div key={campaign.id} className={styles.campaignCard}>
                    <div className={styles.campaignImage}>
                      <img src={campaign.image} alt={campaign.title} />
                      <div className={styles.categoryBadge}>{campaign.category}</div>
                    </div>
                    <div className={styles.campaignContent}>
                      <h3>{campaign.title}</h3>
                      <p className={styles.ngoName}>{campaign.ngo}</p>
                      
                      <div className={styles.progressSection}>
                        <Progress 
                          percent={Math.round((campaign.raised / campaign.goal) * 100)} 
                          strokeColor="#22c55e"
                        />
                        <div className={styles.progressInfo}>
                          <span>${campaign.raised.toLocaleString()} raised</span>
                          <span>Goal: ${campaign.goal.toLocaleString()}</span>
                        </div>
                      </div>
                      
                      <div className={styles.myContribution}>
                        <span>Your contribution: <strong>${campaign.myDonation}</strong></span>
                      </div>
                      
                      <div className={styles.campaignActions}>
                        <Button type="outline" icon={<FaEye />}>
                          View Details
                        </Button>
<Link to="/donate">
                          <Button type="primary" icon={<FaDonate />}>
                            Donate More
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <Empty description="No campaigns supported yet" />
              )}
            </div>
          </div>
        )}

        {activeTab === 'history' && (
          <div className={styles.historyTab}>
            <div className={styles.sectionHeader}>
              <h2>Donation History</h2>
              <p>Complete record of all your donations</p>
            </div>
            
            <Card className={styles.tableCard}>
              <Table
                dataSource={recentDonations}
                columns={donationColumns}
                pagination={{
                  pageSize: 10,
                  showSizeChanger: false,
                  showQuickJumper: true
                }}
                className={styles.donationsTable}
              />
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}

export default DonorDashboard
