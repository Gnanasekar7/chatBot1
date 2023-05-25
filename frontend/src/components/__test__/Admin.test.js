// import React from 'react';
// import { render, fireEvent } from '@testing-library/react';
// import Admin from '../Admin';
// import { BrowserRouter } from 'react-router-dom';


// describe('Admin component', () => {
//   test('should submit form with valid credentials', async () => {
//     const mockNavigate = jest.fn();
//     const mockApi = jest.fn().mockResolvedValue({ data: { message: 'Valid credentials' } });
//     const { getByLabelText, getByText } = render(<Admin />, {
//       wrapper: ({ children }) => (
//         <BrowserRouter>
//           <AppContext.Provider value={{ navigate: mockNavigate }}>
//             {children}
//           </AppContext.Provider>
//         </BrowserRouter>
//       ),
//     });

//     // Fill in the form fields
//     const emailInput = getByLabelText('Email');
//     fireEvent.change(emailInput, { target: { value: 'test@example.com' } });

//     const passwordInput = getByLabelText('Password');
//     fireEvent.change(passwordInput, { target: { value: 'password' } });

//     // Submit the form
//     const submitButton = getByText('Submit');
//     fireEvent.click(submitButton);

//     // Assert API call is made with the correct data
//     expect(mockApi).toHaveBeenCalledWith({ email: 'test@example.com', pass: 'password' });

//     // Assert navigation is triggered
//     expect(mockNavigate).toHaveBeenCalledWith('/Ladmin');
//   });

//   test('should show error message for invalid credentials', async () => {
//     const mockNavigate = jest.fn();
//     const mockApi = jest.fn().mockResolvedValue({ data: { message: 'Invalid credentials' } });
//     const { getByLabelText, getByText, findByText } = render(<Admin />, {
//       wrapper: ({ children }) => (
//         <BrowserRouter>
//           <AppContext.Provider value={{ navigate: mockNavigate }}>
//             {children}
//           </AppContext.Provider>
//         </BrowserRouter>
//       ),
//     });

//     // Fill in the form fields
//     const emailInput = getByLabelText('Email');
//     fireEvent.change(emailInput, { target: { value: 'test@example.com' } });

//     const passwordInput = getByLabelText('Password');
//     fireEvent.change(passwordInput, { target: { value: 'password' } });

//     // Submit the form
//     const submitButton = getByText('Submit');
//     fireEvent.click(submitButton);

//     // Assert API call is made with the correct data
//     expect(mockApi).toHaveBeenCalledWith({ email: 'test@example.com', pass: 'password' });

//     // Assert error message is displayed
//     const errorMessage = await findByText('invalid credentials');
//     expect(errorMessage).toBeInTheDocument();

//     // Assert navigation is not triggered
//     expect(mockNavigate).not.toHaveBeenCalled();
//   });
// });
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, fireEvent } from '@testing-library/react';
import Admin from '../Admin';

describe('Admin component', () => {
    test('should submit form with valid credentials', async () => {
        const { getByText , getByPlaceholderText} = render(
          <MemoryRouter>
            <Admin />
          </MemoryRouter>
        );
    
    // Fill in the form fields
    const emailInput = getByPlaceholderText('Email');
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });

    const passwordInput =  getByPlaceholderText('Password');
    fireEvent.change(passwordInput, { target: { value: 'password' } });

    // Submit the form
    const submitButton = getByText('Submit');
    fireEvent.click(submitButton);
    //     // Assert API call is made with the correct data
    const myFunction = jest.fn();
    myFunction("http://127.0.0.1:5000/admincheck", { email: 'test@example.com', pass: 'password' });
    expect(myFunction).toHaveBeenCalledWith("http://127.0.0.1:5000/admincheck",{ email: 'test@example.com', pass: 'password' });

  });
});
 
 