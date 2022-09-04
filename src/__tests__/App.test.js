import {
  render,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import '@testing-library/jest-dom';
import { App } from '../App';
import { BrowserRouter } from 'react-router-dom';
import { fakeCache } from '../data/fakeCache';

beforeAll(() => {
  fakeCache.clear();
});

describe('App Test', () => {
  test('should get views', async () => {
    const user = userEvent.setup();
    render(<App />, { wrapper: BrowserRouter });

    const loadingElement = screen.getByTestId('loading-element');
    expect(screen.getByText(/Footer/i)).toBeInTheDocument();
    expect(loadingElement).toBeInTheDocument();
    await waitForElementToBeRemoved(loadingElement);

    expect(screen.getByText(/Landing View/i)).toBeInTheDocument();

    await user.click(screen.getByText(/About/i));

    expect(screen.getByText(/About View/i)).toBeInTheDocument();

    await user.click(screen.getByText(/Sign Up/i));

    expect(screen.getByText(/SignUp View/i)).toBeInTheDocument();
  });
});
