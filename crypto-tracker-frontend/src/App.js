import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import CoinList from './components/CoinList/CoinList';
import CoinDetail from './components/CoinDetail/CoinDetail';
import Search from './components/Search/Search';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<CoinList />} />
          <Route path="/coin/:id" element={<CoinDetail />} />
          <Route path="/search" element={<Search />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;