'use client';

import { useState } from 'react';
import Link from 'next/link';
import { LayoutDashboard, Users, Tags, MessageSquare, LogOut, ArrowLeft, Settings, Menu, X, Ticket } from 'lucide-react';
import styles from './layout.module.css';

export default function AdminLayoutClient({ children, userName }: { children: React.ReactNode, userName: string }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div className={styles.adminContainer}>
      <header className={styles.topbarMobile}>
        <div className={styles.sidebarHeaderMobile}>
          <h2>BUKLA ADMIN</h2>
        </div>
        <button className={styles.mobileMenuBtn} onClick={toggle}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </header>

      <aside className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}>
        <div className={styles.sidebarHeader}>
          <h2>BUKLA ADMIN</h2>
          <span className={styles.roleBadge}>Admin Portal</span>
        </div>
        
        <nav className={styles.nav}>
          <Link href="/admin" className={styles.navLink} onClick={toggle}>
            <LayoutDashboard size={20} />
            <span>Dashboard</span>
          </Link>
          <Link href="/admin/categories" className={styles.navLink} onClick={toggle}>
            <Tags size={20} />
            <span>Categories</span>
          </Link>
          <Link href="/admin/nominees" className={styles.navLink} onClick={toggle}>
            <Users size={20} />
            <span>Nominees</span>
          </Link>
          <Link href="/admin/nominations" className={styles.navLink} onClick={toggle}>
            <MessageSquare size={20} />
            <span>Public Nominations</span>
          </Link>
          <Link href="/admin/tickets" className={styles.navLink} onClick={toggle}>
            <Ticket size={20} />
            <span>Tickets</span>
          </Link>
          <Link href="/admin/settings" className={styles.navLink} onClick={toggle}>
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
        <header className={styles.topbarDesktop}>
          <div className={styles.userInfo}>
            Welcome, <strong>{userName}</strong>
          </div>
        </header>
        <div className={styles.content}>
          {children}
        </div>
      </main>
    </div>
  );
}
