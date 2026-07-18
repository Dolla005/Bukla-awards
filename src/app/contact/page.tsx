import Header from '@/components/Header';
import styles from './page.module.css';

export default function ContactPage() {
  return (
    <div className={styles.page}>
      <Header />
      <main className={styles.main}>
        <div className={styles.hero}>
          <h1>Contact Us</h1>
          <p>Have a question or want to get involved? We'd love to hear from you.</p>
        </div>
        
        <div className={styles.content}>
          <div className={styles.grid}>
            <div className={styles.contactInfo}>
              <h2>Get in Touch</h2>
              <p>Reach out to the Bukla Awards team for general inquiries, sponsorships, or press.</p>
              
              <div className={styles.infoItem}>
                <h3>Email</h3>
                <p>hello@buklaawards.com</p>
                <p>sponsors@buklaawards.com</p>
              </div>

              <div className={styles.infoItem}>
                <h3>Phone</h3>
                <p>+254 700 000 000</p>
              </div>

              <div className={styles.infoItem}>
                <h3>Office</h3>
                <p>Nairobi, Kenya</p>
              </div>
            </div>

            <div className={styles.formContainer}>
              <form className={styles.form}>
                <div className={styles.inputGroup}>
                  <label>Name</label>
                  <input type="text" placeholder="Your Name" />
                </div>
                <div className={styles.inputGroup}>
                  <label>Email</label>
                  <input type="email" placeholder="your@email.com" />
                </div>
                <div className={styles.inputGroup}>
                  <label>Subject</label>
                  <select>
                    <option>General Inquiry</option>
                    <option>Sponsorship</option>
                    <option>Press</option>
                    <option>Ticketing</option>
                  </select>
                </div>
                <div className={styles.inputGroup}>
                  <label>Message</label>
                  <textarea rows={5} placeholder="How can we help you?"></textarea>
                </div>
                <button type="button" className={styles.submitBtn}>Send Message</button>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
