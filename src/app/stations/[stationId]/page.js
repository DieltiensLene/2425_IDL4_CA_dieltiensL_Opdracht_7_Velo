'use client';

import styles from './page.module.css';
import useNetwork from '@/data/network';
import { useParams } from 'next/navigation';

export default function Station() {
  const { network, isLoading, isError } = useNetwork();
  const params = useParams();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error</div>;

  const station = network.stations.find(
    (station) => station.id === params.stationId
  );

  if (!station) return <div>Station not found</div>;

  const totalCapacity = station.free_bikes + station.empty_slots;

  return (
    <div className={styles.stationPage}>
      <h1 className={styles.title}>{station.name}</h1>

      <div className={styles.labelLine}>
        <span>Bikes available: {station.free_bikes}</span>
        <span>Slots available: {station.empty_slots}</span>
      </div>

      <div className={styles.dotsWrapper}>
        {[...Array(totalCapacity)].map((_, i) => {
          const isBike = i < station.free_bikes;
          return (
            <div
              key={i}
              className={`${styles.dot} ${isBike ? styles.filled : styles.empty}`}
            ></div>
          );
        })}
      </div>
    </div>
  );
}
