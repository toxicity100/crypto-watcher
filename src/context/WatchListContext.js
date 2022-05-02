import React, { createContext, useState, useEffect } from 'react';

// axios Object
import axiosObj from '../services/api';

// Context
export const WatchListContext = createContext();

const WatchListContextProvider = ({ children }) => {

    const [watchList, setWatchList] = useState([
        'bitcoin',
        'ethereum',
        'tether'
    ]);
    const [fetchedCoins, setFetchedCoins] = useState([]);
    
    useEffect(() => {
        const fetchData = async () => {
            const { data } = await axiosObj.get('/coins/markets', {
                params: {
                    vs_currency: 'usd',
                    ids: watchList.join(","),
                },
            });

            setFetchedCoins(data);
        }
            
        fetchData();
    }, [watchList]);

    return (
        <WatchListContext.Provider value={{fetchedCoins, setFetchedCoins, watchList, setWatchList}}>
            {children}
        </WatchListContext.Provider>
    )
};

export default WatchListContextProvider;