import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Context
import WatchListContextProvider from './context/WatchListContext';

// Components
import CoinsList from './components/CoinsList';
import CoinDetails from './components/CoinDetails';
import AddCoinSection from './components/AddCoinSection';
import NotFound from './components/NotFound';

const App = () => {
  return (
    <div className='content-container'>
    <WatchListContextProvider>
        <Routes>
            <Route path='coins/:id' element={<CoinDetails />} />
            <Route path='/add-coins' element={<AddCoinSection />} />
            <Route path='/coins' element={<CoinsList />} />
            <Route path='/404-not-found' element={<NotFound />} />
            <Route path='/' element={<Navigate to='/coins' />} />
            <Route path='/*' element={<Navigate to='/404-not-found' />} />
        </Routes>
    </WatchListContextProvider>
    </div>
  );
};

export default App;