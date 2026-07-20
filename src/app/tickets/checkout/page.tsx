import { Suspense } from 'react';
import Header from '@/components/Header';
import CheckoutClient from './CheckoutClient';
import styles from './page.module.css';

export default function CheckoutPage() {
  return (
    <div className={styles.page}>
      <Header />
      <main className={styles.main}>
        <div className={styles.hero}>
          <h1>Complete Your Purchase</h1>
        </div>
        <div className={styles.content}>
          <Suspense fallback={<div>Loading checkout...</div>}>
            <CheckoutClient />
          </Suspense>
        </div>
      </main>
    </div>
  );
}
