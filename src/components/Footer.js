import styled from 'styled-components';

export const Footer = () => {
  return <StyledFooter>Footer</StyledFooter>;
};

const StyledFooter = styled.div`
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
