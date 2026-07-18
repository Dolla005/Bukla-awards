'use client';

import { addNominee } from './actions';
import { useRef, useState, useTransition } from 'react';
import styles from './page.module.css';

type Category = {
  id: string;
  name: string;
};

export default function AddNomineeForm({ categories }: { categories: Category[] }) {
  const [isPending, startTransition] = useTransition();
  const [showForm, setShowForm] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = (formData: FormData) => {
    startTransition(async () => {
      await addNominee(formData);
      formRef.current?.reset();
      setShowForm(false);
    });
  };

  if (!showForm) {
    return (
      <button className={styles.addBtn} onClick={() => setShowForm(true)}>
        + Add New Nominee
      </button>
    );
  }

  return (
    <div className={styles.formCard}>
      <h3 className={styles.formTitle}>Add New Nominee</h3>
      <form ref={formRef} action={handleSubmit} className={styles.form}>
        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label>Nominee / Club Name *</label>
            <input type="text" name="name" placeholder="e.g., DJ Alpha" required />
          </div>
          <div className={styles.formGroup}>
            <label>Category *</label>
            <select name="categoryId" required>
              <option value="">Select a category</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>
        </div>
        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label>Club / Venue</label>
            <input type="text" name="club" placeholder="e.g., Sky Lounge" />
          </div>
          <div className={styles.formGroup}>
            <label>County</label>
            <input type="text" name="county" placeholder="e.g., Nairobi" />
          </div>
        </div>
        <div className={styles.formGroup}>
          <label>Photo URL</label>
          <input type="text" name="photoUrl" placeholder="https://example.com/photo.jpg" />
        </div>
        <div className={styles.formActions}>
          <button type="submit" className={styles.submitBtn} disabled={isPending}>
            {isPending ? 'Adding...' : 'Add Nominee'}
          </button>
          <button type="button" className={styles.cancelBtn} onClick={() => setShowForm(false)}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
