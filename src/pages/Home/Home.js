import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';

// Components
import Search from '../../components/Search/Search';
import { faApple, faGooglePlay } from '@fortawesome/free-brands-svg-icons';

const handleDragStart = (e) => e.preventDefault();

const items = [
  <img className='carousel-img' src={require("/Users/michelgermanotti/LeReacteur/Projects/Sixt/sixt-frontend/src/assets/img/carousel/49dbc80f-3566-46f9-b294-b2fddb2fe8ae.jpeg")} onDragStart={handleDragStart} role="presentation" alt='he'/>,
  <img className='carousel-img' src={require("/Users/michelgermanotti/LeReacteur/Projects/Sixt/sixt-frontend/src/assets/img/carousel/391cd6c1-8042-4ada-bfbf-6da86c8e5527.jpeg")} onDragStart={handleDragStart} role="presentation" alt='he'/>,
  <img className='carousel-img' src={require("/Users/michelgermanotti/LeReacteur/Projects/Sixt/sixt-frontend/src/assets/img/carousel/cfc9edb1-3e28-4ecd-8de5-21425d7d29ce.jpeg")} onDragStart={handleDragStart} role="presentation" alt='he'/>,
];

export default function Home() {

  return (
    <div>
      <Search />
      <AliceCarousel 
        disableDotsControls
        disableButtonsControls
        autoPlayControls={false}
        mouseTracking={true}
        items={items}
        autoPlay={true}
        infinite={true}
        animationDuration={3000}
        autoPlayStrategy={"all"}/>
        
        <div style={{backgroundColor: "#000", display: "flex", alignItems: "center", height: 800, padding: 100}}>
          <h2 style={{position: "absolute", color: "#FFF", top: "135vh", left: 20, zIndex: 9, fontSize: 40}} className='toUppercase'>Les agences sixt dans le monde</h2>
          <img style={{width: "100%", margin:"auto"}} src={require("/Users/michelgermanotti/LeReacteur/Projects/Sixt/sixt-frontend/src/assets/img/sixt-in-the-world.png")} alt="trouver une agence"/>
          <div className='toUppercase' style={{position: "absolute", color: "#fff", left: "85vw", top: "200vh", fontSize: 25, border: "solid 5px #fff", padding: 15}}>Trouver l'agence</div>
        </div>
        <div className='flex-center-center' style={{backgroundColor: "#ff5f00", height: 800}}>
          <div className='toUppercase' style={{fontSize: 25, fontWeight: 900}}>Téléchargez l'app Sixt</div>
          <div className='flex-center-between' style={{gap: 40}}>
            <div style={{display: "flex", justifyContent: "space-around", alignItems: "center", fontSize: 30, border: "solid #000 3px", borderRadius: 5, padding: "10px 30px", width: 200}}><FontAwesomeIcon icon={faApple} style={{fontSize: 40}} />App store</div>
            <div style={{display: "flex", justifyContent: "space-around", alignItems: "center", fontSize: 30, border: "solid #000 3px", borderRadius: 5, padding: "10px 30px", width: 200}}><FontAwesomeIcon icon={faGooglePlay} style={{fontSize: 40}}/>Google Play</div>
          </div>
          <div className='toUppercase'>Suivez-nous</div>
          <div>Logos</div>
        </div>
    </div>
  )
}
