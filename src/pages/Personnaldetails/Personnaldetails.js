import { useEffect } from "react"

export default function Personnaldetails({setSelectCar}) {

  useEffect(() => {
    setSelectCar(3);
  }, [])


  return (
    <div>
      <div className='container' style={{marginTop: 50}}>
        <h1 className='toUppercase'>Informations Personnelles</h1>

        <form className="personnalsInformations">
          <div className="flex-space-between">
            <div>
              <div>
                <input type="radio" value="Male" name="gender" /> M.
                <input type="radio" value="Female" name="gender" /> Mme
            </div>

            {/* Gauche */}
            <div>
              <div>                
                <input type="text" placeholder="Société"/>
              </div>
              <div>
                <input type="text" placeholder="Prénom *"/>
              </div>
              <div>
                <input type="email" placeholder="Adresse mail *"/>
              </div>
              <div>
                <input type="text" placeholder="Rue *"/>
              </div>
            </div>
            <div>
            <select name="" id="">
            </select>
            </div>
            <div>
              <h2 className='toUppercase'>Date de naissance</h2>
            </div>

            </div>


            <div>

            {/* Droite */}
            <div>

            <div><input type="text" placeholder="Nom de famille *" /></div>
            <div className="flex-space-between">
              <div>
                <select name="" id="">
                  <option value="">+33</option>
                </select>
              </div>
              <div>
                <input type="tel" placeholder="Numéro de téléphone *" />
              </div>
            </div>
            <div className="flex-space-between">
              <div><input type="text" placeholder="Code postal *" /></div>
              <div><input type="text" placeholder="Ville *" /></div>
            </div>

            </div>
            </div>
          </div>
        </form>

       </div>
    </div>
  )
}
