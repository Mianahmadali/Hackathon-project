import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import styles from './NGODashboard.module.scss'
import DashboardChart from '../components/DashboardChart'
import { Table, Button, Card, Progress, Tag, Avatar, Modal, Form, Input, Select, message, Empty } from 'antd'
import { FaPlus, FaEye, FaEdit, FaTrash, FaDonate, FaUsers, FaTrophy, FaChartLine, FaCog } from 'react-icons/fa'

const donations = [
  { label: 'Jan', value: 5400 },
  { label: 'Feb', value: 6200 },
  { label: 'Mar', value: 5800 },
  { label: 'Apr', value: 7300 },
  { label: 'May', value: 8100 },
  { label: 'Jun', value: 6900 },
]

const campaignData = [
  { 
    key: '1', 
    id: 1,
    title: 'Clean Water Initiative', 
    status: 'Active', 
    goal: 25000, 
    raised: 14250,
    donors: 125,
    category: 'Health',
    createdAt: '2024-01-01',
    description: 'Providing clean water access to rural communities',
    image: 'https://images.unsplash.com/photo-1541123437800-1bb1317badb2?w=400&h=300&fit=crop'
  },
  { 
    key: '2', 
    id: 2,
    title: 'Education for All', 
    status: 'Draft', 
    goal: 18000, 
    raised: 0,
    donors: 0,
    category: 'Education',
    createdAt: '2024-01-15',
    description: 'Supporting education initiatives in underserved areas',
    image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&h=300&fit=crop'
  },
  { 
    key: '3', 
    id: 3,
    title: 'Emergency Relief Fund', 
    status: 'Active', 
    goal: 50000, 
    raised: 38780,
    donors: 287,
    category: 'Emergency',
    createdAt: '2023-12-10',
    description: 'Emergency assistance for disaster-affected communities',
    image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=400&h=300&fit=crop'
  },
  { 
    key: '4', 
    id: 4,
    title: 'Children Healthcare', 
    status: 'Completed', 
    goal: 15000, 
    raised: 15000,
    donors: 98,
    category: 'Healthcare',
    createdAt: '2023-11-01',
    description: 'Healthcare support for underprivileged children',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&h=300&fit=crop'
  }
]

const recentDonors = [
  { name: 'John Smith', amount: 500, campaign: 'Clean Water Initiative', date: '2024-01-20' },
  { name: 'Sarah Johnson', amount: 250, campaign: 'Emergency Relief Fund', date: '2024-01-19' },
  { name: 'Mike Brown', amount: 100, campaign: 'Clean Water Initiative', date: '2024-01-18' },
  { name: 'Lisa Davis', amount: 750, campaign: 'Emergency Relief Fund', date: '2024-01-17' }
]

