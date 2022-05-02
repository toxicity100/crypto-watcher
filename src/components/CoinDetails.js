import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

// axios - axios Object
import axios from 'axios';
import axiosObj from '../services/api';

// Styles
import styles from '../assets/styles/CoinDetails.module.css';

// Components
import CoinHistoryChart from './CoinHistoryChart';
import CoinData from './CoinData';
import Loader from './Loader';

const CoinDetails = () => {

    const { id } = useParams();
    const history = useNavigate();

    const [coinData, setCoinData] = useState({});

    const formatData = data => {
        return data.map(el => {
            return {
                t: el[0],
                y: el[1],
            };
        });
    }

    useEffect(() => {
        const fetchData = async () => {
            await axios.all([
                axiosObj.get(`/coins/${id}/market_chart/`, {
                    params: {
                        vs_currency: 'usd',
                        days: '1',
                    },
                }),
                axiosObj.get(`/coins/${id}/market_chart/`, {
                    params: {
                        vs_currency: 'usd',
                        days: '7',        
                    },
                }),
                axiosObj.get(`/coins/${id}/market_chart/`, {
                    params: {
                        vs_currency: 'usd',
                        days: '365',        
                    },
                }),
                axiosObj.get(`/coins/markets`, {
                    params: {
                        vs_currency: 'usd',
                        ids: id,
                    },
                }),
            ])
                .then(axios.spread((resultsDay, resultsWeek, resultsYear, details) => {
                    setCoinData({
                        day: formatData(resultsDay.data.prices),
                        week: formatData(resultsWeek.data.prices),
                        year: formatData(resultsYear.data.prices),
                        details: details.data[0],
                    });
                }));

        }

        fetchData();
    }, [id]);
    return (
        <div>
            {
                !coinData.details ? 
                    <Loader /> :
                    <div>
                        <div className={styles.header}>
                        <h1>{coinData.details.name} Details Chart</h1>
                        <i 
                            className='fa-solid fa-arrow-left fa-lg'
                            title="Previous Page"
                            onClick={() => history(-1)}
                        >
                        </i>                        
                    </div>
                        <CoinHistoryChart data={coinData} />
                        <CoinData data={coinData.details} />
                    </div>
            }
        </div>
    );
};

export default CoinDetails;