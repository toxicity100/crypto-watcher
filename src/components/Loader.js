import React from 'react';

// Styles
import styles from '../assets/styles/Loader.module.css';

// Importing Images
import Logo from '../assets/images/Logo.svg';

// {/* <div className={styles.loader}></div> */}
const Loader = () => {
    return (
        <div className={styles.wrap}>
            <img className={styles.loader} src={Logo} alt='Logo' />
            <p>Loading ...</p>
        </div>
    );
};

export default Loader;
