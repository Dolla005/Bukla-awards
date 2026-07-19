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

    </div>
  );
}
