import React from 'react';
import styles from './index.module.scss';

export default function Demo() {
    return (
        <div>
            <p className={styles.text}>Test thoi nha - test 1</p>
            <p className="text">Test thoi nha khac - test 1</p>
            <button className={`${styles['button--danger']}`}>Press</button>
        </div>
    )
}
