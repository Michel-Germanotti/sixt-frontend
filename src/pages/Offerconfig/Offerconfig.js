import { faCheck } from '@fortawesome/free-solid-svg-icons';
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


export default function Offerconfig() {

  // States
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  console.log(Cookies.get("model"));
  console.log(Cookies.get("subline"));
  useEffect(() => {
    const getData = async ()  => {
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

  return isLoading ? <p>Loading... </p> : (
    <div> 
      <Search />
      <div>
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
            {data.splashImages.map((image) => <SwiperSlide ><img style={{width: "100%"}}src={image} alt="ff"/></SwiperSlide>)}
        </Swiper>
      </div>
      <div className='subline'>
        <h3 className='toUppercase'>{Cookies.get("subline")}</h3>
      </div>
      <div className='backgroundOrange'>
        <h2 className='toUppercase'>Choisissez votre protection et vos options</h2>
        <h3 className='toUppercase'>Votre offre inclut</h3>
        <div>
          {data.includedCharges.map((item) => <p><FontAwesomeIcon icon={faCheck} />{item.title}</p>)}
        </div>
      {/* {data.additionalCharges.map((fraisSupp) => console.log(fraisSupp))} */}
      </div>
     
    </div>
  )
}
