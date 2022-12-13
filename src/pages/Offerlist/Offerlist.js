import React, { useEffect, useState } from 'react';
import Search from '../../components/Search/Search';
import Cookies from 'js-cookie';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCar, faChevronDown } from '@fortawesome/free-solid-svg-icons';

export default function Offerlist() {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [display, setDisplay] = useState("none");
  const [color, setColor] = useState("##000");

  const [dataFilter, setDataFilter] = useState();

  useEffect(() => {
    const getData = async ()  => {
      const url = Cookies.get('result');
      const response = await axios.get(url);
      // Nombre d'offres
      Cookies.set('countOffers', response.data.length);
      console.log(response.data);
      setData(response.data);
      setDataFilter(response.data);
      setIsLoading(false);
    }
    getData();
    
  }, []);

  // Je compte le nombre d'éléments du tableau
  const count = Cookies.get('countOffers');

  // Filter
    // Affiche et désactive checkbox catégories
    const toggleDisplay = (display) => {
      if(display === "none") {
        setDisplay("flex");
        setColor("#fff");
      } else {
        setDisplay("none");
        setColor("#000");
      }
    }

  // filter("SUV");
  const filter = (category) => {
    if(category){
      const exprt = data.filter(data => data.carGroupInfo.bodyStyle === category);
      setDataFilter(exprt);
    } else if("all"){
      setDataFilter(data);
    }
  }
  console.log(data);
  console.log(dataFilter);
  

  return isLoading ? <p>Loading...</p> : (
    <div>
      <Search />

      {/* Filter */}
      <div className='container'>
        <div className="filterCar">
          <div>
            <div>{Cookies.get('countOffers')} - Offres</div>
            <div className='toUppercase'
            style={{color: color}}
            onClick={() => toggleDisplay(display)}
            >Catégorie de véhicule <FontAwesomeIcon icon={faChevronDown} /></div>
          </div>

          {/* Checkbox */}
          <div id='checkbox' style={{display: display}} >
              Réinitialiser
            <div>
              
              <div>
                <input type="checkbox" name="cabriolet" id="cabriolet"  onClick={(event) => event.target.checked === true ? filter("Cabriolet") : setDataFilter(data)}/>Cabriolet
                  <div>&nbsp;</div>
                </div>
                <FontAwesomeIcon icon={faCar} />
              </div>
            <div>
              <div>
                <input type="checkbox" name="coupé" id="coupé" onClick={(event) => event.target.checked === true ? filter("Coupé") : setDataFilter(data)}/>Coupé
                  <div>&nbsp;</div>
                </div>
                <FontAwesomeIcon icon={faCar} />
              </div>
            <div>
              <div>
                <input type="checkbox" name="Berline" id="Berline" onClick={(event) => event.target.checked === true ? filter("Berline") : setDataFilter(data)}/>Berline
                <div>&nbsp;</div>
                </div>
                <FontAwesomeIcon icon={faCar} />
              </div>
            <div>
              <div>
                <input type="checkbox" name="SUV" id="SUV" onClick={(event) => event.target.checked === true ? filter("SUV") : setDataFilter(data)}/>SUV
                <div>&nbsp;</div>
                </div>
                <FontAwesomeIcon icon={faCar} />
              </div>
            <div>
              <div>
                <input type="checkbox" name="Pick-up" id="Pick-up" onClick={(event) => event.target.checked === true ? filter("Pick-up") : setDataFilter(data)}/>Pick-up
                <div>&nbsp;</div>
                </div>
                <FontAwesomeIcon icon={faCar} />
              </div>
          </div>
        </div>

        {/* Results cars */}
        <div className="resultsCars">
          {dataFilter.map((car, index) => 
          <div key={index} style={{marginBottom: 70}}>
            <h2 className='car-description' ><span >{car.headlines.description}</span></h2>
            <p ><img src={car.images.small} alt={car.headlines.description}/></p>
            <p >{car.headlines.shortSubline}</p>
            <p >{car.headlines.mileageInfo}</p>
            <p >{car.prices.dayPrice.amount} jour</p>
          </div>
          )}
        </div>

      </div>
      
    </div>
  )
}
