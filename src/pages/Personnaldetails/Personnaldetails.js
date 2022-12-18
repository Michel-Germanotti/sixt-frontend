import { faEuroSign } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Cookies from "js-cookie";
import { useEffect, useRef } from "react"
import Country from '../../assets/country.json';
import Header from "../../components/Header/Header";

export default function Personnaldetails({setSelectCar}) {

  // Form
  const gender = useRef("");
  const societe = useRef("");
  const prenom = useRef("");
  const famille= useRef("");
  const mail= useRef("");
  const indicatif = useRef("");
  const telephone = useRef("");
  const rue = useRef("");
  const cp = useRef("");
  const ville= useRef("");
  const pays = useRef("");
  const naissance = useRef("");
  
  useEffect(() => {
    Cookies.set("selectCar", 3);
  }, [])

  const selectCar = 3;

  // Est-ce que le formulaire a été rempli ?
 

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("societe", societe);
    formData.append("prenom", prenom);
    formData.append("famille", famille);
    formData.append("mail", mail);
    formData.append("indicatif", indicatif);
    formData.append("telephone", telephone);
    formData.append("rue", rue);
    formData.append("cp", cp);
    formData.append("ville", ville);
    formData.append("pays", pays);
    formData.append("naissance", naissance);
    console.log(societe);
    console.log(prenom);
    console.log(famille);
    console.log(mail);
    console.log(indicatif);
    console.log(telephone);
    console.log(rue);
    console.log(cp);
    console.log(ville);
    console.log(pays);
    console.log(naissance);
  };

  const handleClick = (handle, event) => {
    handle.current = event;
  }


  return (
    <div>
      <Header selectCar={selectCar} />

      <div className='container' style={{marginTop: 50}}>
        <h1 className='toUppercase'>Informations Personnelles</h1>

        <form className="personnalsInformations" onSubmit={handleSubmit}>
          <div className="flex-space-between" style={{alignItems: "center"}}>
            <div> 
            {/* Gauche */}

              <div className="civility" style={{marginBottom: 60}}>
                <input 
                  onChange={event => {handleClick(gender, event.target.value);}}
                  type="radio" 
                  value="Monsieur" 
                  name="gender" /> M.
                <input 
                  onChange={event => {handleClick(gender, event.target.value);}}
                  type="radio" 
                  value="Madame" 
                  name="gender" /> Mme
              </div>

              <div>
                <div style={{marginBottom: 30}}>
                  <input 
                    onChange={event => {handleClick(societe, event.target.value);}}
                    className="input" 
                    type="text" 
                    name="societe" 
                    placeholder="Société"  />
                </div>
                <div style={{marginBottom: 30}}>
                  <input 
                    onChange={event => {handleClick(prenom, event.target.value);}}
                    className="input" 
                    type="text" 
                    name="prenom" 
                    placeholder="Prénom *"  />
                </div>
                <div style={{marginBottom: 30}}>
                  <input 
                    onChange={event => {handleClick(mail, event.target.value);}}
                    className="input" 
                    type="email"
                    name="mail"
                    placeholder="Adresse mail *"  />
                </div>
                <div style={{marginBottom: 30}}>
                  <input 
                    onChange={event => {handleClick(rue ,event.target.value);}}
                    className="input" 
                    type="text" 
                    placeholder="Rue *"  />
                </div>
              </div>
              <div>
                <select
                  name="" 
                  id="" 
                  className="input" 
                  onChange={event => {handleClick(pays, event.target.value);}}
                  >{Country.map((item) => <option>{item.country}</option>)}
                </select>
              </div>
              <div>
                <h2 style={{marginBottom: 20}} className='toUppercase'>Date de naissance</h2>
                <input 
                  onChange={event => {handleClick(naissance, event.target.value);}}
                  type="date" 
                  id="start" 
                  name="naissance" 
                  min="1920-01-01" 
                  max="2022-12-18" /> 
              </div>
            </div>




            {/* Droite */}
              <div>
                <div>
                  <input 
                    onChange={event => {handleClick(famille, event.target.value);}}
                    className="input" 
                    type="text" 
                    placeholder="Nom de famille *"/>
                </div>
                <div className="flex-space-between">
                  <div>
                    <select 
                      name="" 
                      id=""
                      onChange={event => {handleClick(indicatif, event.target.value);}}>
                    {Country.map((item) => <option >+ {item.code}</option>)}
                    </select>
                  </div>
                  <div>
                    <input 
                      onChange={event => {handleClick(telephone, event.target.value);}}
                      className="input" 
                      type="tel" 
                      placeholder="Numéro de téléphone *"/>
                  </div>
                </div>
                <div className="flex-space-between">
                  <div>
                    <input 
                      onChange={event => {handleClick(cp, event.target.value);
                      }}
                      type="text" 
                      placeholder="Code postal *"/>
                  </div>
                  <div>
                    <input 
                      onChange={event => {handleClick(ville, event.target.value); }}
                      className="input" 
                      type="text" 
                      placeholder="Ville *"/>
                  </div>
                </div>
              </div>
            </div>

            <div style={{marginBottom: 80}}>
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
              <h3 className="toUppercase" style={{fontSize: 25, fontWeight: 500, marginBottom: 20}}>Protections et options</h3>
              <div className='flex-center-between'>
                <div>{JSON.parse(Cookies.get("options")).map((item, index) => <p key={index} style={{marginBottom: 20}}>{item.title}</p>)}</div>
                <div>{JSON.parse(Cookies.get("options")).map((item, index) => <p key={index} style={{marginBottom: 20, textAlign: "right"}}><FontAwesomeIcon icon={faEuroSign} />  {Math.round((Cookies.get("dateDiff") * item.price.amount)* 100) / 100}</p>)}</div>
                
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
              <div ><FontAwesomeIcon icon={faEuroSign} /> {Math.round(Cookies.get("totalConfig")* 100) / 100 }</div>
            </div>
            <div style={{textAlign: "right"}}>Taxes incluses</div>
          </div>
        </div>
        
        
        <button type="submit">Réserver</button>

        </form>
       </div>
    </div>
  )
}
