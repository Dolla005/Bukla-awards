import { prisma } from '@/lib/prisma';
import styles from './page.module.css';

export const dynamic = 'force-dynamic';

export default async function AdminTickets() {
  const tickets = await prisma.ticketOrder.findMany({
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>Ticket Purchases</h2>
      </div>

      <div className={styles.tableContainer}>
        {tickets.length === 0 ? (
          <div className={styles.emptyState}>No ticket orders found.</div>
        ) : (
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Date</th>
                <th>Name</th>
                <th>Contact</th>
                <th>Type</th>
                <th>Qty</th>
                <th>Total (KSH)</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {tickets.map((t) => (
                <tr key={t.id}>
                  <td>{new Date(t.createdAt).toLocaleString()}</td>
                  <td className={styles.name}>{t.name}</td>
                  <td>
                    <div className={styles.email}>{t.email}</div>
                    <div className={styles.phone}>{t.phone}</div>
                  </td>
                  <td>
                    <span className={styles.ticketTypeBadge}>{t.ticketType}</span>
                  </td>
                  <td>{t.quantity}</td>
                  <td className={styles.amount}>{t.totalAmount.toLocaleString()}</td>
                  <td>
                    <span className={`${styles.badge} ${styles[t.status.toLowerCase()] || styles.pending}`}>
                      {t.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
