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
  const [showPaymentPrompt, setShowPaymentPrompt] = useState(false);
  const [paymentPhone, setPaymentPhone] = useState('');
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

  const handleVoteClick = () => {
    if (!selectedNominee) return;
    setShowPaymentPrompt(true);
  };

  const confirmPayment = async () => {
    if (!selectedNominee) return;
    if (!paymentPhone || paymentPhone.length < 9) {
      setError('Please enter a valid phone number');
      return;
    }

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
        setShowPaymentPrompt(false);
        setPaymentPhone('');
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

      {error && !showPaymentPrompt && (
        <div className={styles.error}>
          <p>{error}</p>
        </div>
      )}
      {success && !showPaymentPrompt && <div className={styles.success}>{success}</div>}

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

      {hasVotingStarted && (
        <div className={styles.actionArea}>
          <div className={styles.voteControls}>
            <button 
              className={styles.submitBtn} 
              disabled={!selectedNominee || loading || !!success || showPaymentPrompt}
              onClick={handleVoteClick}
            >
              {loading ? 'PROCESSING PAYMENT...' : 'PAY KSH 25 & VOTE'}
            </button>
          </div>
        </div>
      )}

      {showPaymentPrompt && (
        <div className={styles.modalOverlay}>
          <div className={styles.paymentModal}>
            <h3>M-Pesa Payment</h3>
            <p>You are about to pay Ksh 25 to cast your vote.</p>
            
            {error && <div className={styles.error}>{error}</div>}
            {success && <div className={styles.success}>{success}</div>}
            
            <div className={styles.inputGroup}>
              <label>M-Pesa Phone Number</label>
              <input 
                type="text" 
                placeholder="e.g. 0712345678" 
                value={paymentPhone}
                onChange={(e) => setPaymentPhone(e.target.value)}
                disabled={loading || !!success}
              />
            </div>
            
            <div className={styles.modalActions}>
              <button 
                className={styles.cancelBtn} 
                onClick={() => { setShowPaymentPrompt(false); setError(''); }}
                disabled={loading || !!success}
              >
                CANCEL
              </button>
              <button 
                className={styles.submitBtn} 
                onClick={confirmPayment}
                disabled={loading || !!success}
              >
                {loading ? 'PROCESSING...' : 'CONFIRM PAYMENT'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
