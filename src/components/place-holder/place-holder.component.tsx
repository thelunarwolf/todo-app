import React from 'react'
import styles from './place-holder.module.css';
import NODATA from '../../assets/images/nodata.svg';

function PlaceholderImage() {
    return <div className={styles.place_holder}>
        <img className={styles.placeholder_img} src={NODATA} alt="no_data" />
        <p>No Todos found</p>
    </div>
}

export default PlaceholderImage;
