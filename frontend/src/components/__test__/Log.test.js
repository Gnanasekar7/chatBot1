
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Log from '../Log';
import { MemoryRouter, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '@testing-library/jest-dom/extend-expect'

jest.mock('axios');

describe('Log Component', () => {
  it('should handle form submission and display error messages for invalid form data', () => {
    render(
      <MemoryRouter>
        <Log />
      </MemoryRouter>
    );

    const emailInput = screen.getByPlaceholderText('Email');
    fireEvent.change(emailInput, { target: { value: '' } })
    const passwordInput = screen.getByPlaceholderText('Password');
    fireEvent.change(passwordInput, { target: { value: '' } })
    const submitButton = screen.getByText('Submit');

    fireEvent.click(submitButton);
    //displaying error to the user
    expect(screen.getByText(/email is required/i)).toBeVisible();
    expect(screen.getByText(/password is required/i)).toBeVisible();

  }); 

  it('should handle form submission and display an alert for invalid credentials', () => {
    render(
      <MemoryRouter>
        <Log />
      </MemoryRouter>
    );

    const alertMock = jest.spyOn(window, 'alert');
    axios.post.mockRejectedValueOnce(new Error('Invalid credentials'));

    const emailInput = screen.getByPlaceholderText('Email');
    const passwordInput = screen.getByPlaceholderText('Password');
    const submitButton = screen.getByText('Submit');

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password' } });

    fireEvent.click(submitButton);

    alertMock.mockRestore();
  });

  it('should handle form submission and perform navigation for valid credentials', async () => {
    const navigateMock = jest.fn();
    const localStorageMock = {
      setItem: jest.fn(),
      removeItem: jest.fn(),
    };

    Object.defineProperty(window, 'localStorage', { value: localStorageMock });

    const mockedUsedNavigate = jest.fn();

    jest.mock('react-router-dom', () => ({
       ...jest.requireActual('react-router-dom') ,
      useNavigate: () => mockedUsedNavigate,
    }));

    render(
      <MemoryRouter>
        <Log />
      </MemoryRouter>
    );

    const emailInput = screen.getByPlaceholderText('Email');
    const passwordInput = screen.getByPlaceholderText('Password');
    const submitButton = screen.getByText('Submit');

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password' } });

    axios.post.mockResolvedValueOnce({ data: 'success', headers: { get: () => 'mockToken' } });

    fireEvent.click(submitButton);
 
    expect(axios.post).toHaveBeenCalledWith('/login', { Email: 'test@example.com', Password: 'password' });

  });
});
