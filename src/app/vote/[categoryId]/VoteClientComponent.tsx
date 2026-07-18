'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CheckCircle2 } from 'lucide-react';
import styles from './VoteClientComponent.module.css';

export default function VoteClientComponent({ category, nominees }: { category: any, nominees: any[] }) {
  const [selectedNominee, setSelectedNominee] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const router = useRouter();

  const handleVote = async () => {
    if (!selectedNominee) return;
    setLoading(true);
    setError('');
    
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

      setSuccess('Your vote has been successfully cast!');
      router.refresh();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      {error && <div className={styles.error}>{error}</div>}
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
        <button 
          className={styles.submitBtn} 
          disabled={!selectedNominee || loading || !!success}
          onClick={handleVote}
        >
          {loading ? 'SUBMITTING...' : 'CAST YOUR VOTE'}
        </button>
      </div>
    </div>
  );
}
