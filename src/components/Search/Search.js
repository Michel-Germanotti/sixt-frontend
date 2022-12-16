import React, { useState } from 'react';
// import Autocomplete from '../Autocomplete/Autocomplete';
import axios from 'axios';
import Cookies from 'js-cookie';

// DatePicker
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { setHours, setMinutes } from 'date-fns/fp';
import { useNavigate } from 'react-router-dom';



export default function Search() {

  const navigate = useNavigate();

  // States
  const [display, setDisplay] = useState("block");


    // Calcul entre 2 dates
      // States of datepicker
      const [startDate, setStartDate] = useState(new Date());
      const [returnDate, setReturnDate] = useState(new Date());

    // Autocomplete
      // States of autocomplete
      const [autocomplete, setAutocomplete] = useState();
      // console.log("autocomplete => ",autocomplete);
      const [dropdown, setDropdown] = useState();
      const [inputValue, setInputValue] = useState(' ');
      
        // Première requête pour récupérer l'id
      const location = async (location, inputValue) => {
          // J'instancie la value d'input (pour éviter les erreurs)
          setInputValue(inputValue);
        const response = await axios.get(`https://site--sixt-backend--pb6rn2qrqzj6.code.run/locations?q=${location}`);
        // const response = await axios.get(`http://localhost:4000/locations?q=${location}`);
        console.log(response.data);
        Cookies.set("reponseFilter", response.data);
        // console.log(response.data);
        setAutocomplete(response.data);
      }
  
  // Form submit
  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      
      // ------- Infos -------
      const url = `https://site--sixt-backend--pb6rn2qrqzj6.code.run/rentaloffers?pickupStation=${dropdown.id}&returnStation=${dropdown.id}&pickupDate=${startDate.toJSON().slice(0, 19)}&returnDate=${returnDate.toJSON().slice(0, 19)}`;
      console.log(url);
      // Je stock l'url dans les cookies pour pouvoir faire une nouvelle requête
      Cookies.set('result', url);
       
        // ------- Date --------
        // Je récup la différence en millisecondes entre les 2 dates à partir du 1er janvier 1970 00:00
        const dateDiff = returnDate.getTime() - startDate.getTime();
        // Je convertis en jour
        const intervalle = Math.round(dateDiff / (1000 * 3600 * 24));
  
        // Cookies
        Cookies.set("dateDiff", intervalle);
      
      navigate("/offerlist");
    } catch (error) {
        console.log(error.response);
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        
        {/* Autocomplete */}
        <div className='flex-center-between search' style={{alignItems: "baseline"}} >
          <div>
            <div className='orange'>Retrait et Retour</div>
              <div className="autocomplete">
                
                {/* Saisie */}
                <input 
                  className="search-input" 
                    type="text" 
                    placeholder='Trouver une agence' 
                    onChange={(event) => location(event.target.value, event.target.value) && setDisplay("block")} value={inputValue}/>
                    {/* {inputValue && console.log(inputValue)} */}
                
                {/* Dropdown saisie */}
                {autocomplete && <div className='agency' style={{display : display}} >
                  <p style={{paddingBottom: 20, color: "#ff5f00"}}>Agences</p>
                  {autocomplete.map((item, index) => 
                    <p key={index} className="searchSelect" onClick={() => {
                      setDropdown(item) ; setDisplay("none"); setInputValue(item.title)}
                      }>{item.title}</p>)}
                </div> }

              </div> 
              
          </div>

          {/* Date de départ */}
          <div style={{display: "flex", gap: 150, alignItems: "center"}}>
            <div>
              <div className='orange'>Date de départ</div>
                <div>
                  <DatePicker
                    className='search-input'
                    selected={startDate}
                    onChange={(date) => setStartDate(date)} 
                    showTimeSelect
                    timeFormat="HH:mm"
                    minTime={setHours(setMinutes(new Date(), 0), 17)}
                    maxTime={setHours(setMinutes(new Date(), 30), 20)}
                    dateFormat="dd/MM HH:mm"
                  />          
              </div>
            </div>
                        
            {/* Date de retour */}
            <div>
              <div className='orange'>Date de retour</div>
                <div>
                  <DatePicker
                    className='search-input' 
                    selected={returnDate} 
                    onChange={(date) => setReturnDate(date)}
                    showTimeSelect
                    timeFormat="HH:mm"
                    minTime={setHours(setMinutes(new Date(), 0), 17)}
                    maxTime={setHours(setMinutes(new Date(), 30), 20)}
                    dateFormat="dd/MM HH:m"
                  />    
              </div>
            </div>

            {/* Submit */}
            <div>
              {/* Si la date de départ n'est pas supérieur à la date de retour */}
              <button 
                type='submit' 
                className='toUppercase' 
                disabled={startDate > returnDate || (!dropdown && "disabled") ? "disabled" : "" }
                >Voir les offres</button>
            </div>

          </div>
          </div>
      </form>
      
    </div>
  )
}
