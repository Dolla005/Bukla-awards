import Header from '@/components/Header';
import styles from './page.module.css';

export default function NewsPage() {
  return (
    <div className={styles.page}>
      <Header />
      <main className={styles.main}>
        <div className={styles.hero}>
          <h1>Nightlife News</h1>
          <p>The latest updates, interviews, and stories from Kenya's entertainment scene.</p>
        </div>
        
        <div className={styles.content}>
          <div className={styles.grid}>
            {/* Placeholder News Items */}
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <article key={item} className={styles.card}>
                <div className={styles.imagePlaceholder}></div>
                <div className={styles.info}>
                  <span className={styles.date}>Dec 10, 2025</span>
                  <h2>Exciting Updates for Bukla Awards 2026</h2>
                  <p>Read about the new categories and changes coming to this year's biggest nightlife event...</p>
                  <button className={styles.readMore}>Read More</button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
