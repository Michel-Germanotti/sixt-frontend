import { faEuroSign } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Cookies from "js-cookie";
import { useEffect } from "react"
import Country from '../../assets/country.json';
import Header from "../../components/Header/Header";

export default function Personnaldetails({setSelectCar}) {

  useEffect(() => {
    Cookies.set("selectCar", 3);
    // console.log(JSON.parse(Cookies.get("options")));
    console.log(Cookies.get("totalConfig"));
  }, [])

  const selectCar = 3;


  return (
    <div>
      <Header selectCar={selectCar} />

      <div className='container' style={{marginTop: 50}}>
        <h1 className='toUppercase'>Informations Personnelles</h1>

        <form className="personnalsInformations">
          <div className="flex-space-between" style={{alignItems: "center"}}>
            <div> 
            {/* Gauche */}

              <div className="civility" style={{marginBottom: 60}}>
                <input type="radio" value="Male" name="gender" /> M.
                <input type="radio" value="Female" name="gender" /> Mme
              </div>

              <div>
                <div style={{marginBottom: 30}}><input className="input" type="text" placeholder="Société"/></div>
                <div style={{marginBottom: 30}}><input className="input" type="text" placeholder="Prénom *"/></div>
                <div style={{marginBottom: 30}}><input className="input" type="email" placeholder="Adresse mail *"/></div>
                <div style={{marginBottom: 30}}><input className="input" type="text" placeholder="Rue *"/></div>
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


        <div >
        <div  className='modalConfigDescription' style={{padding: 0, margin: 0}}>
        {/* <div className='closeModalConfig' onClick={() => setDisplay("none")}><FontAwesomeIcon icon={faXmark} /></div> */}

          <h2 className="toUppercase" style={{fontSize: 30, fontWeight: 900, marginBottom: 70}}>Détails du prix</h2>
          <div style={{marginBottom: 50}}>

            <h3 className="toUppercase" style={{fontSize: 25, fontWeight: 500, marginBottom: 20}}>Période de location</h3>
            <div className='flex-center-between' style={{flexWrap: "wrap"}}>
              <p>Durée du location ({Cookies.get("dateDiff")} jours x {Cookies.get("dayPrice")})</p>
              <p><FontAwesomeIcon icon={faEuroSign} />  {Cookies.get("totalSansOptions")}</p>
            </div>
          </div>

          <div style={{marginBottom: 30}}>
            <h3 className="toUppercase" style={{fontSize: 25, fontWeight: 500, marginBottom: 20}}>Protection et mouveOption</h3>
            <div className='flex-center-between'>
              <div>{JSON.parse(Cookies.get("options")).map((item, index) => <p key={index} style={{marginBottom: 20}}>{item.title}</p>)}</div>
              <div>{JSON.parse(Cookies.get("options")).map((item, index) => <p key={index} style={{marginBottom: 20, textAlign: "right"}}><FontAwesomeIcon icon={faEuroSign} />  {Cookies.get("dateDiff") * item.price.amount}</p>)}</div>
              
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
            <div ><FontAwesomeIcon icon={faEuroSign} /> {Cookies.get("totalConfig")}</div>
          </div>
          <div style={{textAlign: "right"}}>Taxes incluses</div>
        </div>
      </div>


       </div>
    </div>
  )
}
