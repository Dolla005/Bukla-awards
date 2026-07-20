import { Trophy } from 'lucide-react';

export default function ResultsLoading() {
  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center',
      background: 'var(--bg-dark)'
    }}>
      <Trophy 
        size={64} 
        color="var(--primary-gold)" 
        style={{ 
          animation: 'pulse 1.5s infinite ease-in-out',
          marginBottom: '2rem'
        }} 
      />
      <h2 style={{ 
        color: 'var(--text-primary)', 
        fontFamily: 'var(--font-serif)',
        fontSize: '2rem',
        animation: 'pulse 1.5s infinite ease-in-out'
      }}>
        Calculating Winners...
      </h2>
      <style>{`
        @keyframes pulse {
          0% { transform: scale(0.95); opacity: 0.5; }
          50% { transform: scale(1.05); opacity: 1; }
          100% { transform: scale(0.95); opacity: 0.5; }
        }
      `}</style>
    </div>
  );
}