function NGODashboard() {
  const [user, setUser] = useState(null)
  const [activeTab, setActiveTab] = useState('overview')
  const [campaigns, setCampaigns] = useState(campaignData)
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [editingCampaign, setEditingCampaign] = useState(null)
  const [form] = Form.useForm()

  useEffect(() => {
    // Get user data from localStorage
    const userData = localStorage.getItem('user')
    if (userData) {
      setUser(JSON.parse(userData))
    }
  }, [])

  const totalRaised = campaigns.reduce((sum, campaign) => sum + campaign.raised, 0)
  const activeCampaigns = campaigns.filter(c => c.status === 'Active').length
  const totalDonors = campaigns.reduce((sum, campaign) => sum + campaign.donors, 0)
  const completedCampaigns = campaigns.filter(c => c.status === 'Completed').length

  const handleCreateCampaign = () => {
    setEditingCampaign(null)
    form.resetFields()
    setIsModalVisible(true)
  }

  const handleEditCampaign = (campaign) => {
    setEditingCampaign(campaign)
    form.setFieldsValue({
      title: campaign.title,
      goal: campaign.goal,
      category: campaign.category,
      description: campaign.description
    })
    setIsModalVisible(true)
  }

  const handleSaveCampaign = (values) => {
    if (editingCampaign) {
      // Update existing campaign
      setCampaigns(prev => 
        prev.map(c => 
          c.id === editingCampaign.id 
            ? { ...c, ...values }
            : c
        )
      )
      message.success('Campaign updated successfully!')
    } else {
      // Create new campaign
      const newCampaign = {
        key: String(campaigns.length + 1),
        id: campaigns.length + 1,
        ...values,
        status: 'Draft',
        raised: 0,
        donors: 0,
        createdAt: new Date().toISOString().split('T')[0],
        image: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=400&h=300&fit=crop'
      }
      setCampaigns(prev => [...prev, newCampaign])
      message.success('Campaign created successfully!')
    }
    setIsModalVisible(false)
  }

  const handleDeleteCampaign = (campaignId) => {
    Modal.confirm({
      title: 'Are you sure you want to delete this campaign?',
      content: 'This action cannot be undone.',
      okText: 'Yes, Delete',
      okType: 'danger',
      cancelText: 'Cancel',
      onOk() {
        setCampaigns(prev => prev.filter(c => c.id !== campaignId))
        message.success('Campaign deleted successfully')
      }
    })
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return 'green'
      case 'Draft': return 'orange'
      case 'Completed': return 'blue'
      case 'Paused': return 'red'
      default: return 'default'
    }
  }

  const campaignColumns = [
    {
      title: 'Campaign',
      dataIndex: 'title',
      key: 'title',
      render: (text, record) => (
        <div className={styles.campaignCell}>
          <img src={record.image} alt={text} className={styles.campaignImage} />
          <div>
            <div className={styles.campaignTitle}>{text}</div>
            <div className={styles.campaignCategory}>{record.category}</div>
          </div>
        </div>
      )
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => <Tag color={getStatusColor(status)}>{status}</Tag>
    },
    {
      title: 'Progress',
      key: 'progress',
      render: (record) => {
        const percentage = Math.round((record.raised / record.goal) * 100)
        return (
          <div className={styles.progressCell}>
            <Progress percent={percentage} strokeColor="#22c55e" />
            <div className={styles.progressText}>
              ${record.raised.toLocaleString()} / ${record.goal.toLocaleString()}
            </div>
          </div>
        )
      }
    },
    {
      title: 'Donors',
      dataIndex: 'donors',
      key: 'donors',
      render: (donors) => <span className={styles.donorCount}>{donors}</span>
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (record) => (
        <div className={styles.actionButtons}>
          <Button type="text" icon={<FaEye />} size="small" />
          <Button type="text" icon={<FaEdit />} size="small" onClick={() => handleEditCampaign(record)} />
          <Button type="text" icon={<FaTrash />} size="small" danger onClick={() => handleDeleteCampaign(record.id)} />
        </div>
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
              {user?.name?.charAt(0) || 'N'}
            </Avatar>
            <div>
              <h1>Welcome, {user?.name || 'NGO'}</h1>
              <p className={styles.sub}>Manage your campaigns and track donations.</p>
            </div>
          </div>
          <div className={styles.quickActions}>
            <Button type="primary" icon={<FaPlus />} size="large" onClick={handleCreateCampaign}>
              Create Campaign
            </Button>
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
            <h3>Total Raised</h3>
            <div className={styles.statValue}>${totalRaised.toLocaleString()}</div>
            <span className={styles.statLabel}>All campaigns</span>
          </div>
        </div>
        
        <div className={`${styles.statCard} ${styles.success}`}>
          <div className={styles.statIcon}>
            <FaChartLine />
          </div>
          <div className={styles.statContent}>
            <h3>Active Campaigns</h3>
            <div className={styles.statValue}>{activeCampaigns}</div>
            <span className={styles.statLabel}>Currently running</span>
          </div>
        </div>
        
        <div className={`${styles.statCard} ${styles.warning}`}>
          <div className={styles.statIcon}>
            <FaUsers />
          </div>
          <div className={styles.statContent}>
            <h3>Total Donors</h3>
            <div className={styles.statValue}>{totalDonors}</div>
            <span className={styles.statLabel}>Unique supporters</span>
          </div>
        </div>
        
        <div className={`${styles.statCard} ${styles.info}`}>
          <div className={styles.statIcon}>
            <FaTrophy />
          </div>
          <div className={styles.statContent}>
            <h3>Completed</h3>
            <div className={styles.statValue}>{completedCampaigns}</div>
            <span className={styles.statLabel}>Successful campaigns</span>
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
          className={`${styles.tabButton} ${activeTab === 'donors' ? styles.active : ''}`}
          onClick={() => setActiveTab('donors')}
        >
          Recent Donors
        </button>
      </div>

      {/* Tab Content */}
      <div className={styles.tabContent}>
        {activeTab === 'overview' && (
          <div className={styles.overviewTab}>
            {/* Charts Section */}
            <div className={styles.chartSection}>
              <Card title="Donation Trends" className={styles.chartCard}>
                <DashboardChart type="line" data={donations} />
              </Card>
            </div>

            {/* Recent Activity */}
            <div className={styles.activitySection}>
              <Card title="Recent Donors" className={styles.activityCard}>
                {recentDonors.slice(0, 4).map((donor, index) => (
                  <div key={index} className={styles.activityItem}>
                    <div className={styles.activityInfo}>
                      <h4>{donor.name}</h4>
                      <p>{donor.campaign}</p>
                    </div>
                    <div className={styles.activityAmount}>
                      ${donor.amount}
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
              <h2>Your Campaigns</h2>
              <p>Manage and track all your fundraising campaigns</p>
            </div>
            
            <Card className={styles.tableCard}>
              <Table
                dataSource={campaigns}
                columns={campaignColumns}
                pagination={{
                  pageSize: 10,
                  showSizeChanger: false,
                  showQuickJumper: true
                }}
                className={styles.campaignsTable}
              />
            </Card>
          </div>
        )}

        {activeTab === 'donors' && (
          <div className={styles.donorsTab}>
            <div className={styles.sectionHeader}>
              <h2>Recent Donors</h2>
              <p>Track your supporters and their contributions</p>
            </div>
            
            <div className={styles.donorsGrid}>
              {recentDonors.map((donor, index) => (
                <Card key={index} className={styles.donorCard}>
                  <div className={styles.donorHeader}>
                    <Avatar size={48}>{donor.name.charAt(0)}</Avatar>
                    <div>
                      <h3>{donor.name}</h3>
                      <p>{donor.date}</p>
                    </div>
                  </div>
                  <div className={styles.donorDetails}>
                    <div className={styles.donationAmount}>${donor.amount}</div>
                    <div className={styles.campaignName}>{donor.campaign}</div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Campaign Modal */}
      <Modal
        title={editingCampaign ? 'Edit Campaign' : 'Create New Campaign'}
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
        width={600}
        className={styles.campaignModal}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSaveCampaign}
          className={styles.campaignForm}
        >
          <Form.Item
            name="title"
            label="Campaign Title"
            rules={[{ required: true, message: 'Please enter a campaign title' }]}
          >
            <Input placeholder="Enter campaign title" />
          </Form.Item>
          
          <Form.Item
            name="goal"
            label="Funding Goal ($)"
            rules={[{ required: true, message: 'Please enter funding goal' }]}
          >
            <Input type="number" placeholder="Enter target amount" />
          </Form.Item>
          
          <Form.Item
            name="category"
            label="Category"
            rules={[{ required: true, message: 'Please select a category' }]}
          >
            <Select placeholder="Select category">
              <Select.Option value="Health">Health</Select.Option>
              <Select.Option value="Education">Education</Select.Option>
              <Select.Option value="Emergency">Emergency</Select.Option>
              <Select.Option value="Environment">Environment</Select.Option>
              <Select.Option value="Community">Community</Select.Option>
            </Select>
          </Form.Item>
          
          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true, message: 'Please enter a description' }]}
          >
            <Input.TextArea rows={4} placeholder="Describe your campaign" />
          </Form.Item>
          
          <div className={styles.modalActions}>
            <Button onClick={() => setIsModalVisible(false)}>
              Cancel
            </Button>
            <Button type="primary" htmlType="submit">
              {editingCampaign ? 'Update Campaign' : 'Create Campaign'}
            </Button>
          </div>
        </Form>
      </Modal>
    </div>
  )
}

export default NGODashboard
