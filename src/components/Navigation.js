import { fakeApi } from '../fake/fakeApi';
import { fakeCache } from '../fake/fakeCache';
import { SESSION_KEY } from '../constants';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const Navigation = ({ navigate, session }) => {
  const [isLoading, setLoading] = useState(false);

  const onLogin = async () => {
    setLoading(true);
    const sessionData = await fakeApi.login();
    session.setData(sessionData);
    fakeCache.setItem(SESSION_KEY, sessionData);
    setLoading(false);
    navigate('/');
  };

  const onLogout = async () => {
    setLoading(true);
    fakeCache.clear();
    await fakeApi.logout();
    session.setData(null);
    setLoading(false);
    navigate('/');
  };

  return (
    <StyledNavigation>
      <Link to="/">Home</Link>
      {session.data ? (
        <div>
          <Link to="/posts">Posts</Link>
          <Link to="/settings">Settings</Link>
          <Link to="/account">My Profile</Link>
          <button disabled={isLoading} onClick={onLogout}>
            {isLoading ? 'loading...' : 'Logout'}
          </button>
        </div>
      ) : (
        <div>
          <Link to="/about">About</Link>
          <Link to="/signup">Sign Up</Link>
          <button disabled={isLoading} onClick={onLogin}>
            {isLoading ? 'loading...' : 'Login'}
          </button>
        </div>
      )}
    </StyledNavigation>
  );
};

const StyledNavigation = styled.div`
  background-color: #f0f0f0;
  padding: 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  a {
    margin: 0 10px;
  }
`;
