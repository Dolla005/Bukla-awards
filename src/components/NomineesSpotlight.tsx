import Link from 'next/link';
import { ArrowRight, ChevronLeft, ChevronRight, CheckCircle2 } from 'lucide-react';
import styles from './NomineesSpotlight.module.css';

export default function NomineesSpotlight() {
  const nominees = [
    { id: 1, name: 'DJ KAFI', category: 'Best DJ of the Year', image: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=200&h=200&fit=crop', verified: true },
    { id: 2, name: 'MISS JAY', category: 'Best Hostess of the Year', image: 'https://images.unsplash.com/photo-1531123897727-8f129e1bf98c?w=200&h=200&fit=crop', verified: true },
    { id: 3, name: 'MC PRICE', category: 'Best MC of the Year', image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=200&fit=crop', verified: true },
    { id: 4, name: 'CLUB SIGNATURE', category: 'Peoples Club of the Year', image: 'https://images.unsplash.com/photo-1566737236500-c8ac43014a67?w=200&h=200&fit=crop', verified: false, isClub: true, region: 'Eldoret' },
    { id: 5, name: 'DJ BASH', category: 'Best DJ of the Year', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop', verified: true },
  ];

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <h2>NOMINEES SPOTLIGHT</h2>
        <Link href="/nominees" className={styles.viewAll}>
          VIEW ALL NOMINEES <ArrowRight size={14} />
        </Link>
      </div>

      <div className={styles.carouselWrapper}>
        <button className={styles.navBtn} aria-label="Previous">
          <ChevronLeft size={24} />
        </button>
        
        <div className={styles.carousel}>
          {nominees.map((nominee) => (
            <div key={nominee.id} className={styles.card}>
              <div className={styles.imageContainer}>
                {nominee.isClub ? (
                  <div className={styles.clubLogo}>
                    <div className={styles.crown}>♔</div>
                    <span>CLUB</span>
                    <strong>SIGNATURE</strong>
                  </div>
                ) : (
                  <img src={nominee.image} alt={nominee.name} className={styles.image} />
                )}
                <div className={styles.ring}></div>
              </div>
              <div className={styles.info}>
                <h3>
                  {nominee.name}
                  {nominee.verified && <CheckCircle2 size={14} className={styles.verified} />}
                </h3>
                <p>{nominee.category}</p>
                {(nominee as any).region && <span className={styles.regionBadge}>{(nominee as any).region}</span>}
              </div>
            </div>
          ))}
        </div>

        <button className={styles.navBtn} aria-label="Next">
          <ChevronRight size={24} />
        </button>
      </div>
    </section>
  );
}
