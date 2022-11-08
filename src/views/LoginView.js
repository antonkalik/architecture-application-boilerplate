import { useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router';
import { fakeCache } from '../data/fakeCache';
import { fakeApi } from '../data/fakeApi';
import { SESSION_KEY } from '../constants';

export const LoginView = () => {
  const [isLoading, setLoading] = useState(false);
  const session = useOutletContext();
  const navigate = useNavigate();

  const onLogin = async () => {
    setLoading(true);
    const sessionData = await fakeApi.login(1);
    session.setData(sessionData);
    fakeCache.setItem(SESSION_KEY, sessionData);
    setLoading(false);
    navigate('/');
  };

  return (
    <div>
      <button disabled={isLoading} onClick={onLogin}>
        {isLoading ? 'loading...' : 'Login'}
      </button>
    </div>
  );
};
