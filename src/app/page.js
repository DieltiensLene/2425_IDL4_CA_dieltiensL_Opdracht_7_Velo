'use client';

import { useRouter } from 'next/navigation';
import styles from './page.module.css';
import StartButton from '@/components/startbutton/Startbutton';

export default function Home() {
  const router = useRouter();

  const handleClick = () => {
    router.push('/list');
  };

  return (
    <div>
      <h1 className={styles.title}>PEDAL UP</h1>
      <StartButton onClick={handleClick} />
    </div>
  );
}
