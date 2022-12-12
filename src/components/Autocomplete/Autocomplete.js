import React, { useState } from 'react';
import axios from 'axios';


export default function Asynchronous() {
  const [data, setData] = useState();

  // Data search
  const location = async (location) => {
    const response = await axios.get(`http://localhost:4000/locations?q=${location}`);
    // console.log(response.data);
    setData(response.data);
  }

  return (
    <div>
      <form className='autocomplete' onSubmit={(event) =>event.preventDefault()} >
        <input type="text" placeholder='Trouver une agence' onChange={(event) => location(event.target.value)} />
        {data && data.map((item, index) => <p key={index}>{item.title}</p>)}
      </form>
    </div>
  );
}