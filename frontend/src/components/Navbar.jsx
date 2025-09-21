import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { FaHandsHelping, FaRegUser, FaSignInAlt, FaBars, FaTimes } from 'react-icons/fa'
import styles from './Navbar.module.scss'

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)
  const closeMenu = () => setIsMenuOpen(false)

  return (
    <header className={styles.navbar}>
      <div className={styles.inner}> 
        <NavLink to="/" className={styles.brand}>
          <FaHandsHelping />
          <span>DonateHub</span>
        </NavLink>
        
        {/* Desktop Navigation */}
        <nav className={styles.links} aria-label="Primary">
          <NavLink to="/campaigns" className={({ isActive }) => isActive ? styles.active : undefined}>Campaigns</NavLink>
          <NavLink to="/dashboard/donor" className={({ isActive }) => isActive ? styles.active : undefined}>Donor</NavLink>
          <NavLink to="/dashboard/ngo" className={({ isActive }) => isActive ? styles.active : undefined}>NGO</NavLink>
        </nav>
        
        <div className={styles.actions}>
          <NavLink to="/login" className={styles.login}><FaSignInAlt /> <span className={styles.actionText}>Login</span></NavLink>
          <NavLink to="/signup" className={styles.signup}><FaRegUser /> <span className={styles.actionText}>Sign up</span></NavLink>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className={styles.menuButton}
          onClick={toggleMenu}
          aria-label="Toggle menu"
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Navigation */}
      <div className={`${styles.mobileMenu} ${isMenuOpen ? styles.mobileMenuOpen : ''}`}>
        <nav className={styles.mobileLinks}>
          <NavLink to="/campaigns" onClick={closeMenu}>Campaigns</NavLink>
          <NavLink to="/dashboard/donor" onClick={closeMenu}>Donor Dashboard</NavLink>
          <NavLink to="/dashboard/ngo" onClick={closeMenu}>NGO Dashboard</NavLink>
          <NavLink to="/login" onClick={closeMenu}><FaSignInAlt /> Login</NavLink>
          <NavLink to="/signup" onClick={closeMenu}><FaRegUser /> Sign up</NavLink>
        </nav>
      </div>
    </header>
  )
}

export default Navbar
