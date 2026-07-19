'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './page.module.css';

export default function BuyVotesClient() {
  const [amount, setAmount] = useState<number | ''>(10);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const router = useRouter();

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value);
    setAmount(isNaN(val) ? '' : val);
  };

  const cost = typeof amount === 'number' ? amount * 25 : 0;

  const handlePurchase = async () => {
    if (typeof amount !== 'number' || amount < 10) {
      setError('Minimum purchase is 10 votes.');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const res = await fetch('/api/buy-votes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to complete purchase');
      }

      setSuccess(data.message);
      setTimeout(() => {
        router.push('/categories');
      }, 2000);
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

      <div className={styles.card}>
        <div className={styles.inputGroup}>
          <label htmlFor="amount">Number of Votes to Buy</label>
          <input 
            type="number" 
            id="amount" 
            min="10" 
            value={amount} 
            onChange={handleAmountChange} 
            className={styles.input}
          />
          <p className={styles.hint}>Minimum 10 votes.</p>
        </div>

        <div className={styles.summary}>
          <div className={styles.summaryRow}>
            <span>Price per vote:</span>
            <span>Ksh 25</span>
          </div>
          <div className={styles.summaryRow}>
            <span>Total votes:</span>
            <span>{typeof amount === 'number' ? amount : 0}</span>
          </div>
          <div className={`${styles.summaryRow} ${styles.total}`}>
            <span>Total Cost:</span>
            <span>Ksh {cost.toLocaleString()}</span>
          </div>
        </div>

        <button 
          className={styles.payBtn} 
          onClick={handlePurchase}
          disabled={loading || typeof amount !== 'number' || amount < 10}
        >
          {loading ? 'PROCESSING...' : 'PAY WITH M-PESA (SIMULATE)'}
        </button>
      </div>
    </div>
  );
}
