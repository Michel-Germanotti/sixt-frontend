import React, { useEffect, useState } from 'react';
import Autocomplete from '../Autocomplete/Autocomplete';

// DatePicker


// Autocomplete

export default function Search() {
  // States
//   const [data, setData] = useState();

  // States of datepicker
  const [selected, setSelected] = useState("");
  const [selectedBack, setSelectedBack] = useState("");
  const defaultMonth = new Date(2022, 11);
  const [dateTime, setDateTime] = useState(new Date());

  console.log(new Date().toJSON());

  useEffect(() => {
    setDateTime(new Date(dateTime.toDateString()).toJSON());
  }, []);
  // Request of dates

//   const handleSubmit = async (event) => {
//     try {
//       event.preventDefault();
//       const response = await axios.get(`http://localhost:4000/rentaloffers?pickupStation=S_45035&returnStation=S_45035&pickupDate=${selected.toJSON()}&returnDate=${selectedBack.toJSON()}`)
//     //   console.log(response.data);
//       setData(response.data);
//     } catch (error) {
//       console.log(error.response);
//     }
//   }


  return (
    <div>
        <div className='flex-center-between search' >
        <div>
          <div className='orange'>Retrait et Retour</div>
          <div>
                <Autocomplete />
          </div>
        </div>
        <div>
          <div className='orange'>Date de départ</div>
          <div>
            <input type="text" disabled="disabled" value={selected}/>
            
          </div>
        </div>
        <div>
          <div className='orange'>Date de retour</div>
          <div>
          
          </div>
        </div>
        <div><button className='toUppercase'>Voir les offres</button></div>
      </div>
    </div>
  )
}
