// import React from 'react'
// import { Link } from 'react-router-dom'


// function Home() {
//   return (
//     <div>
//         <center><h1 >Home</h1></center><br/>
//       <center>
//         <div >
//           <Link to="/Register"><h4 >User</h4></Link>
//         <br/>
//           <Link to="/admin"><h4>Admin</h4></Link>
//         </div>
//     </center>
//     </div>
//   )
// }

// export default Home

import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css'; // Import the external CSS file

function Home() {
  return (
    <div>
      <nav className="nav">
        <ul>
          <li>
            <Link to="/Register">User</Link>
          </li>
        </ul>
        <ul>
          <li>
            <Link to="/admin">Admin</Link>
          </li>
        </ul>
      </nav>
      <div className="container">
        <h1>Home</h1>
      </div>
    </div>
  );
}

export default Home;
