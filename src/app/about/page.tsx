import Header from '@/components/Header';
import styles from './page.module.css';

export default function AboutPage() {
  return (
    <div className={styles.page}>
      <Header />
      <main className={styles.main}>
        <div className={styles.hero}>
          <h1>About Bukla Awards</h1>
          <p>The Official Digital Home of Kenya's Nightlife Industry.</p>
        </div>
        
        <div className={styles.content}>
          <section className={styles.section}>
            <h2>Our Vision</h2>
            <p>
              To be the premier platform that celebrates and elevates the standards of Kenya's vibrant nightlife industry. We believe in recognizing the hard work, creativity, and passion of those who make every night unforgettable.
            </p>
          </section>

          <section className={styles.section}>
            <h2>The Mission</h2>
            <p>
              Bukla Awards was established to create a transparent, inclusive, and prestigious platform where clubs, DJs, MCs, hosts, promoters, and nightlife brands are celebrated. By bringing the community together, we aim to foster growth, inspire excellence, and showcase the best of Kenyan entertainment to the world.
            </p>
          </section>

          <section className={styles.section}>
            <h2>How It Works</h2>
            <div className={styles.grid}>
              <div className={styles.card}>
                <h3>1. Nomination</h3>
                <p>The public and industry insiders submit their nominations for outstanding performers and venues across various categories.</p>
              </div>
              <div className={styles.card}>
                <h3>2. Verification</h3>
                <p>Our academy reviews all submissions to ensure nominees meet the strict criteria for excellence and active participation in the industry.</p>
              </div>
              <div className={styles.card}>
                <h3>3. Voting</h3>
                <p>The verified nominees are presented to the public. Our secure voting portal allows fans to cast their votes and support their favorites.</p>
              </div>
              <div className={styles.card}>
                <h3>4. The Awards Night</h3>
                <p>The culmination of the year—a luxurious gala where the winners are announced, celebrated, and awarded the prestigious Bukla Star Trophy.</p>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
