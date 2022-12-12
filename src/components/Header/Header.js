import React from 'react'
import logo from '../../assets/img/sixt-logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { fal } from '@fortawesome/free-brands-svg-icons';
import { faGlobe } from '@fortawesome/free-solid-svg-icons'

export default function Header() {
  return (
    <header>
      <nav className='flex-center-between'>
        <div className='flex-center-between'>
          <img src={logo} style={{width: 164}} alt="logo" />
          <div>Rent</div>
          <div>Share</div>
          <div>Ride</div>
          <div>Sixt+ <small>abonnement auto</small></div>
        </div>
        <div className='flex-center-between'>
          <div><FontAwesomeIcon icon={faGlobe} /></div>
          <div>backoffice</div>
        </div>
      </nav>
    </header>
  )
}
