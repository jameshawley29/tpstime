import React, { useEffect, useState } from 'react';

var enableTimeSync = process.env.REACT_APP_ENABLE_TIMESYNC === 'true';

enableTimeSync = true;

const TimeSync: React.FC = () => {
  const [serverTime, setServerTime] = useState<string | null>(null);
  const [accuracy, setAccuracy] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!enableTimeSync) {
      setServerTime(new Date().toLocaleString());
      setLoading(false);
      console.log('[TimeSync] Time sync disabled, using system clock.');
      return;
    }
    const fetchServerTime = async () => {
      try {
        const t0 = performance.now();
        const response = await fetch('http://localhost:3001/api/time');
        const t1 = performance.now();
        if (!response.ok) throw new Error('Failed to fetch time');
        const data = await response.json();
        const rtt = (t1 - t0) / 1000; // in seconds
        const estimatedServerTime = new Date(new Date(data.serverTime).getTime() + (rtt * 500));
        setServerTime(estimatedServerTime.toLocaleString());
        setAccuracy(rtt / 2); // ± half the round-trip time
        console.log(`[TimeSync] Sync successful. Accuracy: ±${(rtt/2).toFixed(3)} seconds.`);
      } catch (err: any) {
        setError(err.message);
        console.log('[TimeSync] Sync failed, using system clock.', err);
      } finally {
        setLoading(false);
      }
    };
    fetchServerTime();
  }, []);

  if (loading) return <div className="text-xs text-gray-400">Loading server time...</div>;
  if (!enableTimeSync) {
    return null;
  }
  if (error) return (
    <div className="text-xs text-gray-400">Using system clock.</div>
  );
  return (
    <div>
      {accuracy !== null && (
        <div className="text-xs text-gray-400 mt-1">Accuracy of synchronization: &plusmn;{accuracy.toFixed(3)} seconds</div>
      )}
    </div>
  );
};

export default TimeSync;
