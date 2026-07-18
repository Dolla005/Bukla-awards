import { prisma } from '@/lib/prisma';
import tableStyles from '../categories/page.module.css';
import AddNomineeForm from './AddNomineeForm';
import DeleteNomineeBtn from './DeleteNomineeBtn';

export const dynamic = 'force-dynamic';

export default async function NomineesAdmin() {
  const [nominees, categories] = await Promise.all([
    prisma.nominee.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        category: true,
        _count: {
          select: { votes: true }
        }
      }
    }),
    prisma.category.findMany({
      where: { active: true },
      orderBy: { name: 'asc' },
      select: { id: true, name: true }
    })
  ]);

  // Group nominees by category for display
  const grouped = nominees.reduce((acc, nominee) => {
    const catName = nominee.category.name;
    if (!acc[catName]) acc[catName] = [];
    acc[catName].push(nominee);
    return acc;
  }, {} as Record<string, typeof nominees>);

  return (
    <div className={tableStyles.page}>
      <header className={tableStyles.header}>
        <div>
          <h1 className={tableStyles.title}>Official Nominees</h1>
          <p className={tableStyles.subtitle}>Add, view and manage nominees for each award category</p>
        </div>
        <AddNomineeForm categories={categories} />
      </header>

      {Object.keys(grouped).length === 0 ? (
        <div className={tableStyles.tableContainer}>
          <div className={tableStyles.emptyState} style={{ padding: '3rem', textAlign: 'center' }}>
            No official nominees yet. Click <strong>&quot;+ Add New Nominee&quot;</strong> above to get started.
          </div>
        </div>
      ) : (
        Object.entries(grouped).map(([categoryName, catNominees]) => (
          <div key={categoryName} style={{ marginBottom: '2rem' }}>
            <h2 style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '1.2rem',
              color: 'var(--primary-gold)',
              marginBottom: '1rem',
              paddingBottom: '0.5rem',
              borderBottom: '1px solid rgba(212, 175, 55, 0.2)',
              letterSpacing: '1px'
            }}>
              {categoryName} <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem', fontFamily: 'var(--font-sans)' }}>({catNominees.length} nominees)</span>
            </h2>
            <div className={tableStyles.tableContainer}>
              <table className={tableStyles.table}>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Club / Venue</th>
                    <th>County</th>
                    <th>Votes</th>
                    <th>Added On</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {catNominees.map((nominee) => (
                    <tr key={nominee.id}>
                      <td className={tableStyles.categoryName}>{nominee.name}</td>
                      <td>{nominee.club || '-'}</td>
                      <td>{nominee.county || '-'}</td>
                      <td>{nominee._count.votes.toLocaleString()}</td>
                      <td>{nominee.createdAt.toLocaleDateString()}</td>
                      <td>
                        <DeleteNomineeBtn nomineeId={nominee.id} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
