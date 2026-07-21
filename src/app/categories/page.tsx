import Link from 'next/link';
import Header from '@/components/Header';
import { prisma } from '@/lib/prisma';
import styles from './page.module.css';
import CategoriesClient from './CategoriesClient';

// Force dynamic rendering so we always get fresh categories
export const dynamic = 'force-dynamic';

export default async function CategoriesPage() {
  const categories = await prisma.category.findMany({
    where: { active: true },
    include: {
      _count: {
        select: { nominees: true, votes: true }
      }
    },
    orderBy: [
      { orderIndex: 'asc' },
      { name: 'asc' }
    ]
  });

  const votingStartDateSetting = await prisma.systemSetting.findUnique({
    where: { key: 'votingStartDate' }
  });
  
  // Default to a future date if not set for demonstration
  const votingStartDate = votingStartDateSetting?.value || '2026-11-01T00:00:00Z';

  return (
    <div className={styles.page}>
      <Header />
      <main className={styles.main}>
        <div className={styles.header}>
          <h1>Award Categories</h1>
          <p>Browse the official categories for Bukla Awards 2026 and cast your vote.</p>
        </div>

        <CategoriesClient categories={categories} votingStartDate={votingStartDate} />
      </main>
    </div>
  );
}
