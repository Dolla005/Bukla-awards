import { prisma } from '@/lib/prisma';
import styles from './page.module.css';

export default async function CategoriesAdmin() {
  const categories = await prisma.category.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      _count: {
        select: { nominees: true, votes: true }
      }
    }
  });

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>Manage Categories</h1>
          <p className={styles.subtitle}>View and manage all active voting categories</p>
        </div>
      </header>

      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Category Name</th>
              <th>Status</th>
              <th>Nominees</th>
              <th>Total Votes</th>
              <th>Created At</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((cat) => (
              <tr key={cat.id}>
                <td className={styles.categoryName}>{cat.name}</td>
                <td>
                  <span className={cat.active ? styles.statusActive : styles.statusInactive}>
                    {cat.active ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td>{cat._count.nominees}</td>
                <td>{cat._count.votes.toLocaleString()}</td>
                <td>{cat.createdAt.toLocaleDateString()}</td>
              </tr>
            ))}
            {categories.length === 0 && (
              <tr>
                <td colSpan={5} className={styles.emptyState}>
                  No categories found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
