import Link from 'next/link';
import Header from '@/components/Header';
import { prisma } from '@/lib/prisma';
import styles from './page.module.css';

// Force dynamic rendering so we always get fresh categories
export const dynamic = 'force-dynamic';

export default async function CategoriesPage() {
  const categories = await prisma.category.findMany({
    where: { active: true },
    include: {
      _count: {
        select: { nominees: true, votes: true }
      }
    }
  });

  return (
    <div className={styles.page}>
      <Header />
      <main className={styles.main}>
        <div className={styles.header}>
          <h1>Award Categories</h1>
          <p>Browse the official categories for Bukla Awards 2026 and cast your vote.</p>
        </div>

        <div className={styles.grid}>
          {categories.map((category) => (
            <div key={category.id} className={styles.card}>
              <div className={styles.cardHeader}>
                <h2>{category.name}</h2>
              </div>
              <div className={styles.cardBody}>
                <p>{category.description}</p>
                <div className={styles.stats}>
                  <span><strong>{category._count.nominees}</strong> Nominees</span>
                  <span><strong>{category._count.votes}</strong> Votes Cast</span>
                </div>
              </div>
              <div className={styles.cardFooter}>
                <Link href={`/vote/${category.id}`} className={styles.voteBtn}>
                  VOTE NOW
                </Link>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
