import { faCheck, faEuroSign } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import Cookies from 'js-cookie'
import React, { useEffect, useState } from 'react'
import Search from '../../components/Search/Search'

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
  import { useNavigate } from 'react-router-dom';


export default function Offerconfig({setSelectCar}) {

  const navigate = useNavigate();

  // States
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  // Total des options
  const [totalConfig, setTotalConfig] = useState(Cookies.get("totalSansOptions"));

  // Afficher toutes les options
  const [allOptions, setAllOptions] = useState(false);
  const [isActive, setIsActive] = useState(false);

  // Modal
  // const [display, setDisplay] = useState("none");


  useEffect(() => {
    const getData = async ()  => {
      setSelectCar(2);
      try {
        const response = await axios.post("https://site--sixt-backend--pb6rn2qrqzj6.code.run/rentalconfigurations/create", { offerId :Cookies.get("sélectionLocationId")});
        // const response = await axios.post("http://localhost:4000/rentalconfigurations/create", { offerId :Cookies.get("sélectionLocationId")});
        console.log(response.data);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, [])


  // Etat des options
  const handleClick = (price, event) => {
      let nb = Number(Cookies.get("totalSansOptions"));

    if (!isActive) {

      // Toggle of class
      event.currentTarget.classList.remove('optionsCards');
      event.currentTarget.classList.add('optionsCardsSelect');
      
      // add price
      Cookies.set("totalSansOptions", nb + price);
      setTotalConfig(nb + price);
      setIsActive(true);
    } else{
      
      // Toggle of class
      event.currentTarget.classList.remove('optionsCardsSelect');
      event.currentTarget.classList.add('optionsCards');
      
      // remove price
      Cookies.set("totalSansOptions", nb - price);
      setTotalConfig(nb - price);
      setIsActive(false);
    } 
    
  }


  return isLoading ? <p>Loading... </p> : (
    <div> 
      <Search />

      {/* Modal détail du prix */}
      {/* <div style={{display : display}}>
        <h2 className="toUppercase">Détails du prix</h2>
        <h3 className="toUppercase">Période de location</h3>
        <h3 className="toUppercase">Protection et options</h3>
        <h3 className="toUppercase">Frais</h3>
        <h3 className="toUppercase">Total</h3>
      </div> */}

      {/* Content */}
      <div className='flex-center-between'>
        {/* Titre */}
        <h2 className='car-description toUppercase' style={{position: "absolute", top: "35vh", left: "2vw"}}><span>{Cookies.get("model")}</span></h2>
        
          {/* Carousel */}
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
              {/* Images */}
                {data.splashImages.map((image, index) => <SwiperSlide key={index}><img style={{width: "100%"}}src={image} alt="ff"/></SwiperSlide>)}
            </Swiper>
        </div>
          
          {/* Baseline */}
        <div className='subline'>
          <h3 className='toUppercase'>{Cookies.get("subline")}</h3>
        </div>
          
          {/* Choisissez votre protection */}
        <div className='backgroundOrange flex-space-between'>
          
          {/* Left */}
          <div>
                
              <h2 className='toUppercase'>Choisissez votre protection et vos options</h2>
              <h3 className='toUppercase'>Votre offre inclut</h3>
              <div>
                {data.includedCharges.map((item, index) => <p key={index}><FontAwesomeIcon icon={faCheck} />{item.title}</p>)}
              </div>
            
              {/* Choisissez vos options */}
              <div>
                <h2 className='toUppercase'>Choisissez vos options</h2>
              </div>
          
                {/* Options */}
              <div className='optionsCardsContainer'>

                  {data.additionalCharges.map((item, index) => {
                    return <div>
                      {
                        !allOptions ?
                        // 5 options max
                        index < 5 &&
                        <div className='optionsCards'  onClick={(event) =>  handleClick(item.price.amount, event)}>
                            
                          <div>
                            <h3 className='toUppercase'>{item.title}</h3>
                            <p>{item.description}</p></div>
                            <p><FontAwesomeIcon icon={faEuroSign} /> {item.price.amount} {item.price.unit} </p>
                        </div>
                        :   
                        // Toutes les options
                        <div className='optionsCards' onClick={(event) =>  handleClick(item.price.amount, event)}>
                          <div>
                            <h3 className='toUppercase'>{item.title}</h3>
                            <p>{item.description}</p></div>
                            <p><FontAwesomeIcon icon={faEuroSign} /> {item.price.amount} {item.price.unit} </p>
                        </div>
                    }              
                    </div>
                    }
                  )}
                <div className='moreOptions'>
                  {/* J'affiche le reste des options */}
                  { 
                    !allOptions ? <div className='toUppercase' onClick={() => setAllOptions(true)}><span style={{textAlign: "center", fontSize: 45}}>+ <br /></span>Voir plus d'options</div> : 
                     <div className='toUppercase' onClick={() => setAllOptions(false)}><span style={{textAlign: "center", fontSize: 45}}>- <br /></span>Voir moins d'options</div>  
                  }      
                </div>
              </div>
          </div>


          {/* Right */}
          <div className='sticky'>
            <div className='flex-center-between'>
              <div className='mb-10 toUppercase'>Total</div>
              <div className='white mb-10'><FontAwesomeIcon icon={faEuroSign} />  {Math.round(totalConfig * 100) / 100}</div>
            </div>
            <div className='flex-center-between'>
              <div className='white priceDetail'>Détails du prix</div>
              <div className='white'>Taxes incluses</div>
            </div>
            <div>
              <div className='toUppercase btn-select btn-continue' onClick={() => {navigate("/personnaldetails")}}>Continuer</div>
            </div>
          </div>
      </div>
    </div>
  )
}
