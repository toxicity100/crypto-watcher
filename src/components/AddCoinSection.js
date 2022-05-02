import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

// Importing SweetAlert2
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

// axios Object
import axiosObj from '../services/api';

// hooks
import useTitle from '../hooks/useTitle';

// Context
import { WatchListContext } from '../context/WatchListContext';

// Styles
import styles from '../assets/styles/AddCoinSection.module.css';

// Components
import Loader from './Loader';
import CoinsListItem from './CoinsListItem';

const AddCoinSection = () => {

    useTitle("Crypto Watcher | Add Coins | By Sina Bayandorian");

    const history = useNavigate();

    const context = useContext(WatchListContext);
    const { watchList, setWatchList } = context;

    const [allCoins, setAllCoins] = useState([]);
    const [inputVal, setInputVal] = useState("");
    const [selectedCoins, setSelectedCoins] = useState([]);

    const alert = withReactContent(Swal);

    useEffect(() => {
        const fetchData = async () => {
            const { data } = await axiosObj.get('/coins/markets', {
                params: {
                    vs_currency: 'usd',
                    order: 'market_cap-desc',
                    per_page: '200',
                    page: "1",
                    sparkline: false
                }
            });

            setAllCoins(data);
        }

        fetchData();
    }, []);

    const changeHandler = event => {
        setInputVal(event.target.value);
    }

    const addHandler = () => {
        if (selectedCoins.length) {
            const allShownCoins = [...watchList, ...selectedCoins];
            const uniqueShownCoins = [...new Set(allShownCoins)];
            localStorage.setItem("selectedCoins", JSON.stringify(uniqueShownCoins));
            setWatchList(uniqueShownCoins);
            history('/coins');
        } else {
            alert.fire({
                title: "No Coins Selected",
                text: "Select some coins and try again",
                icon: 'error',
                timer: 2000,
                timerProgressBar: true,
                showConfirmButton: false,
            })
        }
    }

    const filteredCoins = allCoins.filter(coin => coin.name.toUpperCase().includes(inputVal.toUpperCase()))
    
    return (
        <>
            <div className={styles.header}>
                <i className={`${styles.backBtn} fa-solid fa-arrow-left fa-2x`} onClick={() => history(-1)}></i>
                <h1 className={styles.headerTitle}>Search &amp; Add More Crtpyo Currencies</h1>
            </div>
            <div className={styles.listSection}>
                <div className={styles.topSection}>
                    <input type="text" placeholder='Search' value={inputVal} onChange={changeHandler} />
                    <button className={styles.addBtn} type='button' onClick={addHandler}>Add Selected</button>
                </div>
                <ul className={styles.coinsList}>
                    {
                        !allCoins.length ? 
                            <div className={styles.loaderWrap}>
                                <Loader />
                            </div> :
                            filteredCoins.map(coin => 
                                <CoinsListItem 
                                    key={coin.id}
                                    id={coin.id}
                                    name={coin.name}
                                    symbol={coin.symbol}
                                    image={coin.image}
                                    currentPrice={coin.current_price}
                                    selectedCoins={selectedCoins}
                                    setSelectedCoins={setSelectedCoins}
                                />
                            )
                    }
                    {
                        !filteredCoins.length && allCoins.length ? <p className={styles.nothingFound}>Nothing was Found !!!</p> : null
                    }
                </ul>
            </div>
        </>
    );
};

export default AddCoinSection;