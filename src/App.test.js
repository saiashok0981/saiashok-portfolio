import { act, fireEvent, render, screen } from '@testing-library/react';
jest.mock('./ThreeArt', () => () => null);
import App from './App';

test('renders the portfolio and its main actions', async () => {
  await act(async () => { render(<App />); });
  expect(screen.getByRole('heading', { name: /building systems/i })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /download cv/i })).toHaveAttribute('href', expect.stringContaining('Saiashok-Karadi-CV.pdf'));
  expect(screen.getByRole('link', { name: /start a conversation/i })).toHaveAttribute('href', 'mailto:saiashok103@gmail.com');
});

test('filters the project list', async () => {
  await act(async () => { render(<App />); });
  fireEvent.click(screen.getByRole('button', { name: /data 01/i }));
  expect(screen.getByRole('heading', { name: /databricks data pipeline/i })).toBeInTheDocument();
  expect(screen.queryByRole('heading', { name: /tile terminal workspace/i })).not.toBeInTheDocument();
});

test('opens the CABS case study from a direct link', async () => {
  window.history.replaceState({}, '', '?case=cabs');
  try {
    await act(async () => { render(<App />); });
    expect(screen.getByRole('heading', { name: /making network operations visible/i })).toBeInTheDocument();
    expect(screen.getByText(/70% less rule deployment turnaround/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /back to work/i })).toHaveAttribute('href', expect.stringContaining('#work'));
  } finally {
    window.history.replaceState({}, '', '/');
  }
});

test('opens the Tile case study with a source link', async () => {
  window.history.replaceState({}, '', '?case=tile');
  try {
    await act(async () => { render(<App />); });
    expect(screen.getByRole('heading', { name: /terminal workspace that keeps the work in view/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /view tile source/i })).toHaveAttribute('href', 'https://github.com/saiashok0981/tile');
  } finally {
    window.history.replaceState({}, '', '/');
  }
});
