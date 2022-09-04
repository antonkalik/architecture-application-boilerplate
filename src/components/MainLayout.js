import { Outlet, useNavigate } from 'react-router';
import styled, { css } from 'styled-components';
import { useSession } from '../hooks/useSession';
import { Navigation } from './Navigation';
import { Footer } from './Footer';
import { Loading } from './Loading';

export const MainLayout = () => {
  const navigate = useNavigate();
  const session = useSession();

  return (
    <div>
      {!session.loading ? (
        <div>
          <Navigation session={session} navigate={navigate} />
          <StyledContainer isLoggedIn={!!session.data}>
            <Outlet context={session} />
          </StyledContainer>
        </div>
      ) : (
        <Loading />
      )}
      <Footer />
    </div>
  );
};

const StyledContainer = styled.div(({ isLoggedIn }) => {
  return css`
    background-color: ${isLoggedIn ? '#f67575' : '#7ee78a'};
    padding: 10px;
  `;
});
