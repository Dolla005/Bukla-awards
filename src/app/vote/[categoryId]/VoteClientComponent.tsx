'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { CheckCircle2, Wallet, Lock } from 'lucide-react';
import Link from 'next/link';
import CountdownWidget from '@/components/CountdownWidget';
import styles from './VoteClientComponent.module.css';

export default function VoteClientComponent({ 
  category, 
  nominees,
  votingStartDate
}: { 
  category: any; 
  nominees: any[];
  votingStartDate?: string;
}) {
  const [selectedNominee, setSelectedNominee] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [hasVotingStarted, setHasVotingStarted] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (votingStartDate) {
      const targetTime = new Date(votingStartDate).getTime();
      const now = new Date().getTime();
      setHasVotingStarted(now >= targetTime);
      
      // Setup interval to check when voting opens if it hasn't already
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

  const handleVote = async () => {
    if (!selectedNominee) return;

    setLoading(true);
    setError('');
    setSuccess('');
    
    try {
      const res = await fetch('/api/vote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          categoryId: category.id,
          nomineeId: selectedNominee
        })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit vote');
      }

      setSuccess(data.message || `Successfully cast your vote!`);
      
      // Update local state and router will refresh server props
      setTimeout(() => {
        setSuccess('');
        setSelectedNominee(null);
        setSuccess('');
        setSelectedNominee(null);
        router.refresh();
      }, 3000);
      
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      {!hasVotingStarted && (
        <div className={styles.lockedVotingContainer}>
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

      {hasVotingStarted && (
        <>
      {error && (
        <div className={styles.error}>
          <p>{error}</p>
        </div>
      )}
      {success && <div className={styles.success}>{success}</div>}

      <div className={styles.grid}>
        {nominees.map((nominee) => (
          <div 
            key={nominee.id} 
            className={`${styles.card} ${selectedNominee === nominee.id ? styles.selected : ''}`}
            onClick={() => setSelectedNominee(nominee.id)}
          >
            <div className={styles.imageContainer}>
              <img src={nominee.photoUrl || 'https://via.placeholder.com/150'} alt={nominee.name} className={styles.image} />
              {selectedNominee === nominee.id && (
                <div className={styles.checkOverlay}>
                  <CheckCircle2 size={40} />
                </div>
              )}
            </div>
            <div className={styles.info}>
              <h3>{nominee.name} {nominee.verified && <CheckCircle2 size={14} className={styles.verified} />}</h3>
              {nominee.club && <p>{nominee.club}</p>}
            </div>
          </div>
        ))}
      </div>

      <div className={styles.actionArea}>
        <div className={styles.voteControls}>
          <button 
            className={styles.submitBtn} 
            disabled={!selectedNominee || loading || !!success}
            onClick={handleVote}
          >
            {loading ? 'PROCESSING PAYMENT...' : 'PAY KSH 25 & VOTE'}
          </button>
        </div>
      </div>
        </>
      )}
    </div>
  );
}
