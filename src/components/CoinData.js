import React from 'react';

// Styles
import styles from '../assets/styles/CoinData.module.css';

const CoinData = ({ data }) => {
    return (
        <div className={styles.detailsContainer}>
            <div className={styles.field}>
                <span className={styles.fieldTitle}>Market Cap</span>
                <span className={styles.fieldData}>{(data.market_cap || "not available").toLocaleString()}</span>
            </div>

            <div className={styles.field}>
                <span className={styles.fieldTitle}>Volume(24h)</span>
                <span className={styles.fieldData}>{(data.total_volume || "not available").toLocaleString()}</span>
            </div>
            
            <div className={styles.field}>
                <span className={styles.fieldTitle}>circulating supply</span>
                <span className={styles.fieldData}>{(data.circulating_supply || "not available").toLocaleString()}</span>
            </div>

            <div className={styles.field}>
                <span className={styles.fieldTitle}>total supply</span>
                <span className={styles.fieldData}>{(data.total_supply || "not available").toLocaleString()}</span>
            </div>

            <div className={styles.field}>
                <span className={styles.fieldTitle}>high 24h</span>
                <span className={styles.fieldData}>{(data.high_24h || "not available").toLocaleString()}</span>
            </div>
            
            <div className={styles.field}>
                <span className={styles.fieldTitle}>low 24h</span>
                <span className={styles.fieldData}>{(data.low_24h || "not available").toLocaleString()}</span>
            </div>
        </div>
    );
};

export default CoinData;