import { useState, useEffect } from 'react';
import { fetchDashboardData } from '../services/api';

const useDashboardData = (filters = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const result = await fetchDashboardData(filters);
        setData(result);
        setError(null);
      } catch (err) {
        setError(err.message);
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [JSON.stringify(filters)]);

  const refresh = async () => {
    try {
      setLoading(true);
      const result = await fetchDashboardData(filters);
      setData(result);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, refresh };
};

export default useDashboardData;