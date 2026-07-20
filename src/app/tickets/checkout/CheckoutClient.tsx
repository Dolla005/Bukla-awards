'use client';

import { useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { createTicketOrder } from './actions';
import styles from './page.module.css';

export default function CheckoutClient() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const ticketType = searchParams.get('type') || 'Regular';
  
  const prices: Record<string, number> = {
    'Regular': 3000,
    'VIP': 10000,
    'VVIP Table': 100000
  };
  const price = prices[ticketType] || 3000;
  
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const formData = new FormData(e.currentTarget);
      await createTicketOrder(formData);
      setSuccess(true);
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className={styles.successCard}>
        <h2>Ticket Reserved Successfully!</h2>
        <p>Thank you for reserving your {ticketType} ticket(s).</p>
        <div className={styles.paymentInstructions}>
          <h3>Payment Instructions</h3>
          <p>Please send <strong>KSH {(price * quantity).toLocaleString()}</strong> to our MPESA Till Number to finalize your order.</p>
          <div className={styles.tillInfo}>
            <span>Buy Goods Till Number:</span>
            <strong>123456</strong>
          </div>
          <p>Your ticket will be verified and sent to your email once payment is confirmed.</p>
        </div>
        <button onClick={() => router.push('/tickets')} className={styles.backBtn}>Back to Tickets</button>
      </div>
    );
  }

  return (
    <div className={styles.checkoutForm}>
      <h2>Checkout: {ticketType} Ticket</h2>
      <p className={styles.priceSummary}>Price per ticket: KSH {price.toLocaleString()}</p>
      
      {error && <div className={styles.error}>{error}</div>}
      
      <form onSubmit={handleSubmit}>
        <input type="hidden" name="ticketType" value={ticketType} />
        
        <div className={styles.formGroup}>
          <label>Full Name</label>
          <input type="text" name="name" required placeholder="John Doe" />
        </div>
        
        <div className={styles.formGroup}>
          <label>Email Address</label>
          <input type="email" name="email" required placeholder="john@example.com" />
        </div>
        
        <div className={styles.formGroup}>
          <label>Phone Number (M-PESA)</label>
          <input type="tel" name="phone" required placeholder="0700000000" />
        </div>
        
        <div className={styles.formGroup}>
          <label>Quantity</label>
          <input 
            type="number" 
            name="quantity" 
            min="1" 
            max="10" 
            value={quantity} 
            onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
            required 
          />
        </div>
        
        <div className={styles.totalSection}>
          <span>Total Amount:</span>
          <strong>KSH {(price * quantity).toLocaleString()}</strong>
        </div>
        
        <button type="submit" className={styles.submitBtn} disabled={loading}>
          {loading ? 'Processing...' : 'Reserve Ticket & Pay'}
        </button>
      </form>
    </div>
  );
}
