import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Components
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

// Pages
import Home from './pages/Home/Home';
import Offerlist from './pages/Offerlist/Offerlist';
import Offerconfig from './pages/Offerconfig/Offerconfig';
import Personnaldetails from './pages/Personnaldetails/Personnaldetails';
import Backoffice from './pages/Backoffice/Backoffice';
import { useState } from 'react';

function App() {

  // Étapes du Header
  const [selectCar, setSelectCar] = useState(0);
  const [mouveOption, setMouveOption] = useState();
  const [mouveTotalSansOption, setMouveTotalSansOption] = useState();
  return (
    <Router>
      <Header selectCar={selectCar} setSelectCar={setSelectCar} />
    
      <Routes>
        <Route path='/' element={<Home setSelectCar={setSelectCar}/>}/>
        <Route path='/offerlist' element={<Offerlist  setSelectCar={setSelectCar}/>}/>
        <Route path='/offerconfig' element={<Offerconfig setSelectCar={setSelectCar} />}/>
        <Route path='/personnaldetails' element={<Personnaldetails setSelectCar={setSelectCar} />}/>
        <Route path='/backoffice' element={<Backoffice />}/>
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;
