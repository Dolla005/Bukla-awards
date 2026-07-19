import { prisma } from '@/lib/prisma';
import styles from './page.module.css';
import { Users, Vote, Tags, MessageSquare, DollarSign } from 'lucide-react';
import Link from 'next/link';

export default async function AdminDashboard() {
  const [totalVotes, totalNominees, totalCategories, pendingNominations, userAggregate] = await Promise.all([
    prisma.vote.count(),
    prisma.nominee.count(),
    prisma.category.count(),
    prisma.nominationSubmission.count({ where: { status: 'PENDING' } }),
    prisma.user.aggregate({ _sum: { voteBalance: true } })
  ]);

  const unusedVotes = userAggregate._sum.voteBalance || 0;
  const totalRevenue = (totalVotes + unusedVotes) * 25;

  return (
    <div className={styles.dashboard}>
      <header className={styles.header}>
        <h1 className={styles.title}>Dashboard Overview</h1>
        <p className={styles.subtitle}>Welcome to the Bukla Awards Admin Control Center</p>
      </header>

      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={styles.statIconWrapper} style={{ color: '#22c55e' }}>
            <DollarSign className={styles.statIcon} />
          </div>
          <div className={styles.statInfo}>
            <p className={styles.statLabel}>Total Revenue (Ksh)</p>
            <h3 className={styles.statValue}>{totalRevenue.toLocaleString()}</h3>
          </div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statIconWrapper}>
            <Vote className={styles.statIcon} />
          </div>
          <div className={styles.statInfo}>
            <p className={styles.statLabel}>Total Votes Cast</p>
            <h3 className={styles.statValue}>{totalVotes.toLocaleString()}</h3>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statIconWrapper}>
            <Users className={styles.statIcon} />
          </div>
          <div className={styles.statInfo}>
            <p className={styles.statLabel}>Official Nominees</p>
            <h3 className={styles.statValue}>{totalNominees.toLocaleString()}</h3>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statIconWrapper}>
            <Tags className={styles.statIcon} />
          </div>
          <div className={styles.statInfo}>
            <p className={styles.statLabel}>Active Categories</p>
            <h3 className={styles.statValue}>{totalCategories.toLocaleString()}</h3>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statIconWrapper} style={{ color: '#eab308' }}>
            <MessageSquare className={styles.statIcon} />
          </div>
          <div className={styles.statInfo}>
            <p className={styles.statLabel}>Pending Public Nominations</p>
            <h3 className={styles.statValue}>{pendingNominations.toLocaleString()}</h3>
          </div>
        </div>
      </div>

      <div className={styles.quickActions}>
        <h2 className={styles.sectionTitle}>Quick Actions</h2>
        <div className={styles.actionsGrid}>
          <Link href="/admin/nominations" className={styles.actionCard}>
            <h3>Review Nominations</h3>
            <p>You have {pendingNominations} pending public submissions waiting for review.</p>
          </Link>
          <Link href="/admin/categories" className={styles.actionCard}>
            <h3>Manage Categories</h3>
            <p>Add new categories or edit existing ones.</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
