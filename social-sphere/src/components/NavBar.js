import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/NavBar.css';
import { FaBars, FaTimes, FaHome, FaRegEnvelope, FaBell, FaUser, FaRegThumbsDown, FaRegThumbsUp } from 'react-icons/fa';
import { IconContext } from 'react-icons/lib';

function NavBar() {

  const [navBackground, setNavBackground] = useState('navbar')
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setNavBackground('navbar-scrolled')
      } else {
        setNavBackground('navbar')
      }
    }
    document.addEventListener('scroll', handleScroll)
    return () => {
      document.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  return (
    <>
      <IconContext.Provider value={{ color: '#fff' }}>
        <nav className={navBackground}>
          <div className='navbar-container container'>
            <Link to='/' className='navbar-logo' onClick={closeMobileMenu}>
                <FaRegThumbsDown/> &nbsp; Social Sphere &nbsp; <FaRegThumbsUp/>
            </Link>
            <div className='menu-icon' onClick={handleClick}>
              {click ? <FaTimes /> : <FaBars />}
            </div>
            <ul className={click ? 'nav-menu active' : 'nav-menu'}>
              <li className='nav-item'>
                <Link
                  to='/'
                  className='nav-links'
                  onClick={closeMobileMenu}
                >
                  <FaHome/>
                </Link>
              </li>
              <li className='nav-item'>
                <Link
                  to='/messages'
                  className='nav-links'
                  onClick={closeMobileMenu}
                >
                  <FaRegEnvelope/>
                </Link>
              </li>
              <li className='nav-item'>
                <Link
                  to='/notifications'
                  className='nav-links'
                  onClick={closeMobileMenu}
                >
                  <FaBell/>
                </Link>
              </li>
              <li className='nav-item'>
                <Link
                  to='/profile'
                  className='nav-links'
                  onClick={closeMobileMenu}
                >
                  <FaUser/>
                </Link>
              </li>
              <li className='nav-item'>
                <Link
                  to='/'
                  className='nav-links'
                  onClick={closeMobileMenu}
                >
                  Logout
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </IconContext.Provider>
    </>
  );
}

export default NavBar;