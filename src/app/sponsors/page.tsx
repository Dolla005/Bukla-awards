import Header from '@/components/Header';
import styles from './page.module.css';

export default function SponsorsPage() {
  return (
    <div className={styles.page}>
      <Header />
      <main className={styles.main}>
        <div className={styles.hero}>
          <h1>Our Sponsors</h1>
          <p>Partnering with the leading brands to celebrate Kenya's nightlife.</p>
        </div>
        
        <div className={styles.content}>
          <section className={styles.section}>
            <h2>Headline Partners</h2>
            <div className={styles.grid}>
              <div className={styles.sponsorCard}>Logo Placeholder</div>
              <div className={styles.sponsorCard}>Logo Placeholder</div>
            </div>
          </section>

          <section className={styles.section}>
            <h2>Category Sponsors</h2>
            <div className={styles.gridSmall}>
              <div className={styles.sponsorCardSmall}>Logo Placeholder</div>
              <div className={styles.sponsorCardSmall}>Logo Placeholder</div>
              <div className={styles.sponsorCardSmall}>Logo Placeholder</div>
              <div className={styles.sponsorCardSmall}>Logo Placeholder</div>
            </div>
          </section>

          <section className={styles.becomeSponsor}>
            <h2>Become a Sponsor</h2>
            <p>Elevate your brand by partnering with the biggest nightlife awards in the region.</p>
            <button className={styles.contactBtn}>Contact Partnerships Team</button>
          </section>
        </div>
      </main>
    </div>
  );
}
