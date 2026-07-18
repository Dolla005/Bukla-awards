'use client';

import { Suspense, useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/Header';
import styles from './page.module.css';

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/categories';
  
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const res = await signIn('credentials', {
      redirect: false,
      phone,
      password,
    });

    setLoading(false);

    if (res?.error) {
      setError(res.error);
    } else {
      router.push(callbackUrl);
      router.refresh();
    }
  };

  return (
    <form onSubmit={handleLogin} className={styles.form}>
      {error && <div className={styles.error}>{error}</div>}
      
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
          placeholder="••••••••" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      <button type="submit" className={styles.submitBtn} disabled={loading}>
        {loading ? 'LOGGING IN...' : 'LOG IN'}
      </button>
    </form>
  );
}

export default function LoginPage() {
  return (
    <div className={styles.page}>
      <Header />
      <main className={styles.main}>
        <div className={styles.authContainer}>
          <div className={styles.authHeader}>
            <h1>Welcome Back</h1>
            <p>Log in to cast your votes and support your favorites.</p>
          </div>

          <Suspense fallback={<div style={{ textAlign: 'center', padding: '2rem' }}>Loading form...</div>}>
            <LoginForm />
          </Suspense>

          <p className={styles.footerText}>
            Don't have an account? <Link href="/signup">Sign up here</Link>
          </p>
        </div>
      </main>
    </div>
  );
}
