'use client';

import styles from './page.module.css';
import { useState, useEffect } from 'react';
import useNetwork from '@/data/network';
import { getDistance } from '@/helpers/get-distance';
import StationItem from '@/components/stationItem/StationItem';
import Link from 'next/link'; // ✅ Import Link

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
    <div className={styles.wrapper}>
      {/* ✅ Make logo a link to '/' */}
      <Link href="/">
        <img
          src="/images/logo.svg"
          alt="Logo"
          className={styles.logo}
          style={{ cursor: 'pointer' }}
        />
      </Link>

      <div className={styles.container}>
        <div className={styles.bar}></div>

        <input
          type="text"
          value={filter}
          onChange={handleFilterChange}
          className={styles.searchInput}
          placeholder="zoek"
        />

        {stations.map((station) => (
          <StationItem key={station.id} station={station} />
        ))}
      </div>
    </div>
  );
}
