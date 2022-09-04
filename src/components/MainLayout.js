import { Outlet, useNavigate } from 'react-router';
import styled, { css } from 'styled-components';
import { useSession } from '../hooks/useSession';
import { Navigation } from './Navigation';
import { Footer } from './Footer';
import { Loading } from './Loading';

export const MainLayout = ({ navigate }) => {
  const session = useSession();

  return (
    <StyledMainLayout>
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
    </StyledMainLayout>
  );
};

const StyledContainer = styled.div(({ isLoggedIn }) => {
  return css`
    background-color: ${isLoggedIn ? '#f67575' : '#7ee78a'};
    padding: 10px;
  `;
});

const StyledMainLayout = styled.div`
  background-color: #bdbdbd;
  padding: 10px;
`