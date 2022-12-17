import logo from '../../assets/img/sixt-logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { fal } from '@fortawesome/free-brands-svg-icons';
import { faGlobe } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';

export default function Header({selectCar , setSelectCar}) {

  console.log(selectCar);

  return selectCar === 0 ? (
    <header>
      <nav className='flex-center-between'>
        <div className='flex-center-between'>
          <Link to="/" ><img onClick={() => setSelectCar(0)} src={logo} style={{width: 164}} alt="logo" /></Link>
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
  ) : (
    <header>
    <nav className='flex-center-between'>
      <div className='flex-center-between'>
        <Link to="/"><img src={logo} style={{width: 164}} alt="logo" /></Link>       
      </div>
      
      {/* Étapes de la réservation */}
      <div className='flex-center-between'>
        <div className='toUppercase flex-center-between' style={{flexWrap: "wrap"}}>
          <div><span className='numbersOn'>1</span></div> 
          <div className='textOn'>Sélection des véhicules</div>
        </div>
        <div className='toUppercase flex-center-between' style={{flexWrap: "wrap"}}>
          <div><span className={selectCar > 1 ? 'numbersOn' : 'numbersOff'}>2</span></div> 
          <div className={selectCar > 1 ? 'textOn' : 'textOff'}>Protections et options</div></div>
        <div className='toUppercase flex-center-between' style={{flexWrap: "wrap"}}>
          <div><span className={selectCar > 2 ? 'numbersOn' : 'numbersOff'}>3</span></div> 
          <div className={selectCar > 2 ? 'textOn' : 'textOff'}>Conducteur</div>
        </div>   
      </div>

      
      <div className='flex-center-between'>
          <div><FontAwesomeIcon icon={faGlobe} /></div>
          <div className='toUppercase'>backoffice</div>
        </div>
    </nav>
  </header>
  )
}
