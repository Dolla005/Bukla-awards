import { prisma } from '@/lib/prisma';
import Header from '@/components/Header';
import NominateForm from './NominateForm';
import styles from './page.module.css';

export default async function NominatePage() {
  const categories = await prisma.category.findMany({
    where: { active: true },
    orderBy: [
      { orderIndex: 'asc' },
      { name: 'asc' }
    ]
  });

  return (
    <div className={styles.page}>
      <Header />
      <main className={styles.main}>
        <div className={styles.hero}>
          <h1>Submit a Nomination</h1>
          <p>Know someone who deserves recognition in Kenya's nightlife industry? Nominate them below.</p>
        </div>
        
        <div className={styles.formContainer}>
          <NominateForm categories={categories} />
        </div>
      </main>
    </div>
  );
}
