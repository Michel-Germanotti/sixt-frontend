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

function App() {
  
  return (
    <Router>
      <Header />

      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/offerlist' element={<Offerlist />}/>
        <Route path='/offerconfig' element={<Offerconfig />}/>
        <Route path='/personnaldetails' element={<Personnaldetails />}/>
        <Route path='/backoffice' element={<Backoffice />}/>
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;
