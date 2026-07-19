import Link from 'next/link';
import { ArrowRight, Headphones, Crown, Mic, User, Globe } from 'lucide-react';
import styles from './ExploreCategories.module.css';

export default function ExploreCategories() {
  const categories = [
    { id: 1, title: 'BEST DJ', subtitle: 'OF THE YEAR', icon: <Headphones size={20} />, image: 'https://images.unsplash.com/photo-1516873240891-4bf014598ab4?auto=format&fit=crop&q=80&w=400' },
    { id: 2, title: 'PEOPLES CLUB', subtitle: 'OF THE YEAR', icon: <Crown size={20} />, image: 'https://images.unsplash.com/photo-1572290466487-94d509d36a3e?auto=format&fit=crop&q=80&w=400' },
    { id: 3, title: 'BEST MC', subtitle: 'OF THE YEAR', icon: <Mic size={20} />, image: 'https://images.unsplash.com/photo-1493225457124-a1a2a5f5f401?auto=format&fit=crop&q=80&w=400' },
    { id: 4, title: 'BEST HOSTESS', subtitle: 'OF THE YEAR', icon: <User size={20} />, image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400' },
    { id: 5, title: 'BEST THEME NIGHT', subtitle: 'OF THE YEAR', icon: <Globe size={20} />, image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&q=80&w=400' },
  ];

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <h2>EXPLORE CATEGORIES</h2>
        <Link href="/categories" className={styles.browseBtn}>
          BROWSE ALL CATEGORIES <ArrowRight size={16} />
        </Link>
      </div>
      
      <div className={styles.grid}>
        {categories.map((cat) => (
          <div key={cat.id} className={styles.card}>
            <div className={styles.imageWrapper}>
              <img src={cat.image} alt={cat.title} className={styles.image} />
              <div className={styles.overlay}></div>
            </div>
            <div className={styles.content}>
              <div className={styles.iconWrapper}>{cat.icon}</div>
              <div className={styles.textWrapper}>
                <h3>{cat.title}</h3>
                <p>{cat.subtitle}</p>
              </div>
              <Link href="/categories" className={styles.actionBtn}>
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
