import { useState, useEffect, useRef } from 'react';
import deezerService from '../services/deezerService';

export const useMusicReleases = () => {
  const [releases, setReleases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastFetched, setLastFetched] = useState(null);
  const intervalRef = useRef(null);

  const fetchReleases = async () => {
    try {
      setError(null);
      const newReleases = await deezerService.getNewReleases();
      setReleases(newReleases.items || []);
      setLastFetched(new Date());
    } catch (err) {
      setError(err.message);
      console.error('Failed to fetch releases:', err);
    } finally {
      setLoading(false);
    }
  };

  const startPeriodicFetch = () => {
    // Clear existing interval
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    // Start new interval - 30 seconds
    intervalRef.current = setInterval(fetchReleases, 30000);
  };

  const stopPeriodicFetch = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  useEffect(() => {
    // Initial fetch
    fetchReleases();
    
    // Start periodic fetching
    startPeriodicFetch();

    // Cleanup on unmount
    return () => {
      stopPeriodicFetch();
    };
  }, []);

  const refreshReleases = () => {
    setLoading(true);
    fetchReleases();
  };

  return {
    releases,
    loading,
    error,
    lastFetched,
    refreshReleases,
    startPeriodicFetch,
    stopPeriodicFetch
  };
};

// Keep the old export name for backward compatibility
export const useSpotifyReleases = useMusicReleases;