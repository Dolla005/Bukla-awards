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

  return (
    <>
      {!hasVotingStarted && (
        <div className={styles.lockedVotingContainer} style={{ marginBottom: '2rem' }}>
          <div className={styles.lockedHeader}>
            <Lock size={32} className={styles.lockIcon} />
            <h2>Voting Has Not Started Yet</h2>
            <p>Voting for the Bukla Awards 2026 will officially begin in:</p>
          </div>
          <div className={styles.countdownWrapper}>
            <CountdownWidget targetDate={votingStartDate} title="VOTING OPENS IN" />
          </div>
        </div>
      )}

    <div className={styles.grid}>
      {categories.map((category) => (
        <div key={category.id} className={styles.card}>
          <div className={styles.cardHeader}>
            <div className="academy-title-wrapper" style={{ marginBottom: 0 }}>
              <img src="/images/laurel-left.svg" alt="" className="academy-laurel" style={{ width: '24px' }} />
              <h2 style={{ fontSize: '1.25rem', margin: 0, color: 'var(--primary-gold-light)', fontFamily: 'var(--font-serif)', letterSpacing: '2px', textTransform: 'uppercase' }}>
                {category.name}
              </h2>
              <img src="/images/laurel-right.svg" alt="" className="academy-laurel" style={{ width: '24px' }} />
            </div>
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
    </>
  );
}
