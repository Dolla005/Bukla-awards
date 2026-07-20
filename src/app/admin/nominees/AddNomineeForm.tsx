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
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [uploadedUrl, setUploadedUrl] = useState('');
  const formRef = useRef<HTMLFormElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Show preview immediately
    const reader = new FileReader();
    reader.onload = (ev) => setPreview(ev.target?.result as string);
    reader.readAsDataURL(file);

    // Upload to API
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);

      const res = await fetch('/api/upload', { method: 'POST', body: formData });
      const data = await res.json();

      if (res.ok) {
        setUploadedUrl(data.url);
      } else {
        alert(data.error || 'Upload failed');
        setPreview(null);
      }
    } catch {
      alert('Upload failed. Please try again.');
      setPreview(null);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = (formData: FormData) => {
    // Replace the file input with the uploaded URL
    formData.set('photoUrl', uploadedUrl);
    
    startTransition(async () => {
      await addNominee(formData);
      formRef.current?.reset();
      setShowForm(false);
      setPreview(null);
      setUploadedUrl('');
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
          <label>Region (Optional - for Clubs)</label>
          <input type="text" name="region" placeholder="e.g., Westlands, Nairobi" />
        </div>
        <div className={styles.formGroup}>
          <label>Nominee Photo</label>
          <div className={styles.uploadArea} onClick={() => fileInputRef.current?.click()}>
            {preview ? (
              <img src={preview} alt="Preview" className={styles.uploadPreview} />
            ) : (
              <div className={styles.uploadPlaceholder}>
                <span style={{ fontSize: '2rem' }}>📷</span>
                <span>{uploading ? 'Uploading...' : 'Click to browse & upload a photo'}</span>
                <small>JPEG, PNG, WebP — Max 5MB</small>
              </div>
            )}
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif"
            onChange={handleFileChange}
            style={{ display: 'none' }}
          />
        </div>
        <div className={styles.formActions}>
          <button type="submit" className={styles.submitBtn} disabled={isPending || uploading}>
            {isPending ? 'Adding...' : uploading ? 'Uploading photo...' : 'Add Nominee'}
          </button>
          <button type="button" className={styles.cancelBtn} onClick={() => { setShowForm(false); setPreview(null); setUploadedUrl(''); }}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
