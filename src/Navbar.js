import React, { useEffect, useState } from 'react'
import logo from './img/logo.png'
import avatar from './img/avatar.png'
import './Navbar.css'

const Navbar = () => {

  const [show, handleShow] = useState(false)

  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 100) {
        handleShow(true)
      } else handleShow(false)
      return () => {
        window.removeEventListener('scroll')
      }
    })
  }, [])

  return (
    <nav className={`nav ${show && 'nav--black'}`}>
      <img className='nav__logo' src={logo} alt="Netflix Logo" />
      <img className='nav__avatar' src={avatar} alt="Netflix Avatar Icon" />
    </nav>
  )
}

export default Navbar
