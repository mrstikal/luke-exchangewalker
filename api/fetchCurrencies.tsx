import styled from 'tailwind';

/* eslint-disable-next-line */
export interface FetchCurrenciesProps {}

const StyledFetchCurrencies = styled.div`
  color: pink;
`;

export function FetchCurrencies(props: FetchCurrenciesProps) {
  return (
    <StyledFetchCurrencies>
      <h1>Welcome to FetchCurrencies!</h1>
    </StyledFetchCurrencies>
  );
}

export default FetchCurrencies;
