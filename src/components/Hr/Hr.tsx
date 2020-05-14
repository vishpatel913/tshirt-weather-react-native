import styled from 'styled-components/native';

const Hr = styled.View<{ padded?: boolean }>`
  border-bottom-color: white;
  border-bottom-width: 1px;
  opacity: 0.5;
  margin: ${({ theme }) => theme.spacing.half} auto;
  width: ${({ padded }) => (padded ? 75 : 100)}%;
`;

export default Hr;
