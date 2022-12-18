import { faCheck, faEuroSign, faXmark } from '@fortawesome/free-solid-svg-icons';
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
import Header from '../../components/Header/Header';

export default function Offerconfig({setSelectCar}) {


  // Frais
  const redevanceImmat = 12.33;
  const redevanceUsage = 13.20;
  const fraisRecup = 129.29;

  const navigate = useNavigate();

  // States
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  // Total des options
  const totalSansOptions = Cookies.get("totalSansOptions");
  const [totalConfig, setTotalConfig] = useState(totalSansOptions);

  // Afficher toutes les options
  const [allOptions, setAllOptions] = useState();

  // Modal
  const [display, setDisplay] = useState("none");

  // Options sélectionnées
  const [options, setOptions] = useState([]);

  useEffect(() => {
    const getData = async ()  => {
      try {
        const response = await axios.post("https://site--sixt-backend--pb6rn2qrqzj6.code.run/rentalconfigurations/create", { offerId :Cookies.get("sélectionLocationId")});
        // console.log(response.data);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    Cookies.set("selectCar", 2);
    getData();
  }, [setSelectCar])


  // Etat des options
  const handleClick = (item, event) => {

    // Si on ne trouve pas de doublon
    if(!options.includes(item)){
      // Toggle of class
      event.currentTarget.classList.remove('optionsCards');
      event.currentTarget.classList.add('optionsCardsSelect');

      console.log(item.title);
      // Je créer une copie du state options
      let copyOfOptions = [...options];
      console.log(options)
      
      // Je push item dans copyOfOptions
      copyOfOptions.push(item);

      // J'envoi la copie dans le state options
      setOptions(copyOfOptions); 

      // J'ajoute le prix au total
      // setTotalConfig(Number(totalConfig) +  (Cookies.get("dateDiff") * item.price.amount));
      setTotalConfig(Number(totalConfig) + (Cookies.get("dateDiff") * item.price.amount));
    } 
    else {
      // Toggle of class
      event.currentTarget.classList.remove('optionsCardsSelect');
      event.currentTarget.classList.add('optionsCards');

      // Je vérifie qu'il y ait un doublon
        // console.log("includes => ", options.includes(item));

      // Je cherche item dans le tableau
      const filterOptions = options.filter((option) => option !== item);

      setOptions(filterOptions);
      // console.log("filter => ", filterOptions);

      // setTotalConfig(Number(totalConfig) - (Cookies.get("dateDiff") * item.price.amount) );
      setTotalConfig(Number(totalConfig) - (Cookies.get("dateDiff") * item.price.amount));
    }
  }

  const selectCar = 2;

  return isLoading ? <p>Loading... </p> : (
    <div> 
      <Header selectCar={selectCar} />

      <Search />

      {/* Modal détail du prix */}
      <div style={{display : display}} className="modalConfigContainer">
        <div  className='modalConfigDescription'>
        <div className='closeModalConfig' onClick={() => setDisplay("none")}><FontAwesomeIcon icon={faXmark} /></div>

          <h2 className="toUppercase" style={{fontSize: 30, fontWeight: 900, marginBottom: 70}} >Détails du prix</h2>
          <div style={{marginBottom: 50}}>

            <h3 className="toUppercase" style={{fontSize: 25, fontWeight: 500, marginBottom: 20}}>Période de location</h3>
            <div className='flex-center-between' style={{flexWrap: "wrap"}}>
              <p>Durée du location ({Cookies.get("dateDiff")} jours x {Cookies.get("dayPrice")})</p>
              <p><FontAwesomeIcon icon={faEuroSign} />  {Math.round(totalSansOptions * 100) / 100}</p>
            </div>
          </div>

          <div style={{marginBottom: 30}}>
            <h3 className="toUppercase" style={{fontSize: 25, fontWeight: 500, marginBottom: 20}}>Protections et options</h3>
            <div className='flex-center-between'>
              <div>{options.map((item, index) => <p key={index} style={{marginBottom: 20}}>{item.title}</p>)}</div>
              <div>{options.map((item, index) => <p key={index} style={{marginBottom: 20, textAlign: "right"}}><FontAwesomeIcon icon={faEuroSign} />  {Math.round(Cookies.get("dateDiff") * item.price.amount * 100) / 100}</p>)}</div>
              
            </div>
          </div>

          <div style={{marginBottom: 40}}>
            <h3 className="toUppercase" style={{fontSize: 25, fontWeight: 500, marginBottom: 20}}>Frais</h3>
            <div className='flex-center-between'>
              <div style={{marginBottom: 20}}>Redevance d'immatriculation pour véhicule</div>
              <div style={{marginBottom: 20, textAlign: "right"}}><FontAwesomeIcon icon={faEuroSign} />  12,33</div>
            </div>
            <div className='flex-center-between'>
              <div style={{marginBottom: 20}}>Redevance d'usage des installations de transport et de clientèle</div>
              <div style={{marginBottom: 20, textAlign: "right"}}><FontAwesomeIcon icon={faEuroSign} />  13,20</div>
            </div>
            <div className='flex-center-between'>
              <div style={{marginBottom: 20}}>Frais de récupération dans une concéssion aéroportuaire</div>
              <div style={{marginBottom: 20, textAlign: "right"}}><FontAwesomeIcon icon={faEuroSign} />  129,29</div>
            </div>
          </div>
          <div className='flex-center-between'>
            <h3 className="toUppercase" style={{fontSize: 40, fontWeight: 500}}>Total</h3>
            <div>
              <FontAwesomeIcon icon={faEuroSign} /> 
              {Math.round((Number(totalConfig) + redevanceImmat + redevanceUsage + fraisRecup) * 100) / 100}
            </div>
          </div>
          <div style={{textAlign: "right"}}>Taxes incluses</div>
        </div>
      </div>
      

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
                        <div key={item.id} className='optionsCards'  onClick={(event) =>  handleClick(item, event)}>
                            
                          <div>
                            <h3 className='toUppercase'>{item.title}</h3>
                            <p>{item.description}</p></div>
                            <p><FontAwesomeIcon icon={faEuroSign} /> {item.price.amount} {item.price.unit} </p>
                        </div>
                        :   
                        // Toutes les options
                        <div key={item.id} className='optionsCards' onClick={(event) =>  handleClick(item, event)}>
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
              <div className='white mb-10'><FontAwesomeIcon icon={faEuroSign} />  {Math.round((Number(totalConfig) + redevanceImmat + redevanceUsage + fraisRecup) * 100) / 100}</div>
            </div>
            <div className='flex-center-between'>
              <div className='white priceDetail' onClick={() => setDisplay('flex')}>Détails du prix</div>
              <div className='white'>Taxes incluses</div>
            </div>
            <div>
              <div className='toUppercase btn-select btn-continue' onClick={() => {navigate("/personnaldetails"); Cookies.set("options",JSON.stringify(options)); Cookies.set("totalConfig", Number(totalConfig) + redevanceImmat + redevanceUsage + fraisRecup)}}>Continuer</div>
            </div>
          </div>
      </div>
    </div>
  )
}
