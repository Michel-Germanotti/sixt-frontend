import React, { useEffect, useState } from 'react';
import Search from '../../components/Search/Search';
import Cookies from 'js-cookie';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCar, faCheck, faChevronDown, faEuroSign, faGauge, faPersonThroughWindow, faSuitcase, faWheelchairMove, faXmark } from '@fortawesome/free-solid-svg-icons';

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

import { faCalendarDays, faSnowflake } from '@fortawesome/free-regular-svg-icons';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header/Header';

export default function Offerlist({setSelectCar}) {

  
  const navigate = useNavigate();

  // Data
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  // Checkbox
  const [display, setDisplay] = useState("none");
  const [color, setColor] = useState("#000");

  // Results filter
  const [dataFilter, setDataFilter] = useState();
  const [displayModal, setDisplayModal] =useState("none");

  // Modal
  const [carInfos, setCarInfos] = useState();
  const [carouselInfo, setCarouselInfo] = useState();

  useEffect(() => {
    Cookies.set("selectCar", 1);
    const getData = async ()  => {
      const url = Cookies.get('result') ? Cookies.get('result') : `https://site--sixt-backend--pb6rn2qrqzj6.code.run/rentaloffers?pickupStation=L_ChIJq_pxynbe4EcR1pOfpO-rHD0&returnStation=L_ChIJq_pxynbe4EcR1pOfpO-rHD0&pickupDate=2022-12-05T09:47:53&returnDate=2022-12-14T09:47:53`;
      const response = await axios.get(url);
      // Nombre d'offres
      // console.log(response.data);
      setData(response.data);
      setDataFilter(response.data);
      setIsLoading(false);
    }
    getData();
  }, []);

  //  ---------------- Filter  ---------------- \\

    // Je compte le nombre d'??l??ments du tableau
    let count = Cookies.get('countOffers');
    // console.log(count);

    // Affiche et d??sactive checkbox cat??gories
    const toggleDisplay = (display) => {
      if(display === "none") {
        setDisplay("flex");
        setColor("#fff");
      } else {
        setDisplay("none");
        setColor("#000");
      }
    }

    // Je r??cupe le nb de jours de location
    const dateDiff = Cookies.get("dateDiff");  
    const dateDiffCalc = (prices) => {
      return (prices + (prices * dateDiff)).toFixed(2);
    }     

    // Filtre le tableau des r??sultats
    const filter = (category) => {

      if(category){
        const filter = data.filter(data => data.carGroupInfo.bodyStyle === category);
        setDataFilter(filter);
        // Prix total
        Cookies.set('countOffers', filter.length);
      } 
    }

  // Modal
  const setModal = async (display, car) => {
    setCarInfos(car);
    if(display){
      // R??cup les images pour le carousel
      const responseCarousel = await axios.post("https://site--sixt-backend--pb6rn2qrqzj6.code.run/rentalconfigurations/create", { offerId :car.id});
      // console.log(responseCarousel.data);
      setCarouselInfo(responseCarousel.data);
      setDisplayModal("flex");
    } else {
      setDisplayModal("none");
    }
  }


  // Routing
  const toConfig = (model, subline) => {
    Cookies.set("model", model );
    Cookies.set("subline", subline);
    navigate('/offerconfig', Cookies.set("s??lectionLocationId", carInfos.id), Cookies.set("totalSansOptions", dateDiffCalc(carInfos.prices.dayPrice.amount)), Cookies.set("dayPrice", carInfos.prices.dayPrice.amount))
  }

  const selectCar = 1;

  return isLoading ? <p>Loading...</p> : (
    <div>
      <Header selectCar={selectCar} />

      <Search />

      {/* Modal description (n'apparait que si carInfos n'est pas vide) */}
      {carInfos && 
        <div className='modal-container' style={{display: displayModal}} >
          <div className='closeModal' onClick={() => setModal(false, "")}><FontAwesomeIcon icon={faXmark} /></div>
            <div className="modal-description">
                <div style={{maxWidth: 800, minHeight:600}} >
                    {/* Description */}
                    <div className="description-header" style={{position: "relative", top: 50, marginBottom: 100}}>
                      <p className='fs-25' style={{marginBottom: 20}}>{carInfos.headlines.description} {carInfos.headlines.shortSubline}</p>
                        <div style={{display: "flex", gap: 20}}>
                          <p><FontAwesomeIcon icon={faWheelchairMove} /> {carInfos.carGroupInfo.maxPassengers} si??ges</p>
                          <p><FontAwesomeIcon icon={faPersonThroughWindow} /> {carInfos.carGroupInfo.doors} portes</p>
                          <p><FontAwesomeIcon icon={faGauge} /> {carInfos.carGroupInfo.automatic ? "Automatique" : "Manuel"}</p>
                          <p><FontAwesomeIcon icon={faSuitcase} /> {carInfos.carGroupInfo.baggage} Bagages</p>
                          <p><FontAwesomeIcon icon={faSnowflake} /> {carInfos.carGroupInfo.airCondition && "Climatisation"}</p>
                          <p><FontAwesomeIcon icon={faCalendarDays} /> {carInfos.carGroupInfo.driverMinAge} ans</p>
                        </div>
                      </div>
                    <div>
                    <div className='flex-center-between' style={{position: "relative", bottom: 0}}>
                    {/* Titre */}
                    {/* <h2 className='car-description toUppercase' style={{position: "absolute", top: "35vh", left: "2vw"}}><span>{Cookies.get("model")}</span></h2> */}
                    
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
                            {carouselInfo && carouselInfo.splashImages.map((image, index) => <SwiperSlide key={index}><img style={{width: "100%"}}src={image} alt="ff"/></SwiperSlide>)}
                        </Swiper>
                    </div>
                  </div>
                </div>

                  {/* Total */}
                  <div className='total'>
                    <div>
                        <div className='toUppercase fs-30' >Total</div>
                        <div>
                          <p className='fs-30'><FontAwesomeIcon icon={faEuroSign} /> {dateDiffCalc(carInfos.prices.dayPrice.amount)}</p>
                          <p>Taxes incluses</p>
                        </div>
                    </div>
                    <div style={{marginTop: 25}} className='toUppercase btn-select' onClick={() => toConfig(carInfos.headlines.description, carInfos.headlines.longSubline) && Cookies.set("totalConfig", carInfos.prices.dayPrice.amount)}>S??lectionner</div>
                </div>
            </div>
        </div> 
      }

      {/* Filter */}
      <div className='container-list'>
        <div className="filterCar">
          <div>
            <div>{count} - Offres</div>
            <div className='toUppercase'
            style={{color: color}}
            onClick={() => toggleDisplay(display)}
            >Cat??gorie de v??hicule <FontAwesomeIcon icon={faChevronDown} /></div>
          </div>

          {/* Checkbox */}
          <div id='checkbox' style={{display: display}}>
            <div>
              
              <div>
                <input 
                    type="checkbox" 
                    name="cabriolet" 
                    id="cabriolet"  
                    onClick={(event) => event.target.checked === true ? 
                    filter("Cabriolet") : setDataFilter(data)}/>
                    Cabriolet
                  <div>&nbsp;</div>
                </div>
                <FontAwesomeIcon icon={faCar} />
              </div>
            <div>
              <div>
                <input 
                    type="checkbox" 
                    name="coup??" 
                    id="coup??" 
                    onClick={(event) => event.target.checked === true ? 
                    filter("Coup??") : setDataFilter(data)}/>
                    Coup??
                  <div>&nbsp;</div>
                </div>
                <FontAwesomeIcon icon={faCar} />
              </div>
            <div>
              <div>
                <input 
                    type="checkbox" 
                    name="Berline" 
                    id="Berline" 
                    onClick={(event) => event.target.checked === true ? 
                    filter("Berline") : setDataFilter(data)}/>
                    Berline
                <div>&nbsp;</div>
                </div>
                <FontAwesomeIcon icon={faCar} />
              </div>
            <div>
              <div>
                <input 
                    type="checkbox" 
                    name="SUV" 
                    id="SUV" 
                    onClick={(event) => event.target.checked === true ? 
                    filter("SUV") : setDataFilter(data)}/>
                    SUV
                <div>&nbsp;</div>
                </div>
                <FontAwesomeIcon icon={faCar} />
              </div>
            <div>
              <div>
                <input 
                    type="checkbox" 
                    name="Pick-up" 
                    id="Pick-up" 
                    onClick={(event) => event.target.checked === true ? 
                    filter("Pick-up") : setDataFilter(data)}/>
                    Pick-up
                <div>&nbsp;</div>
                </div>
                <FontAwesomeIcon icon={faCar} />
              </div>
          </div>
        </div>

        {/* Results cars */}
        <div className="resultsCars">
          {dataFilter.map((car, index) => 
          //Je compte le nombre d'??l??ments du tableau 
          Cookies.set('countOffers', index +1) && 

          <div key={index} style={{marginBottom: 70, cursor: "pointer"}} onClick={() => setModal(true, car)}>
         
            <h2 className='car-description' ><span >{car.headlines.description}</span></h2>
            <p >{car.headlines.shortSubline}</p>
            <p ><img src={car.images.small} alt={car.headlines.description}/></p>
            <p ><FontAwesomeIcon icon={faCheck} /> {car.headlines.mileageInfo}</p>
            <p className='priceDay'><FontAwesomeIcon icon={faEuroSign} /> {car.prices.dayPrice.amount} jour</p>
            <p ><FontAwesomeIcon icon={faEuroSign} /> {dateDiffCalc(car.prices.dayPrice.amount)} total</p>
          </div>
          )}
        </div>
      </div>
    </div>
  )
}
