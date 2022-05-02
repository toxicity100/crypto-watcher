import React, { useEffect, useRef, useState } from 'react';

// hooks
import useTitle from '../hooks/useTitle';

// Importing Chart.js
import Chart from 'chart.js';

// Importing Chart Config
import { chartOptions } from '../chart config/chart-config';

// Styles
import styles from '../assets/styles/CoinHistoryChart.module.css';

const CoinHistoryChart = ({ data }) => {

    const chartCanvasRef = useRef();
    const chartRef = useRef();
    const {day, week, year, details} = data;
    const [timeFormat, setTimeFormat] = useState("24h");
    const [currentFormat, setCurrentFormat] = useState("24h");
    
    useTitle(`${details.name} Details`);
    
    useEffect(() => {
        const determineTimeFormat = () => {
            switch (timeFormat) {
                case "24h":
                    return day;
                case "7d":
                    return week;
                case "1y":
                    return year;
                default:
                    return day;
            }
        };

        if (chartCanvasRef && chartCanvasRef.current && details) {
            chartRef.current = new Chart(chartCanvasRef.current, {
                type: 'line',
                data: {
                    datasets: [{
                        label: `${details.name} price`,
                        data: determineTimeFormat(),
                        backgroundColor: "rgba(100, 100, 100, 0.5)",
                        borderColor: 'rgba(30, 30, 30, 1)',
                        pointRadius: 0,
                        borderWidth: 1
                    }],
                },
                options: chartOptions,
            });
        }
    }, [details, day, week, year, timeFormat, setTimeFormat]);

    return (
        <div className={styles.container}>
            <div className={styles.priceDetails}>
                <p>{details.current_price.toFixed(2) + " $"}</p>
                <p className={details.price_change_percentage_24h < 0 ? styles.negative : styles.positive}>
                    {details.price_change_percentage_24h.toFixed(2) + " %"}
                </p>
            </div>
            <div className={styles.chartWrapper}>
                <canvas ref={chartCanvasRef}>

                </canvas>
            </div>
            <div className={styles.btnWrapper}>
                <button 
                    onClick={() => {
                        setCurrentFormat("24h");
                        
                        if (currentFormat !== "24h") {
                            chartRef.current.destroy();
                            setTimeFormat("24h");
                        }
                    }}
                    className={styles.btn} type='button'>24h</button>
                <button 
                    onClick={() => {
                        setCurrentFormat("7d");

                        if (currentFormat !== "7d") {
                            chartRef.current.destroy();
                            setTimeFormat("7d");
                        }
                    }} 
                    className={styles.btn} type='button'>7d</button>
                <button 
                    onClick={() => {
                        setCurrentFormat("1y");

                        if (currentFormat !== "1y") {
                            chartRef.current.destroy();
                            setTimeFormat("1y");
                        }
                    }} 
                    className={styles.btn} type='button'>1y</button>
            </div>
        </div>
    );
};

export default CoinHistoryChart;