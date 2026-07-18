import { prisma } from '@/lib/prisma';
import styles from './page.module.css';
import ConfettiClient from '@/components/ConfettiClient';
import { Crown, Trophy } from 'lucide-react';
import Image from 'next/image';

export const dynamic = 'force-dynamic';

export default async function ResultsPage() {
  const showResultsSetting = await prisma.systemSetting.findUnique({
    where: { key: 'showResults' }
  });

  if (showResultsSetting?.value !== 'true') {
    return (
      <div className={styles.notPublished}>
        <Trophy size={64} color="var(--primary)" style={{ margin: '0 auto 2rem' }} />
        <h2>Results Not Published Yet</h2>
        <p>The final vote tally is currently being calculated. Check back later!</p>
      </div>
    );
  }

  // Fetch all categories with nominees and their vote counts
  const categories = await prisma.category.findMany({
    include: {
      nominees: {
        include: {
          _count: {
            select: { votes: true }
          }
        }
      }
    }
  });

  // Calculate winner for each category
  const winners = categories.map(category => {
    if (category.nominees.length === 0) return null;

    // Sort by vote count descending
    const sorted = [...category.nominees].sort((a, b) => b._count.votes - a._count.votes);
    
    return {
      categoryName: category.name,
      winner: sorted[0]
    };
  }).filter(Boolean);

  return (
    <div className={styles.page}>
      <ConfettiClient />
      
      <header className={styles.header}>
        <h1 className={styles.title}>Official Results</h1>
        <p className={styles.subtitle}>Congratulations to all the winners of the Bukla Awards 2026!</p>
      </header>

      <div className={styles.grid}>
        {winners.map((data: any) => (
          <div key={data.winner.id} className={styles.winnerCard}>
            <Crown size={32} className={styles.winnerCrown} />
            
            {data.winner.photoUrl ? (
              <Image 
                src={data.winner.photoUrl} 
                alt={data.winner.name} 
                width={120} 
                height={120} 
                className={styles.avatar} 
              />
            ) : (
              <div className={styles.avatar}>
                {data.winner.name.charAt(0).toUpperCase()}
              </div>
            )}
            
            <h3 className={styles.categoryName}>{data.categoryName}</h3>
            <h2 className={styles.winnerName}>{data.winner.name}</h2>
            
            {data.winner.club && <p style={{ color: 'var(--text-muted)', marginBottom: '1rem' }}>{data.winner.club}</p>}
            
            <div className={styles.votes}>
              <Trophy size={16} />
              {data.winner._count.votes.toLocaleString()} Votes
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
