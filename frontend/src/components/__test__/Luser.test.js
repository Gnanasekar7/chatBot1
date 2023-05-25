 
import React from 'react';
import { render} from '@testing-library/react';
import axios from 'axios';
import Luser from '../Luser';
import '@testing-library/jest-dom/extend-expect';

jest.mock('axios'); // Mock axios to control API responses

describe('Luser Component', () => {
  beforeEach(() => {
    axios.get.mockResolvedValue({ data: [] }); // Mock API response for initial data fetch
    axios.post.mockResolvedValue({ status: 200 }); // Mock API response for form submission
  });

  it('should render the component without error boundaries', () => {
    render(<Luser />);
  });


  it('should fetch initial data from the API', async () => { 
    render(<Luser />);
    // Add assertions to check if the initial data is fetched from the API
    expect(axios.get).toHaveBeenCalledWith('http://127.0.0.1:5000/userreq');
  });

  it('should handle form submission and show success message', async () => {
    render(<Luser />);
  const myFunction = jest.fn();

// Calling the function with some arguments
    myFunction("http://127.0.0.1:5000/history", {"Email": "", "myValues": ["Question 1", "Follow Up 1", "Selected Value"]});

// Expecting the function to have been called with specific arguments
    expect(myFunction).toHaveBeenCalledWith("http://127.0.0.1:5000/history", {"Email": "", "myValues": ["Question 1", "Follow Up 1", "Selected Value"]});

  });
});
