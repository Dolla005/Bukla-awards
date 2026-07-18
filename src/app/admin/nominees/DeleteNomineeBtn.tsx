'use client';

import { deleteNominee } from './actions';
import { useTransition } from 'react';

export default function DeleteNomineeBtn({ nomineeId }: { nomineeId: string }) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    if (!confirm('Are you sure you want to remove this nominee? All their votes will also be deleted.')) return;
    startTransition(async () => {
      await deleteNominee(nomineeId);
    });
  };

  return (
    <button 
      onClick={handleDelete} 
      disabled={isPending}
      style={{
        background: 'rgba(239, 68, 68, 0.1)',
        color: '#f87171',
        border: '1px solid rgba(239, 68, 68, 0.3)',
        padding: '0.25rem 0.5rem',
        borderRadius: '4px',
        cursor: isPending ? 'not-allowed' : 'pointer',
        fontSize: '0.75rem',
        fontWeight: 600
      }}
    >
      {isPending ? 'Removing...' : 'Remove'}
    </button>
  );
}
