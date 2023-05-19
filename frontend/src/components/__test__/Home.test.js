// import { render, screen } from '@testing-library/react';
// import Home from '../Home';
// import{BrowserRouter} from 'react-router-dom'


// test('renders learn react link', () => {
//   render(<Home />,{wrapper:BrowserRouter});
//   const homeElement = screen.getBy;
//   expect(linkElement).toBeInTheDocument();
// });
import React from 'react';
import { render, screen} from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Home from '../Home';
import '@testing-library/jest-dom/extend-expect'

describe('Home component', () => {
  test('renders home page with navigation links', () => {
    render(
      // <BrowserRouter>
      //   <Home/>
      // </BrowserRouter>
      
      //alternate method
       <Home />,{wrapper:BrowserRouter}

    );

    // Assert the presence of navigation links
    const userLink = screen.getByRole('link', { name: /user/i });
    expect(userLink).toBeInTheDocument();

    
    const adminLink = screen.getByRole('link', { name: /admin/i });
    expect(adminLink).toBeInTheDocument();

    // Assert the presence of the heading
    const heading = screen.getByRole('heading', { name: /home/i });
    expect(heading).toBeInTheDocument();
  }); 
});
