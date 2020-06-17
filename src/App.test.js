import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { render, screen } from '@testing-library/react';

describe('App', () => {
  test('renders App component', () => {
    render(<App />);
    screen.getByText('Search:');
  });
});