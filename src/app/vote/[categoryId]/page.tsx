import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import { prisma } from '@/lib/prisma';
import styles from './page.module.css';
import VoteClientComponent from './VoteClientComponent';

export const dynamic = 'force-dynamic';

export default async function VotePage({ params }: { params: Promise<{ categoryId: string }> }) {
  const { categoryId } = await params;
  
  const category = await prisma.category.findUnique({
    where: { id: categoryId },
    include: {
      nominees: true,
      _count: {
        select: { votes: true }
      }
    }
  });

  if (!category) {
    notFound();
  }

  return (
    <div className={styles.page}>
      <Header />
      <main className={styles.main}>
        <div className={styles.header}>
          <h1>{category.name}</h1>
          <p>{category.description}</p>
          <div className={styles.stats}>
            Total Votes Cast: <strong>{category._count.votes}</strong>
          </div>
        </div>

        <VoteClientComponent category={category} nominees={category.nominees} />
      </main>
    </div>
  );
}
