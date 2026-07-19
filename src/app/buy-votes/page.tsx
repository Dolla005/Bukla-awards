import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import Header from '@/components/Header';
import BuyVotesClient from './BuyVotesClient';
import styles from './page.module.css';

export const metadata = {
  title: 'Buy Votes | Bukla Awards',
  description: 'Purchase votes for your favorite nominees at Bukla Awards',
};

export default async function BuyVotesPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/login?callbackUrl=/buy-votes');
  }

  return (
    <div className={styles.page}>
      <Header />
      <main className={styles.main}>
        <div className={styles.header}>
          <h1>Buy Votes</h1>
          <p>Support your favorite nominees by purchasing votes. Minimum purchase is 10 votes at Ksh 25 each.</p>
        </div>
        
        <BuyVotesClient />
      </main>
    </div>
  );
}
