import styled from 'styled-components/native';

const Hr = styled.View<{ padded?: boolean; grey?: boolean }>`
  border-bottom-color: ${({ theme }) => theme.colors.white};
  border-bottom-width: 1px;
  opacity: ${({ grey }) => (grey ? 0.1 : 0.5)};
  margin: ${({ theme }) => theme.spacing(0.5, 'auto')};
  width: ${({ padded }) => (padded ? 75 : 100)}%;
`;

export default Hr;
