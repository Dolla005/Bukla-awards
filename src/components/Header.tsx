'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';
import { useSession, signOut } from 'next-auth/react';
import styles from './Header.module.css';

const navLinks = [
  { name: 'HOME', href: '/' },
  { name: 'ABOUT', href: '/about' },
  { name: 'CATEGORIES', href: '/categories' },
  { name: 'NOMINATE', href: '/nominate' },
  { name: 'VOTE', href: '/categories' },
  { name: 'BUY VOTES', href: '/buy-votes' },
  { name: 'NOMINEES', href: '/nominees' },
  { name: 'GALLERY', href: '/gallery' },
  { name: 'SPONSORS', href: '/sponsors' },
  { name: 'TICKETS', href: '/tickets' },
  { name: 'CONTACT', href: '/contact' },
];

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { data: session } = useSession();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <Link href="/" onClick={closeMenu}>
            <Image 
              src="/images/logo.png" 
              alt="Bukla Awards 2026" 
              width={140} 
              height={55} 
              style={{ objectFit: 'contain' }}
              className={styles.logoImage}
              priority
            />
          </Link>
        </div>

        <nav className={styles.nav}>
          <ul>
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link href={link.href} className={link.name === 'HOME' ? styles.active : ''}>
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.actions}>
          <div className={styles.desktopAuth}>
            {session ? (
              <>
                {(session.user as any)?.role === 'ADMIN' && (
                  <Link href="/admin" className={styles.loginBtn}>ADMIN</Link>
                )}
                <button onClick={() => signOut({ callbackUrl: '/' })} className={styles.signupBtn} style={{ cursor: 'pointer' }}>LOGOUT</button>
              </>
            ) : (
              <>
                <Link href="/login" className={styles.loginBtn}>LOGIN</Link>
                <Link href="/signup" className={styles.signupBtn}>SIGN UP</Link>
              </>
            )}
          </div>
          
          <button className={styles.mobileMenuBtn} onClick={toggleMobileMenu}>
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className={styles.mobileMenu}>
          <nav className={styles.mobileNav}>
            <ul>
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} onClick={closeMenu}>
                    {link.name}
                  </Link>
                </li>
              ))}
              <li className={styles.mobileAuthLinks}>
                {session ? (
                  <>
                    {(session.user as any)?.role === 'ADMIN' && (
                      <Link href="/admin" onClick={closeMenu} className={styles.loginBtn}>ADMIN</Link>
                    )}
                    <button onClick={() => { closeMenu(); signOut({ callbackUrl: '/' }); }} className={styles.signupBtn} style={{ cursor: 'pointer', width: '100%', marginTop: '1rem' }}>LOGOUT</button>
                  </>
                ) : (
                  <>
                    <Link href="/login" onClick={closeMenu} className={styles.loginBtn}>LOGIN</Link>
                    <Link href="/signup" onClick={closeMenu} className={styles.signupBtn}>SIGN UP</Link>
                  </>
                )}
              </li>
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
}
