'use client';

import { useState, useTransition } from 'react';
import { createCategory, updateCategory } from './actions';
import styles from './page.module.css';

type Category = {
  id?: string;
  name: string;
  orderIndex: number;
  active: boolean;
};

export default function CategoryForm({ category }: { category?: Category }) {
  const [isPending, startTransition] = useTransition();
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = (formData: FormData) => {
    startTransition(async () => {
      try {
        if (category?.id) {
          await updateCategory(category.id, formData);
        } else {
          await createCategory(formData);
        }
        setIsOpen(false);
      } catch (err: any) {
        alert(err.message || 'An error occurred');
      }
    });
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)} 
        className={category ? styles.editBtn : styles.addBtn}
      >
        {category ? 'Edit' : '+ Add New Category'}
      </button>

      {isOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <h3 className={styles.modalTitle}>{category ? 'Edit Category' : 'Add New Category'}</h3>
            <form action={handleSubmit} className={styles.form}>
              <div className={styles.formGroup}>
                <label>Category Name *</label>
                <input type="text" name="name" defaultValue={category?.name || ''} placeholder="e.g. Best DJ" required />
              </div>
              <div className={styles.formGroup}>
                <label>Display Order (1 = first) *</label>
                <input type="number" name="orderIndex" defaultValue={category?.orderIndex || 999} required />
              </div>
              {category && (
                <div className={styles.formGroup} style={{ flexDirection: 'row', alignItems: 'center', gap: '0.5rem', marginTop: '0.5rem' }}>
                  <input type="checkbox" name="active" defaultChecked={category.active} id={`active-${category.id}`} style={{ width: 'auto' }} />
                  <label htmlFor={`active-${category.id}`} style={{ margin: 0 }}>Active (Visible on website)</label>
                </div>
              )}
              <div className={styles.formActions}>
                <button type="submit" className={styles.submitBtn} disabled={isPending}>
                  {isPending ? 'Saving...' : 'Save Category'}
                </button>
                <button type="button" className={styles.cancelBtn} onClick={() => setIsOpen(false)}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
