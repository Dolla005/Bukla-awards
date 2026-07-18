import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/auth';
import Link from 'next/link';
import { LayoutDashboard, Users, Tags, MessageSquare, LogOut, ArrowLeft, Settings } from 'lucide-react';
import styles from './layout.module.css';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session || (session.user as any).role !== 'ADMIN') {
    redirect('/login?callbackUrl=/admin');
  }

  return (
    <div className={styles.adminContainer}>
      <aside className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <h2>BUKLA ADMIN</h2>
          <span className={styles.roleBadge}>Admin Portal</span>
        </div>
        
        <nav className={styles.nav}>
          <Link href="/admin" className={styles.navLink}>
            <LayoutDashboard size={20} />
            <span>Dashboard</span>
          </Link>
          <Link href="/admin/categories" className={styles.navLink}>
            <Tags size={20} />
            <span>Categories</span>
          </Link>
          <Link href="/admin/nominees" className={styles.navLink}>
            <Users size={20} />
            <span>Nominees</span>
          </Link>
          <Link href="/admin/nominations" className={styles.navLink}>
            <MessageSquare size={20} />
            <span>Public Nominations</span>
          </Link>
          <Link href="/admin/settings" className={styles.navLink}>
            <Settings size={20} />
            <span>Settings</span>
          </Link>
        </nav>

        <div className={styles.sidebarFooter}>
          <Link href="/" className={styles.backLink}>
            <ArrowLeft size={18} />
            <span>Back to Site</span>
          </Link>
          <form action="/api/auth/signout" method="POST">
            <button type="submit" className={styles.logoutBtn}>
              <LogOut size={18} />
              <span>Logout</span>
            </button>
          </form>
        </div>
      </aside>

      <main className={styles.mainContent}>
        <header className={styles.topbar}>
          <div className={styles.userInfo}>
            Welcome, <strong>{session.user?.name || 'Administrator'}</strong>
          </div>
        </header>
        <div className={styles.content}>
          {children}
        </div>
      </main>
    </div>
  );
}
