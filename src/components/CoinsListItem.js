import React, { useState } from 'react';

// Importing Tippy.js
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

// Styles
import styles from '../assets/styles/CoinListItem.module.css';

const CoinsListItem = (props) => {

    const [isSelected, setIsSelected] = useState(false);

    const { id, name, symbol, image, currentPrice, selectedCoins, setSelectedCoins } = props;

    const clickHandler = () => {
        console.log("test");
        setIsSelected(!isSelected);
        if (!isSelected) {
            setSelectedCoins([...selectedCoins, id]);
        } else {
            selectedCoins.forEach((coin, idx) => {
                if (selectedCoins.indexOf(coin) > -1) {
                    selectedCoins.splice(idx, 1);
                    setSelectedCoins(selectedCoins);
                } 
            });
        }
    };

    const clickPreventer = event => {
        event.stopPropagation();
    }

    return (
        <li onClick={clickHandler} className={styles.listItem}
            style={isSelected ? {background: "#999"} : {background: ""}}>
            <img src={image} alt={name} />
            <div className={styles.info}>
                <Tippy content={name}>
                    <p onClick={clickPreventer}>{name.slice(0, 6).concat("...")}</p>
                </Tippy>
                <p onClick={clickPreventer}>{symbol.toUpperCase()}</p>                                        
                <p onClick={clickPreventer}>{currentPrice.toLocaleString()} $</p>                                        
            </div>
        </li>
    );
};

export default CoinsListItem;