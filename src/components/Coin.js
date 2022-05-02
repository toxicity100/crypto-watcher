import React from 'react';
import { Link } from 'react-router-dom';

// Importing Tippy.js
import Tippy from '@tippyjs/react';

// Styles
import styles from '../assets/styles/Coin.module.css';

const Coin = (props) => {

    const { id, name, symbol, image, currentPrice, changePercent, coin, coins, setCoins } = props;

    const removeHandler = () => {
        const idx = coins.indexOf(coin);        
        if (idx !== (0 || 1 || 2)) {
            coins.splice(idx, 1);
            const remainedCoins = coins.slice();
            setCoins(remainedCoins);

            if (localStorage.getItem("selectedCoins") !== null) {
                const prevSelectedCoins = JSON.parse(localStorage.getItem("selectedCoins"));
                const idIDX = prevSelectedCoins.indexOf(id);
                prevSelectedCoins.splice(idIDX, 1);
                localStorage.setItem("selectedCoins", JSON.stringify(prevSelectedCoins));
            }
        }
    }

    return (
        <div className={`${styles.card} ${id}`}>
            <section>
            <img src={image} alt={name} />
            <div className={styles.data}>
                <span className={styles.name}>{name}</span>
                <span className={styles.dash_1}>-</span>
                <span className={styles.symbol}>{symbol.toUpperCase()}</span>
                <span className={styles.dash_2}>-</span>
                <span className={styles.price}>{`${currentPrice.toLocaleString()} $`}</span>
            </div>
            </section>
            <section className={styles.change_info}>
                <span className={styles.change_icon}>
                    {
                        changePercent > 0 ?
                            <i className={`fa-solid fa-caret-up fa-md ${styles.positive}`}></i> :
                            <i className={`fa-solid fa-caret-down fa-md ${styles.negative}`}></i>
                    }
                </span>
                <span className={changePercent < 0 ? styles.negative : styles.positive}>
                    {changePercent.toFixed(2) + "%"}
                </span>
            </section>
            <section>
                <Link className={styles.link} to={`/coins/${coin.id}`}>Details</Link>
                <Tippy content="Coin Chart">
                    <Link className={styles.link} to={`/coins/${coin.id}`}>
                        <i className='fa-solid fa-chart-line fa-lg'></i>
                    </Link>
                </Tippy>
                {
                    id !== "bitcoin" && id !== "tether" && id !== "ethereum" ?
                        <i className={`fa-solid fa-close fa-lg ${styles.removeBtn}`} onClick={removeHandler} title="Remove"></i>
                        : ""
                }
            </section>
        </div>
    );
};

export default Coin;