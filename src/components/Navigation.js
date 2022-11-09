import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

export const Navigation = ({ session }) => {
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onLogout = async () => {
    setLoading(true);
    await session.logout();
    setLoading(false);
    navigate('/');
  }

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
          <Link to="/login">Login</Link>
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
