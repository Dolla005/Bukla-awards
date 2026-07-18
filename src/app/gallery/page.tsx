import Header from '@/components/Header';
import styles from './page.module.css';

export default function GalleryPage() {
  return (
    <div className={styles.page}>
      <Header />
      <main className={styles.main}>
        <div className={styles.hero}>
          <h1>Event Gallery</h1>
          <p>Relive the best moments from Kenya's nightlife and past Bukla Awards events.</p>
        </div>
        
        <div className={styles.content}>
          <div className={styles.grid}>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((item) => (
              <div key={item} className={styles.imagePlaceholder}>
                <span>Photo {item}</span>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
