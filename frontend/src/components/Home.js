import React from 'react'
import { Link } from 'react-router-dom'


function Home() {
  return (
    <div>
        <center><h1 >Home</h1></center><br/>
      <center>
        <div >
          <Link to="/Register"><h4 >User</h4></Link>
        <br/>
          <Link to="/admin"><h4>Admin</h4></Link>
        </div>
    </center>
    </div>
  )
}

export default Home