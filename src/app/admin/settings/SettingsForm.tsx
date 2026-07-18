'use client';

import { updateEventDate } from './actions';
import { useTransition } from 'react';
import styles from '../nominees/page.module.css';

export default function SettingsForm({
  initialDate,
  initialLocation,
  initialShowResults
}: {
  initialDate: string;
  initialLocation: string;
  initialShowResults: boolean;
}) {
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (formData: FormData) => {
    startTransition(async () => {
      await updateEventDate(formData);
      alert('Settings updated successfully!');
    });
  };

  return (
    <div className={styles.formCard} style={{ maxWidth: '600px' }}>
      <h3 className={styles.formTitle}>Event Configuration</h3>
      <form action={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label>Event Date & Time</label>
          <input 
            type="datetime-local" 
            name="eventDate" 
            defaultValue={initialDate ? new Date(initialDate).toISOString().slice(0,16) : ''} 
            required 
          />
          <small style={{ color: 'var(--text-muted)' }}>This sets the target date for the countdown timer on the homepage.</small>
        </div>
        
        <div className={styles.formGroup} style={{ marginTop: '1rem' }}>
          <label>Event Location</label>
          <input 
            type="text" 
            name="eventLocation" 
            defaultValue={initialLocation} 
            placeholder="e.g., KICC, NAIROBI" 
          />
        </div>

        <div className={styles.formGroup} style={{ marginTop: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <input 
            type="checkbox" 
            name="showResults" 
            id="showResults"
            defaultChecked={initialShowResults}
            style={{ width: 'auto', transform: 'scale(1.2)' }}
          />
          <label htmlFor="showResults" style={{ marginBottom: 0, cursor: 'pointer', fontWeight: 600 }}>
            Publish Results to Public
          </label>
        </div>
        <small style={{ color: 'var(--text-muted)', display: 'block', marginBottom: '1rem' }}>
          If checked, the public will be able to view the final vote tally on the homepage after the countdown ends.
        </small>

        <div className={styles.formActions} style={{ marginTop: '2rem' }}>
          <button type="submit" className={styles.submitBtn} disabled={isPending}>
            {isPending ? 'Saving...' : 'Save Settings'}
          </button>
        </div>
      </form>
    </div>
  );
}
