import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Carousel
  // Import Swiper React components
  import { Swiper, SwiperSlide } from "swiper/react";

  // Import Swiper styles
  import "swiper/css";
  import "swiper/css/pagination";
  import "swiper/css/navigation";

  // import "./styles.css";

  // import required modules
  import { Pagination, Navigation } from "swiper";

// Components
import Search from '../../components/Search/Search';
import { faApple, faGooglePlay } from '@fortawesome/free-brands-svg-icons';
import { useEffect } from 'react';
import Header from '../../components/Header/Header';

export default function Home({setSelectCar}) {

  useEffect(() => {
  })

  const selectCar = 0;

  return (
    <div>
      <Header selectCar={selectCar} />

      <Search className='searchComponent'/>

      <Swiper 
          slidesPerView={1}
          spaceBetween={30}
          loop={true}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Pagination, Navigation]}
          className="mySwiper">
        <SwiperSlide><img className='carousel-img' src={require("../../assets/img/carousel/49dbc80f-3566-46f9-b294-b2fddb2fe8ae.jpeg")} alt='he'/></SwiperSlide>
        <SwiperSlide><img className='carousel-img' src={require("../../assets/img/carousel/391cd6c1-8042-4ada-bfbf-6da86c8e5527.jpeg")} alt='he'/></SwiperSlide>
        <SwiperSlide><img className='carousel-img' src={require("../../assets/img/carousel/cfc9edb1-3e28-4ecd-8de5-21425d7d29ce.jpeg")} alt='he'/></SwiperSlide>
      </Swiper>
        
        <div style={{backgroundColor: "#000", display: "flex", alignItems: "center", height: 800, padding: 100}}>
          <h2 style={{position: "absolute", color: "#FFF", top: "115vh", left: 20, zIndex: 9, fontSize: 40}} className='toUppercase'>Les agences sixt dans le monde</h2>
          <img style={{width: "100%", margin:"auto"}} src={require("../../assets/img/sixt-in-the-world.png")} alt="trouver une agence"/>
          <div className='toUppercase' style={{position: "absolute", color: "#fff", left: "85vw", top: "200vh", fontSize: 25, border: "solid 5px #fff", padding: 15}}>Trouver l'agence</div>
        </div>
        <div className='flex-center-center backgroundOrange' style={{height: 800}}>
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
