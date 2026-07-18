'use client';

import { useEffect, useState } from 'react';
import useWindowSize from 'react-use/lib/useWindowSize';
import Confetti from 'react-confetti';

export default function ConfettiClient() {
  const { width, height } = useWindowSize();
  const [recycle, setRecycle] = useState(true);
  const [unmount, setUnmount] = useState(false);

  useEffect(() => {
    // Stop generating new confetti after 5 seconds
    const timer1 = setTimeout(() => {
      setRecycle(false);
    }, 5000);

    // Completely remove the canvas after 8 seconds to ensure it's cleared out
    const timer2 = setTimeout(() => {
      setUnmount(true);
    }, 8000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  if (unmount) return null;

  return (
    <Confetti
      width={width}
      height={height}
      recycle={recycle}
      numberOfPieces={400}
      gravity={0.15}
      style={{ position: 'fixed', top: 0, left: 0, zIndex: 9999, pointerEvents: 'none' }}
    />
  );
}
