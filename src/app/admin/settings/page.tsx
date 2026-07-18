import { prisma } from '@/lib/prisma';
import styles from '../categories/page.module.css';
import SettingsForm from './SettingsForm';

export const dynamic = 'force-dynamic';

export default async function SettingsAdmin() {
  const [dateSetting, locationSetting, showResultsSetting] = await Promise.all([
    prisma.systemSetting.findUnique({ where: { key: 'eventDate' } }),
    prisma.systemSetting.findUnique({ where: { key: 'eventLocation' } }),
    prisma.systemSetting.findUnique({ where: { key: 'showResults' } })
  ]);

  const initialDate = dateSetting?.value || '2026-12-19T18:00:00Z';
  const initialLocation = locationSetting?.value || 'KICC, NAIROBI';
  const initialShowResults = showResultsSetting?.value === 'true';

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>System Settings</h1>
          <p className={styles.subtitle}>Configure global website parameters</p>
        </div>
      </header>

      <SettingsForm 
        initialDate={initialDate} 
        initialLocation={initialLocation} 
        initialShowResults={initialShowResults} 
      />
    </div>
  );
}
