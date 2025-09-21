import React from 'react'
import { Routes, Route, NavLink } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Campaigns from './pages/Campaigns'
import CampaignDetail from './pages/CampaignDetail'
import DonorDashboard from './pages/DonorDashboard'
import NGODashboard from './pages/NGODashboard'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Donate from './pages/Donate'

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/campaigns" element={<Campaigns />} />
        <Route path="/campaigns/:id" element={<CampaignDetail />} />
        <Route path="/donate" element={<Donate />} />
        <Route path="/dashboard/donor" element={<DonorDashboard />} />
        <Route path="/dashboard/ngo" element={<NGODashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="*" element={<div style={{ padding: '2rem' }}>Not Found</div>} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
