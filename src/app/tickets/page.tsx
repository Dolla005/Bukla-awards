import Link from 'next/link';
import Header from '@/components/Header';
import styles from './page.module.css';

export default function TicketsPage() {
  return (
    <div className={styles.page}>
      <Header />
      <main className={styles.main}>
        <div className={styles.hero}>
          <h1>Get Your Tickets</h1>
          <p>Secure your spot at Kenya's most prestigious nightlife event.</p>
        </div>
        
        <div className={styles.content}>
          <div className={styles.grid}>
            <div className={styles.ticketCard}>
              <div className={styles.ticketHeader}>
                <h2>Regular</h2>
                <div className={styles.price}>KSH 3,000</div>
              </div>
              <ul className={styles.features}>
                <li>General Admission</li>
                <li>Access to Main Arena</li>
                <li>Cash Bar Access</li>
              </ul>
              <Link href="/tickets/checkout?type=Regular" className={styles.buyBtn}>Buy Now</Link>
            </div>

            <div className={`${styles.ticketCard} ${styles.vipCard}`}>
              <div className={styles.popularBadge}>Most Popular</div>
              <div className={styles.ticketHeader}>
                <h2>VIP</h2>
                <div className={styles.price}>KSH 10,000</div>
              </div>
              <ul className={styles.features}>
                <li>VIP Red Carpet Entry</li>
                <li>Premium Seating Area</li>
                <li>Welcome Drinks</li>
                <li>Dedicated VIP Bar</li>
              </ul>
              <Link href="/tickets/checkout?type=VIP" className={styles.buyBtn}>Buy VIP</Link>
            </div>

            <div className={styles.ticketCard}>
              <div className={styles.ticketHeader}>
                <h2>VVIP Table (Groups of 6)</h2>
                <div className={styles.price}>KSH 100,000</div>
              </div>
              <ul className={styles.features}>
                <li>Exclusive VVIP Lounge</li>
                <li>Premium Bottle Service</li>
                <li>Gourmet Canapés</li>
                <li>Meet & Greet Access</li>
                <li>Dedicated Hostess</li>
              </ul>
              <Link href="/tickets/checkout?type=VVIP Table" className={styles.buyBtn}>Reserve Table</Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
