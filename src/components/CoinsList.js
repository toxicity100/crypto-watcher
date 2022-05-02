import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

// Styles
import styles from '../assets/styles/CoinsList.module.css';

// Context
import { WatchListContext } from '../context/WatchListContext';

// hooks
import useTitle from '../hooks/useTitle';
import useLoad from '../hooks/useLoad';

// Components
import Loader from './Loader';
import Coin from './Coin';

const CoinsList = () => {

    useTitle("Crypto Watcher | Your Coins list | By Sina Bayandorian");

    const context = useContext(WatchListContext);
    const { fetchedCoins, setWatchList } = context;
    const [coins, setCoins] = useState([]);

    useLoad(setWatchList);

    useEffect(() => {
        setCoins(fetchedCoins);
    }, [fetchedCoins]);

    return (
        <div className={styles.wrapper}>
            <div className={styles.header}>
                <h1>Your Coins List</h1>
                <Link to='/add-coins'>
                    Add Coins
                </Link>
                <Link to='/add-coins'>
                    +
                </Link>
            </div>
            <div>
                {
                    !coins.length ?
                        <Loader /> :
                        coins.map(coin => 
                            <Coin 
                                key={coin.id}
                                id={coin.id}
                                name={coin.name} 
                                symbol={coin.symbol}
                                image={coin.image}
                                currentPrice={coin.current_price}
                                changePercent={coin.price_change_percentage_24h}
                                coin={coin}
                                coins={coins}
                                setCoins={setCoins}
                            />
                        )                
                }
            </div>
        </div>
    );
};

export default CoinsList;