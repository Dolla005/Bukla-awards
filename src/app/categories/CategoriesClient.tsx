'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Lock } from 'lucide-react';
import CountdownWidget from '@/components/CountdownWidget';
import styles from './page.module.css';

export default function CategoriesClient({ 
  categories,
  votingStartDate
}: { 
  categories: any[];
  votingStartDate: string;
}) {
  const [hasVotingStarted, setHasVotingStarted] = useState(true);

  useEffect(() => {
    if (votingStartDate) {
      const targetTime = new Date(votingStartDate).getTime();
      const now = new Date().getTime();
      setHasVotingStarted(now >= targetTime);
      
      if (now < targetTime) {
        const timer = setInterval(() => {
          if (new Date().getTime() >= targetTime) {
            setHasVotingStarted(true);
            clearInterval(timer);
          }
        }, 1000);
        return () => clearInterval(timer);
      }
    }
  }, [votingStartDate]);

  if (!hasVotingStarted) {
    return (
      <div className={styles.lockedVotingContainer} style={{ marginTop: '3rem', padding: '4rem 2rem', background: 'var(--bg-panel)', border: '1px solid var(--border-gold)', borderRadius: '12px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '2rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
          <Lock size={48} color="var(--primary-gold)" style={{ marginBottom: '0.5rem' }} />
          <h2 style={{ fontSize: '2.5rem', color: 'var(--text-primary)', fontFamily: 'var(--font-serif)' }}>Voting Has Not Started Yet</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem' }}>Voting for the Bukla Awards 2026 will officially begin in:</p>
        </div>
        <div style={{ width: '100%', maxWidth: '600px', margin: '0 auto', background: 'rgba(10, 2, 2, 0.5)', borderRadius: '12px', padding: '1.5rem' }}>
          <CountdownWidget targetDate={votingStartDate} />
        </div>
      </div>
    );
  }

  return (
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
  );
}
