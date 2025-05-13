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

  const totalCapacity = station.free_bikes + station.empty_slots;
  const bikesPercentage = (station.free_bikes / totalCapacity) * 100;
  const slotsPercentage = (station.empty_slots / totalCapacity) * 100;

  return (
    <div className={styles.stationPage}>
      <h1 className={styles.title}>{station.name}</h1>

      <div className={styles.infoLine}>
        <span>Bikes available: {station.free_bikes}</span>
        <div className={styles.barWrapper}>
          <div
            className={styles.bikeBar}
            style={{ width: `${bikesPercentage}%` }}
          ></div>
        </div>
      </div>

      <div className={styles.infoLine}>
        <span>Slots available: {station.empty_slots}</span>
        <div className={styles.barWrapper}>
          <div
            className={styles.slotBar}
            style={{ width: `${slotsPercentage}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
}
