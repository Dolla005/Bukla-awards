import Image from 'next/image';
import Link from 'next/link';
import { Users, BarChart2, List } from 'lucide-react';
import styles from './Hero.module.css';
import CountdownWidget from './CountdownWidget';
import { prisma } from '@/lib/prisma';

export default async function Hero() {
  const [dateSetting, locationSetting, showResultsSetting] = await Promise.all([
    prisma.systemSetting.findUnique({ where: { key: 'eventDate' } }),
    prisma.systemSetting.findUnique({ where: { key: 'eventLocation' } }),
    prisma.systemSetting.findUnique({ where: { key: 'showResults' } })
  ]);

  const targetDate = dateSetting?.value || '2026-12-19T18:00:00Z';
  const location = locationSetting?.value || 'KICC, NAIROBI';
  const showResults = showResultsSetting?.value === 'true';

  return (
    <section className={styles.hero}>
      <div className={styles.background}>
        <Image
          src="/images/hero-bg.png"
          alt="Stage Background"
          fill
          priority
          className={styles.bgImage}
        />
        <div className={styles.overlay}></div>
      </div>

      <div className="academy-diagonal-overlay" style={{ zIndex: 1 }}>
        <div className="academy-diagonal-line"></div>
        <div className="academy-diagonal-line"></div>
        <div className="academy-diagonal-line"></div>
      </div>

      <div className={styles.container}>
        <div className={styles.content}>
          <div className="academy-title-wrapper" style={{ marginBottom: '1.5rem', gap: '1rem', flexWrap: 'nowrap' }}>
            <img src="/images/laurel-left.svg" alt="" className="academy-laurel" style={{ width: '24px', opacity: 0.9, flexShrink: 0 }} />
            <p className={styles.subtitle} style={{ marginBottom: 0 }}>KENYA&apos;S BIGGEST NIGHTLIFE AWARDS</p>
            <img src="/images/laurel-right.svg" alt="" className="academy-laurel" style={{ width: '24px', opacity: 0.9, flexShrink: 0 }} />
          </div>
          
          <h1 className={styles.title}>
            <span className={styles.recognizing}>RECOGNIZING EXCELLENCE IN</span> <br />
            <span>KENYA&apos;S NIGHTLIFE INDUSTRY</span>
          </h1>
          <p className={styles.description}>
            Celebrating the best Clubs, DJs, MCs, Hosts, Hostesses, Influencers 
            and everyone who makes the nightlife unforgettable.
          </p>

          <div className={styles.actions}>
            <Link href="/nominate" className={styles.primaryBtn}>
              <Users size={18} />
              NOMINATE NOW
            </Link>
            <Link href="/categories" className={styles.secondaryBtn}>
              <BarChart2 size={18} />
              VOTE NOW
            </Link>
            <Link href="/categories" className={styles.secondaryBtn}>
              <List size={18} />
              VIEW CATEGORIES
            </Link>
          </div>
          <div className={styles.countdownWrapper}>
            <CountdownWidget targetDate={targetDate} location={location} showResults={showResults} />
          </div>
        </div>

      </div>
    </section>
  );
}
