'use client';

import { useState } from 'react';
import styles from './NominateForm.module.css';

export default function NominateForm({ categories }: { categories: any[] }) {
  const [formData, setFormData] = useState({
    nomineeName: '',
    categoryId: '',
    instagram: '',
    reason: '',
    submitterName: '',
    submitterPhone: ''
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');

    try {
      const res = await fetch('/api/nominate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to submit nomination');
      }

      setStatus('success');
      setFormData({
        nomineeName: '',
        categoryId: '',
        instagram: '',
        reason: '',
        submitterName: '',
        submitterPhone: ''
      });
    } catch (err: any) {
      setStatus('error');
      setErrorMsg(err.message);
    }
  };

  if (status === 'success') {
    return (
      <div className={styles.successState}>
        <div className={styles.successIcon}>✓</div>
        <h2>Nomination Submitted!</h2>
        <p>Thank you for your nomination. Our team will review it shortly.</p>
        <button onClick={() => setStatus('idle')} className={styles.submitBtn}>
          Submit Another Nomination
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      {status === 'error' && <div className={styles.errorAlert}>{errorMsg}</div>}
      
      <div className={styles.section}>
        <h3>Nominee Details</h3>
        
        <div className={styles.inputGroup}>
          <label>Name of Nominee / Club / Brand *</label>
          <input 
            type="text" 
            required 
            value={formData.nomineeName}
            onChange={(e) => setFormData({...formData, nomineeName: e.target.value})}
            placeholder="e.g. DJ Joe Mfalme"
          />
        </div>

        <div className={styles.inputGroup}>
          <label>Category *</label>
          <select 
            required
            value={formData.categoryId}
            onChange={(e) => setFormData({...formData, categoryId: e.target.value})}
          >
            <option value="">-- Select a Category --</option>
            {categories.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
        </div>

        <div className={styles.inputGroup}>
          <label>Instagram Handle (Optional)</label>
          <input 
            type="text" 
            value={formData.instagram}
            onChange={(e) => setFormData({...formData, instagram: e.target.value})}
            placeholder="e.g. @djjoemfalme"
          />
        </div>

        <div className={styles.inputGroup}>
          <label>Why do they deserve to win? (Optional)</label>
          <textarea 
            rows={4}
            value={formData.reason}
            onChange={(e) => setFormData({...formData, reason: e.target.value})}
            placeholder="Tell us what makes them stand out..."
          ></textarea>
        </div>
      </div>

      <div className={styles.section}>
        <h3>Your Details (Optional)</h3>
        <p className={styles.helpText}>Provide your details so we can contact you if we need more information.</p>
        
        <div className={styles.inputRow}>
          <div className={styles.inputGroup}>
            <label>Your Name</label>
            <input 
              type="text" 
              value={formData.submitterName}
              onChange={(e) => setFormData({...formData, submitterName: e.target.value})}
              placeholder="John Doe"
            />
          </div>
          
          <div className={styles.inputGroup}>
            <label>Phone Number</label>
            <input 
              type="text" 
              value={formData.submitterPhone}
              onChange={(e) => setFormData({...formData, submitterPhone: e.target.value})}
              placeholder="0712345678"
            />
          </div>
        </div>
      </div>

      <button type="submit" className={styles.submitBtn} disabled={status === 'loading'}>
        {status === 'loading' ? 'SUBMITTING...' : 'SUBMIT NOMINATION'}
      </button>
    </form>
  );
}
