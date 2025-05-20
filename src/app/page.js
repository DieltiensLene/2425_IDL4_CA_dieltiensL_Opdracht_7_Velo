'use client';

import { useRouter } from 'next/navigation';
import styles from './page.module.css';
import StartButton from '../components/startbutton/Startbutton';

export default function Home() {
  const router = useRouter();

  const handleClick = () => {
    router.push('/list');
  };

  return (
    <div className={styles.wrapper}>
      <img src="/images/logo.svg" alt="Logo" className={styles.logo} />

      <div className={styles.startButton}>
        <StartButton onClick={handleClick} />
      </div>
    </div>
  );
}
