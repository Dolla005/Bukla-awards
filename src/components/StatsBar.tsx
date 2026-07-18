import { Users, Star, Trophy, Building2 } from 'lucide-react';
import styles from './StatsBar.module.css';

export default function StatsBar() {
  const stats = [
    { icon: <Users size={32} className={styles.icon} />, value: '25K+', label: 'Total Votes' },
    { icon: <Star size={32} className={styles.icon} />, value: '150+', label: 'Nominees' },
    { icon: <Trophy size={32} className={styles.icon} />, value: '20+', label: 'Categories' },
    { icon: <Building2 size={32} className={styles.icon} />, value: '1,000+', label: 'Clubs Represented' },
  ];

  return (
    <section className={styles.statsBar}>
      <div className={styles.container}>
        {stats.map((stat, index) => (
          <div key={index} className={styles.statItem}>
            {stat.icon}
            <div className={styles.statText}>
              <h3 className={styles.value}>{stat.value}</h3>
              <p className={styles.label}>{stat.label}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
