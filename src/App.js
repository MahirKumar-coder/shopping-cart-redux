
import './App.css';
import Navbar from './components/Navbar';
import ProductCard from './components/ProductCard';
import CartPage from './components/CartPage';

import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <Routes>
          <Route exact path="/" element={<ProductCard />} />
          <Route path="/cart" element={<CartPage />} />
        </Routes>
        <ProductCard />
      </div>
    </BrowserRouter>
  );
}

export default App;
