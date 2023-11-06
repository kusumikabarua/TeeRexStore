
import './App.css';
import { Routes, Route } from "react-router-dom"
import Products from './Components/Products/Products';
import Cart from './Components/Cart/Cart';


function App() {
 
  return (
    <div className="App">
    <Routes>
        <Route path="/" element={ <Products /> } />
        <Route path="cart" element={ <Cart /> } />
      
      </Routes>
   
   
    </div>
  );
}

export default App;
