import React from 'react'
import logo from '../../assets/img/sixt-logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { fal } from '@fortawesome/free-brands-svg-icons';
import { faGlobe } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header>
      <nav className='flex-center-between'>
        <div className='flex-center-between'>
          <Link to="/"><img src={logo} style={{width: 164}} alt="logo" /></Link>
          <div className='toUppercase'>Rent</div>
          <div className='toUppercase'>Share</div>
          <div className='toUppercase'>Ride</div>
          <div className='toUppercase'>Sixt+ <small>abonnement auto</small></div>
        </div>
        <div className='flex-center-between'>
          <div><FontAwesomeIcon icon={faGlobe} /></div>
          <div className='toUppercase'>backoffice</div>
        </div>
      </nav>
    </header>
  )
}
