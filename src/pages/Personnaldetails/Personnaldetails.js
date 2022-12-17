import { useEffect } from "react"
import Country from '../../assets/country.json';

export default function Personnaldetails({setSelectCar}) {

  useEffect(() => {
    setSelectCar(3);
  }, [])

  return (
    <div>
      <div className='container' style={{marginTop: 50}}>
        <h1 className='toUppercase'>Informations Personnelles</h1>

        <form className="personnalsInformations">
          <div className="flex-space-between" style={{alignItems: "center"}}>
            <div> 
            {/* Gauche */}

              <div className="civility">
                <input type="radio" value="Male" name="gender" /> M.
                <input type="radio" value="Female" name="gender" /> Mme
              </div>

              <div>
                <div><input className="input" type="text" placeholder="Société"/></div>
                <div><input className="input" type="text" placeholder="Prénom *"/></div>
                <div><input className="input" type="email" placeholder="Adresse mail *"/></div>
                <div><input className="input" type="text" placeholder="Rue *"/></div>
              </div>
              <div><select name="" id="" className="input">
                  {Country.map((item) => <option>{item.country}</option>)}
                </select></div>
              <div><h2 className='toUppercase'>Date de naissance</h2></div>
            </div>



            {/* Droite */}
              <div>
                <div><input className="input" type="text" placeholder="Nom de famille *" /></div>
                <div className="flex-space-between">
                  <div>
                    <select name="" id="">
                    {Country.map((item) => <option>+ {item.code}</option>)}
                    </select>
                  </div>
                  <div><input className="input" type="tel" placeholder="Numéro de téléphone *" /></div>
                </div>
                <div className="flex-space-between">
                  <div><input  type="text" placeholder="Code postal *" /></div>
                  <div><input className="input" type="text" placeholder="Ville *" /></div>
                </div>
              </div>
            </div>
        </form>

       </div>
    </div>
  )
}
