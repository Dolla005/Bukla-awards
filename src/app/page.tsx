import Header from '@/components/Header';
import Hero from '@/components/Hero';
import StatsBar from '@/components/StatsBar';
import ExploreCategories from '@/components/ExploreCategories';
import TrendingCategories from '@/components/TrendingCategories';
import NomineesSpotlight from '@/components/NomineesSpotlight';
import TicketsNewsWidgets from '@/components/TicketsNewsWidgets';
import styles from './page.module.css';

export default function Home() {
  return (
    <main className={styles.main}>
      <Header />
      <Hero />
      <StatsBar />
      
      <div className={styles.contentContainer}>
        <div className={styles.grid}>
          <div className={styles.mainColumn}>
            <ExploreCategories />
            <NomineesSpotlight />
          </div>
          <div className={styles.sidebarColumn}>
            <TrendingCategories />
            <TicketsNewsWidgets />
          </div>
        </div>
      </div>
    </main>
  );
}
