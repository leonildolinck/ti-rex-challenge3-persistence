import React from 'react';
//import { BrowserRouter as Router,{*/Routes, Route} } from 'react-router-dom';
//import { BrowserRouter as Router} from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
// import Home from './pages/Home';
// import Shop from './pages/Shop';
// import SingleProduct from './pages/SingleProduct';
// import Checkout from './pages/Checkout';
// import Contact from './pages/Contact';
// import Login from './pages/Login';
// import Register from './pages/Register';

function App() {
  return (
    <div>
      <Header />
      <Home />
      <Footer />
      </div>
  );
}

export default App;