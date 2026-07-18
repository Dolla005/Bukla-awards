import { ArrowRight } from 'lucide-react';
import styles from './TrendingCategories.module.css';

export default function TrendingCategories() {
  const trending = [
    { id: 1, title: 'Best DJ of the Year', votes: '8,452', image: 'https://images.unsplash.com/photo-1516873240891-4bf014598ab4?w=100&h=100&fit=crop' },
    { id: 2, title: 'Peoples Club of the Year', votes: '7,120', image: 'https://images.unsplash.com/photo-1572290466487-94d509d36a3e?w=100&h=100&fit=crop' },
    { id: 3, title: 'Best MC of the Year', votes: '6,230', image: 'https://images.unsplash.com/photo-1493225457124-a1a2a5f5f401?w=100&h=100&fit=crop' },
    { id: 4, title: 'Best Hostess of the Year', votes: '5,807', image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop' },
    { id: 5, title: 'Best Theme Night', votes: '4,950', image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=100&h=100&fit=crop' },
  ];

  return (
    <aside className={styles.sidebar}>
      <div className={styles.header}>
        <h2>TRENDING CATEGORIES</h2>
        <button className={styles.viewAll}>
          VIEW ALL <ArrowRight size={14} />
        </button>
      </div>

      <div className={styles.list}>
        {trending.map((item) => (
          <div key={item.id} className={styles.item}>
            <img src={item.image} alt={item.title} className={styles.image} />
            <div className={styles.rank}>{item.id}</div>
            <div className={styles.details}>
              <h4>{item.title}</h4>
              <p>{item.votes} Votes</p>
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
}
