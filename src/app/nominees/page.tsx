import { prisma } from '@/lib/prisma';
import Header from '@/components/Header';
import Image from 'next/image';
import styles from './page.module.css';

export default async function NomineesPage() {
  const categories = await prisma.category.findMany({
    where: { active: true },
    include: {
      nominees: {
        where: { verified: true }
      }
    },
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
          <h1>Official Nominees</h1>
          <p>Meet the outstanding individuals and venues nominated for the 2026 Bukla Awards.</p>
        </div>
        
        <div className={styles.content}>
          {categories.map((category) => (
            <div key={category.id} className={styles.categorySection}>
              <h2>{category.name}</h2>
              <div className={styles.grid}>
                {category.nominees.length > 0 ? (
                  category.nominees.map((nominee) => (
                    <div key={nominee.id} className={styles.card}>
                      <div className={styles.imageWrapper}>
                        <Image
                          src={nominee.photoUrl || '/images/star-trophy.png'}
                          alt={nominee.name}
                          fill
                          className={styles.image}
                        />
                      </div>
                      <div className={styles.info}>
                        <h3>{nominee.name}</h3>
                        {nominee.club && <p className={styles.club}>{nominee.club}</p>}
                        {nominee.county && <p className={styles.county}>{nominee.county}</p>}
                      </div>
                    </div>
                  ))
                ) : (
                  <p className={styles.emptyText}>Nominees for this category will be announced soon.</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
