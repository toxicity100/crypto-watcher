import React from 'react';
import { useNavigate } from 'react-router-dom';

// hooks
import useTitle from '../hooks/useTitle';

// Styles
import styles from '../assets/styles/NotFound.module.css';

const NotFound = () => {

    useTitle("404 - Not Found");
    
    const history = useNavigate();

    return (
        <div className={styles.container}>
            <div className={styles.wrap}>
                <div className={styles.notFound}>
                    <div className={styles.notFound404}>
                        <h1>404</h1>
                        <h2>Page not found</h2>
                    </div>
                    <button onClick={() => history(-2)}>Previous Page</button>
                </div>
            </div>
        </div>
    );
};

export default NotFound;