import { useEffect, useState } from 'react';
import { fakeCache } from '../fake/fakeCache';
import { SESSION_KEY } from '../constants';
import { fakeApi } from '../fake/fakeApi';

export const useSession = () => {
  const cache = fakeCache.getItem(SESSION_KEY);
  const [data, setData] = useState(cache);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!cache) {
      setLoading(true);
    }
    fakeApi
      .getSession()
      .then(session => {
        if (session) {
          setData(session);
          fakeCache.setItem(SESSION_KEY, session);
        } else {
          setData(null);
          fakeCache.clear();
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return { data, setData, loading };
};
