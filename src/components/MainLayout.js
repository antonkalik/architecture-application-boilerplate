import { Outlet, useOutletContext } from 'react-router';
import styled, { css } from 'styled-components';
import { Navigation } from './Navigation';
import { Footer } from './Footer';

export const MainLayout = () => {
  const session = useOutletContext();

  return (
    <StyledMainLayout>
      <div>
        <Navigation session={session} />
        <StyledContainer isLoggedIn={!!session}>
          <Outlet context={session} />
        </StyledContainer>
      </div>
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
`;
