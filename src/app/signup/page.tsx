'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import Header from '@/components/Header';
import styles from './page.module.css';

export default function SignupPage() {
  const router = useRouter();
  const [step, setStep] = useState<1 | 2>(1);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      setLoading(false);
      return;
    }

    try {
      const res = await fetch('/api/auth/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to send OTP');
      }

      setStep(2); // Move to OTP step
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyAndSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, phone, password, otpCode })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Invalid OTP or registration failed');
      }

      // Automatically log them in after successful registration
      const loginRes = await signIn('credentials', {
        redirect: false,
        phone,
        password,
      });

      if (loginRes?.error) {
        throw new Error(loginRes.error);
      }

      router.push('/categories');
      router.refresh();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };



  return (
    <div className={styles.page}>
      <Header />
      <main className={styles.main}>
        <div className={styles.authContainer}>
          <div className={styles.authHeader}>
            <h1>Create an Account</h1>
            <p>Join the Bukla Awards and cast your votes.</p>
          </div>

          {step === 1 ? (
            <>


              <form onSubmit={handleSendOtp} className={styles.form}>
                {error && <div className={styles.error}>{error}</div>}
                
                <div className={styles.inputGroup}>
                  <label>Full Name</label>
                  <input 
                    type="text" 
                    placeholder="John Doe" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>

                <div className={styles.inputGroup}>
                  <label>Phone Number</label>
                  <input 
                    type="text" 
                    placeholder="e.g., 0712345678" 
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                  />
                </div>

                <div className={styles.inputGroup}>
                  <label>Password</label>
                  <input 
                    type="password" 
                    placeholder="At least 6 characters" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={6}
                  />
                </div>

                <button type="submit" className={styles.submitBtn} disabled={loading}>
                  {loading ? 'SENDING OTP...' : 'SEND OTP'}
                </button>
              </form>
            </>
          ) : (
            <form onSubmit={handleVerifyAndSignup} className={styles.form}>
              <div style={{ textAlign: 'center', marginBottom: '1rem', color: 'var(--text-secondary)' }}>
                We've sent a 4-digit code to <strong>{phone}</strong>.<br/>
                <small>(For this demo, check the server console for the code)</small>
              </div>

              {error && <div className={styles.error}>{error}</div>}

              <div className={styles.inputGroup}>
                <label>Verification Code</label>
                <input 
                  type="text" 
                  placeholder="e.g. 1234" 
                  value={otpCode}
                  onChange={(e) => setOtpCode(e.target.value)}
                  required
                  maxLength={4}
                  style={{ textAlign: 'center', letterSpacing: '0.5rem', fontSize: '1.5rem' }}
                />
              </div>

              <button type="submit" className={styles.submitBtn} disabled={loading}>
                {loading ? 'VERIFYING...' : 'VERIFY & CREATE ACCOUNT'}
              </button>
              
              <button 
                type="button" 
                onClick={() => setStep(1)} 
                className={styles.backBtn}
                style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', marginTop: '1rem' }}
              >
                &larr; Back to details
              </button>
            </form>
          )}

          {step === 1 && (
            <p className={styles.footerText}>
              Already have an account? <Link href="/login">Log in here</Link>
            </p>
          )}
        </div>
      </main>
    </div>
  );
}
