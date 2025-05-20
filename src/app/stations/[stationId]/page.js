'use client';

import styles from './page.module.css';
import useNetwork from '@/data/network';
import { useParams, useRouter } from 'next/navigation';

export default function Station() {
  const { network, isLoading, isError } = useNetwork();
  const params = useParams();
  const router = useRouter();

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
      <img
        src="/images/pijl.svg"
        alt="terug"
        className={styles.icon}
        onClick={() => router.push('/list')}
        style={{ cursor: 'pointer' }}
      />

      <div className={styles.labelWrapper}>
        <div className={styles.labelLine}>
          Beschikbare fietsen: {station.free_bikes}
        </div>
        <div className={styles.labelSlots}>
          Beschikbare sloten: {station.empty_slots}
        </div>
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
