import { prisma } from '@/lib/prisma';
import styles from '../categories/page.module.css'; // Reuse table styles
import ReviewButtons from './ReviewButtons';

export default async function NominationsAdmin() {
  const submissions = await prisma.nominationSubmission.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      category: true
    }
  });

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>Public Nominations</h1>
          <p className={styles.subtitle}>Review and approve nominations submitted by users</p>
        </div>
      </header>

      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Nominee / Club</th>
              <th>Category</th>
              <th>Instagram</th>
              <th>Reason</th>
              <th>Submitted By</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {submissions.map((sub) => (
              <tr key={sub.id}>
                <td className={styles.categoryName}>{sub.nomineeName}</td>
                <td>{sub.category.name}</td>
                <td>{sub.instagram ? `@${sub.instagram}` : '-'}</td>
                <td style={{ maxWidth: '200px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {sub.reason || '-'}
                </td>
                <td>
                  {sub.submitterName || 'Anonymous'}<br />
                  <small style={{ color: 'var(--text-muted)' }}>{sub.submitterPhone}</small>
                </td>
                <td>
                  {sub.status === 'PENDING' && (
                    <span style={{ color: '#fbbf24', background: 'rgba(251, 191, 36, 0.1)', padding: '0.25rem 0.5rem', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 600 }}>PENDING</span>
                  )}
                  {sub.status === 'APPROVED' && (
                    <span style={{ color: '#4ade80', background: 'rgba(34, 197, 94, 0.1)', padding: '0.25rem 0.5rem', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 600 }}>APPROVED</span>
                  )}
                  {sub.status === 'REJECTED' && (
                    <span style={{ color: '#f87171', background: 'rgba(239, 68, 68, 0.1)', padding: '0.25rem 0.5rem', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 600 }}>REJECTED</span>
                  )}
                </td>
                <td>
                  {sub.status === 'PENDING' ? (
                    <ReviewButtons submissionId={sub.id} />
                  ) : (
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Reviewed</span>
                  )}
                </td>
              </tr>
            ))}
            {submissions.length === 0 && (
              <tr>
                <td colSpan={7} className={styles.emptyState}>
                  No public nominations found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
