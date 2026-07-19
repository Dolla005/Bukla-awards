'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Search, Menu, X } from 'lucide-react';
import styles from './Header.module.css';

const navLinks = [
  { name: 'HOME', href: '/' },
  { name: 'ABOUT', href: '/about' },
  { name: 'CATEGORIES', href: '/categories' },
  { name: 'NOMINATE', href: '/nominate' },
  { name: 'VOTE', href: '/categories' },
  { name: 'BUY VOTES', href: '/buy-votes' },
  { name: 'NOMINEES', href: '/nominees' },
  { name: 'NEWS', href: '/news' },
  { name: 'GALLERY', href: '/gallery' },
  { name: 'SPONSORS', href: '/sponsors' },
  { name: 'TICKETS', href: '/tickets' },
  { name: 'CONTACT', href: '/contact' },
];

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
            <h1>BUKLA</h1>
            <p>AWARDS 2026<span className={styles.star}>☆</span></p>
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
          <button className={styles.searchBtn} aria-label="Search">
            <Search size={20} />
          </button>
          <div className={styles.desktopAuth}>
            <Link href="/login" className={styles.loginBtn}>LOGIN</Link>
            <Link href="/signup" className={styles.signupBtn}>SIGN UP</Link>
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
                <Link href="/login" onClick={closeMenu} className={styles.loginBtn}>LOGIN</Link>
                <Link href="/signup" onClick={closeMenu} className={styles.signupBtn}>SIGN UP</Link>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
}
