import { Ticket, ArrowRight, Calendar } from 'lucide-react';
import styles from './TicketsNewsWidgets.module.css';

export default function TicketsNewsWidgets() {
  return (
    <div className={styles.widgets}>
      <div className={styles.ticketWidget}>
        <div className={styles.ticketContent}>
          <h3>AWARDS NIGHT TICKETS</h3>
          <p>Be part of the biggest night in Kenya&apos;s nightlife industry.</p>
          <button className={styles.buyBtn}>
            <Ticket size={16} />
            BUY TICKETS NOW
          </button>
        </div>
      </div>

      <div className={styles.newsWidget}>
        <div className={styles.header}>
          <h3>LATEST NEWS</h3>
          <button className={styles.viewAll}>
            VIEW ALL <ArrowRight size={14} />
          </button>
        </div>

        <div className={styles.newsItem}>
          <div className={styles.newsImage}>
            <img src="https://images.unsplash.com/photo-1540039155732-680874a8d462?w=100&h=100&fit=crop" alt="News thumbnail" />
          </div>
          <div className={styles.newsContent}>
            <span className={styles.tag}>AWARDS</span>
            <h4>Bukla Awards 2026 Nomination Phase Now Open!</h4>
            <div className={styles.date}>
              <Calendar size={12} />
              May 24, 2026
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
