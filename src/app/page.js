'use client';

import { useRouter } from 'next/navigation';
import styles from './page.module.css';
import Button from '@/components/button/Button';

export default function Home() {
  const router = useRouter();

  const handleClick = () => {
    router.push('/list');
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <img src="/images/logo.svg" alt="Logo" className={styles.logo} />

        <div className={styles.startButton}>
          <Button onClick={handleClick} />
        </div>
      </div>
    </div>
  );
}
