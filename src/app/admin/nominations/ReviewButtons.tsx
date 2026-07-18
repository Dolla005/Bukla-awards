'use client';

import { approveNomination, rejectNomination } from './actions';
import { useState, useTransition } from 'react';

export default function ReviewButtons({ submissionId }: { submissionId: string }) {
  const [isPending, startTransition] = useTransition();

  const handleApprove = () => {
    startTransition(async () => {
      await approveNomination(submissionId);
    });
  };

  const handleReject = () => {
    startTransition(async () => {
      await rejectNomination(submissionId);
    });
  };

  return (
    <div style={{ display: 'flex', gap: '0.5rem' }}>
      <button 
        onClick={handleApprove} 
        disabled={isPending}
        style={{
          background: 'rgba(34, 197, 94, 0.1)',
          color: '#4ade80',
          border: '1px solid #4ade80',
          padding: '0.25rem 0.5rem',
          borderRadius: '4px',
          cursor: isPending ? 'not-allowed' : 'pointer',
          fontSize: '0.75rem',
          fontWeight: 600
        }}
      >
        {isPending ? 'Processing...' : 'Approve'}
      </button>
      <button 
        onClick={handleReject} 
        disabled={isPending}
        style={{
          background: 'rgba(239, 68, 68, 0.1)',
          color: '#f87171',
          border: '1px solid #f87171',
          padding: '0.25rem 0.5rem',
          borderRadius: '4px',
          cursor: isPending ? 'not-allowed' : 'pointer',
          fontSize: '0.75rem',
          fontWeight: 600
        }}
      >
        Reject
      </button>
    </div>
  );
}
