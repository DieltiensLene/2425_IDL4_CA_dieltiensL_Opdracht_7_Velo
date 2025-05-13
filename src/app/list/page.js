'use client';

import styles from './page.module.css';
import { useState, useEffect } from 'react';
import useNetwork from '@/data/network';
import { getDistance } from '@/helpers/get-distance';
import Link from 'next/link';

export default function Home() {
  const [filter, setFilter] = useState('');
  const [location, setLocation] = useState({});
  const { network, isLoading, isError } = useNetwork();

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          console.error(error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }, []);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error</div>;

  const stations = network.stations.filter(
    (station) => station.name.toLowerCase().indexOf(filter.toLowerCase()) >= 0
  );

  stations.map((station) => {
    station.distance =
      getDistance(
        location.latitude,
        location.longitude,
        station.latitude,
        station.longitude
      ).distance / 1000;
  });

  stations.sort((a, b) => a.distance - b.distance);

  function handleFilterChange(e) {
    setFilter(e.target.value);
  }

  return (
    <div className={styles.container}>
      {/* Bar above the search input */}
      <div className={styles.bar}></div>

      {/* Search input */}
      <input
        type="text"
        value={filter}
        onChange={handleFilterChange}
        className={styles.searchInput}
        placeholder="zoek"
      />

      {stations.map((station) => (
        <div key={station.id} className={styles.stationCard}>
          <Link href={`/stations/${station.id}`}>
            <div>
              <span className={styles.stationName}>{station.name}</span>
              <span className={styles.stationDistance}>
                {station.distance}km
              </span>
            </div>

            {/* Bar for bikes and slots */}
            <div className={styles.barContainer}>
              {/* Bike bar */}
              <div
                className={styles.bikeBar}
                style={{
                  width: `${100 - (station.bikesAvailable / station.totalBikes) * 100}%`,
                }}
              >
                {station.bikesAvailable} bikes
              </div>

              {/* Slot bar */}
              <div
                className={styles.slotBar}
                style={{
                  width: `${100 - (station.slotsAvailable / station.totalSlots) * 100}%`,
                }}
              >
                {station.slotsAvailable} slots
              </div>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
}
