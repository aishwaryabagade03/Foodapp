import logo from './logo.svg';
import { BrowserRouter as Router, Routes, Route} from "react-router-dom"
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Homeroute from './Components/Pages/Homeroute';
import Navsection from './Components/Home/Navsection';
import Restaurantroute from './Components/Pages/Restaurantroute';
import Cartroute from './Components/Pages/Cartroute';
import Successpage from './Components/Cart/Successpage';
import CancelPage from './Components/Cart/CancelPage';

function App() {
  return (
    <Router>
      <Navsection/>
      <Routes>
        <Route path='/' element={<Homeroute/>}/>
        <Route path='/restaurants/:restaurant_id' element={<Restaurantroute/>}/>
        <Route path='/cart' element={<Cartroute/>}/>
        <Route path='/success' element={<Successpage/>}/>
        <Route path='/cancel' element={<CancelPage/>}/>
      </Routes>
    </Router>
  );
}

export default App;
