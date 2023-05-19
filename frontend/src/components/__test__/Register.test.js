import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Register from '../Register';
import { RegisterApi } from '../../services/RegisterApi';

jest.mock('../../services/RegisterApi', () => ({
  RegisterApi: jest.fn().mockResolvedValue({
    status: 200,
    data: {
      message: 'successfully registered',
    },
  }),
}));

describe('Register component', () => {
  it('should render and submit the form successfully', async () => {
    const navigate = jest.fn();

    const originalAlert = window.alert;
    // Mock window.alert and track calls to it
    const mockAlert = jest.fn();
    window.alert = mockAlert;

    const { getByPlaceholderText, getByRole, queryByText } = render(
      <MemoryRouter>
        <Register navigate={navigate} />
      </MemoryRouter>
    );

    const firstNameInput = getByPlaceholderText('First Name');
    fireEvent.change(firstNameInput, { target: { value: 'John' } });

    const lastNameInput = getByPlaceholderText('Last Name');
    fireEvent.change(lastNameInput, { target: { value: 'Doe' } });

    const emailInput = getByPlaceholderText('Email');
    fireEvent.change(emailInput, { target: { value: 'john@example.com' } });

    const passwordInput = getByPlaceholderText('Password');
    fireEvent.change(passwordInput, { target: { value: 'password' } });

    const confirmPasswordInput = getByPlaceholderText('Confirm Password');
    fireEvent.change(confirmPasswordInput, { target: { value: passwordInput.value } });

    const registerButton = getByRole('button', { name: /Register/i });
    fireEvent.click(registerButton);

    await waitFor(() => {
      expect(RegisterApi).toHaveBeenCalledTimes(1);
      expect(RegisterApi).toHaveBeenCalledWith({
        fname: 'John',
        lname: 'Doe',
        email: 'john@example.com',
        pass: 'password',
        cpass: 'password',
      });

      // Verify window.alert was called with the correct message
      // expect(mockAlert).toHaveBeenCalledTimes(1);
      // expect(mockAlert).toHaveBeenCalledWith('successfully registered');
      // expect(navigate).toHaveBeenCalledWith('/login');

      // Verify that form errors are not displayed
      expect(queryByText('First Name is required')).toBeNull();
      expect(queryByText('Last Name is required')).toBeNull();
      expect(queryByText('Email is required')).toBeNull();
      expect(queryByText('Invalid password')).toBeNull();
      expect(queryByText('Password Mismatch')).toBeNull();
    });

    // Restore the original window.alert function
    window.alert = originalAlert;
  });
});
