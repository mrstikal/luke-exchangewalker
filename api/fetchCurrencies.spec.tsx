import { render } from '@testing-library/react';

import FetchCurrencies from './fetchCurrencies';

describe('FetchCurrencies', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<FetchCurrencies />);
    expect(baseElement).toBeTruthy();
  });
});
