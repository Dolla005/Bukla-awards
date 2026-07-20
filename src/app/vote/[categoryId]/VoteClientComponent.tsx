'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CheckCircle2, Wallet } from 'lucide-react';
import Link from 'next/link';
import styles from './VoteClientComponent.module.css';

export default function VoteClientComponent({ category, nominees, initialVoteBalance = 0 }: { category: any, nominees: any[], initialVoteBalance?: number }) {
  const [selectedNominee, setSelectedNominee] = useState<string | null>(null);
  const [voteAmount, setVoteAmount] = useState<number | ''>(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [insufficientBalance, setInsufficientBalance] = useState(false);
  const router = useRouter();

  const handleVote = async () => {
    if (!selectedNominee) return;
    if (typeof voteAmount !== 'number' || voteAmount < 1) {
      setError('Please enter a valid amount of votes to cast (minimum 1).');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');
    setInsufficientBalance(false);
    
    try {
      const res = await fetch('/api/vote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          categoryId: category.id,
          nomineeId: selectedNominee,
          amount: voteAmount
        })
      });

      const data = await res.json();

      if (!res.ok) {
        if (data.insufficientBalance) {
          setInsufficientBalance(true);
        }
        throw new Error(data.error || 'Failed to submit vote');
      }

      setSuccess(`Successfully cast ${voteAmount} vote(s)!`);
      
      // Update local state and router will refresh server props
      setTimeout(() => {
        setSuccess('');
        setSelectedNominee(null);
        setVoteAmount(1);
        router.refresh();
      }, 3000);
      
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value);
    setVoteAmount(isNaN(val) ? '' : val);
  };

  return (
    <div className={styles.container}>
      <div className={styles.balanceCard}>
        <div className={styles.balanceInfo}>
          <Wallet size={24} className={styles.walletIcon} />
          <div>
            <h3>Your Vote Balance</h3>
            <p>{initialVoteBalance.toLocaleString()} votes available</p>
          </div>
        </div>
        <Link href="/buy-votes" className={styles.buyBtn}>BUY MORE VOTES</Link>
      </div>

      {error && (
        <div className={styles.error}>
          <p>{error}</p>
          {insufficientBalance && (
            <Link href="/buy-votes" className={styles.errorLink}>Click here to buy votes</Link>
          )}
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
              {nominee.region && <span className={styles.regionBadge}>{nominee.region}</span>}
            </div>
          </div>
        ))}
      </div>

      <div className={styles.actionArea}>
        <div className={styles.voteControls}>
          <div className={styles.amountInput}>
            <label htmlFor="voteAmount">Votes to cast:</label>
            <input 
              type="number" 
              id="voteAmount" 
              min="1" 
              value={voteAmount} 
              onChange={handleAmountChange} 
            />
          </div>
          <button 
            className={styles.submitBtn} 
            disabled={!selectedNominee || loading || !!success || typeof voteAmount !== 'number' || voteAmount < 1}
            onClick={handleVote}
          >
            {loading ? 'SUBMITTING...' : `CAST ${typeof voteAmount === 'number' && voteAmount > 0 ? voteAmount : ''} VOTE(S)`}
          </button>
        </div>
      </div>
    </div>
  );
}
