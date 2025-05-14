// Button.jsx
import React from 'react';
import styles from './page.module.css';
import Link from 'next/link';

const StationItem = ({ station }) => {
  return (
    <div key={station.id} className={styles.stationCard}>
      <Link href={`/stations/${station.id}`}>
        <div className={styles.station}>
          <span className={styles.stationName}>{station.name}</span>
          <span className={styles.stationDistance}>{station.distance}km</span>
        </div>
      </Link>
    </div>
  );
};

export default StationItem;
