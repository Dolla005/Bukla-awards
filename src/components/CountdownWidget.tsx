'use client';

import { useState, useEffect } from 'react';
import { Calendar, MapPin, Trophy } from 'lucide-react';
import styles from './CountdownWidget.module.css';
import Link from 'next/link';

export default function CountdownWidget({ 
  targetDate = '2026-12-19T18:00:00Z', 
  location = 'KICC, NAIROBI',
  showResults = false
}: { 
  targetDate?: string;
  location?: string;
  showResults?: boolean;
}) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  const [mounted, setMounted] = useState(false);
  const [isEnded, setIsEnded] = useState(false);

  useEffect(() => {
    setMounted(true);
    const targetTime = new Date(targetDate).getTime();

    const updateTimer = () => {
      const now = new Date().getTime();
      const distance = targetTime - now;

      if (distance <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        setIsEnded(true);
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000)
      });
    };

    updateTimer();
    const timer = setInterval(updateTimer, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  if (!mounted) return null; // Avoid hydration mismatch

  // Format the date for display (e.g., "SAT, 19TH DEC 2026")
  const displayDate = new Date(targetDate).toLocaleDateString('en-GB', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  }).toUpperCase();

  return (
    <div className={styles.widget}>
      <div className={styles.header}>
        <h3>AWARDS NIGHT <span>Live</span></h3>
      </div>
      
      {isEnded && showResults ? (
        <div className={styles.resultsContainer}>
          <h2 className={styles.votingClosedText}>Voting Closed</h2>
          <Link href="/results" className={styles.resultsBtn}>
            <Trophy size={20} /> See the Winners
          </Link>
        </div>
      ) : (
        <div className={styles.countdown}>
          <div className={styles.timeBlock}>
            <span className={styles.number}>{timeLeft.days.toString().padStart(2, '0')}</span>
            <span className={styles.label}>DAYS</span>
          </div>
          <div className={styles.timeBlock}>
            <span className={styles.number}>{timeLeft.hours.toString().padStart(2, '0')}</span>
            <span className={styles.label}>HRS</span>
          </div>
          <div className={styles.timeBlock}>
            <span className={styles.number}>{timeLeft.minutes.toString().padStart(2, '0')}</span>
            <span className={styles.label}>MINS</span>
          </div>
          <div className={styles.timeBlock}>
            <span className={styles.number}>{timeLeft.seconds.toString().padStart(2, '0')}</span>
            <span className={styles.label}>SECS</span>
          </div>
        </div>
      )}

      <div className={styles.details}>
        <div className={styles.detailRow}>
          <Calendar size={16} className={styles.icon} />
          <span>{displayDate}</span>
        </div>
        <div className={styles.detailRow}>
          <MapPin size={16} className={styles.icon} />
          <span>{location}</span>
        </div>
      </div>
    </div>
  );
}
