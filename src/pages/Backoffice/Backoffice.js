import React, { useState } from 'react'
import Header from '../../components/Header/Header';
import Search from '../../components/Search/Search';

export default function Backoffice() {

  const selectCar = 0;

  const [mdp, setMdp] = useState("");
  const [display, setDisplay] = useState("none");
  

  const handleSubmit = (event) => {
      event.preventDefault();
      if(mdp === "HelloWorld!"){
        alert("Bravo !!")
      } else {
        setDisplay("flex");
      }
  }

  return (
    <div>
      <Header selectCar={selectCar} />

      <Search />
      <div className="container">
        <div style={{marginTop: 50, marginBottom:50}}>
          <h1 style={{textAlign: "center", marginBottom:50}}>Bienvenue dans le Backoffice</h1>
        </div>

        <div className='flex-center-center' style={{marginBottom: 50}}>
          <h2>Quel est le mot magique ?</h2>
          <form onSubmit={handleSubmit}>
            <input type="text" onChange={(e) => setMdp(e.target.value)} />
            <button style={{marginLeft:50}} type='submit'>Je tente ma chance</button>
          </form>
        </div>
        <div className="rabbit" style={{display: display}}>
          <div className='closeRabbit' onClick={() => setDisplay('none')}>X</div>
          <iframe 
            src="https://giphy.com/embed/OBnwDJW77acLK" 
              width="750" height="750" frameBorder="0" class="giphy-embed" allowFullScreen>
          </iframe>
        </div>
       
      </div>

    </div>
  )
}
