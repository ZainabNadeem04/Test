import React from 'react'
import { BrowserRouter,Link,Route,Routes } from 'react-router-dom'
import { auth} from '../config/firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import { signOut } from 'firebase/auth'
import Auth from './Auth'
import Post from './Post'
import About from './About'
import Home from './Home'
import '../index.css'
import Select from './Select'
function Navbar() {
    const user = useAuthState(auth);
    async function handleLogout() {
        await signOut(auth)
     }
  return (
    <>
       <BrowserRouter>
      <nav>
        {user[0] === null ? (<><h1>navbar</h1></>) :
        (<>
         {user && (<>
        <h2>{user[0]?.displayName}</h2>
        {/* <img src={user?.photoURL || } alt="profile-image" /> */}
        <img src={user[0]?.photoURL } alt="Profile" />
       </>)}
        </>)
        }
        {user[0] === null ? (<>
            <Link to='/auth' className="nav-item">
        login
        </Link>
        </>) : (
            <>
              <button onClick={handleLogout} className='hy' >
                Logout
              </button></>
        )}
       
        <Link to='/home' className="nav-item">
        Home
        </Link>
        <Link to='/about' className="nav-item">
        About
        </Link>
        {/* <Link to='/select' className="nav-item">Select</Link> */}
        <Link to='/post' className="nav-item">post</Link>
      </nav>
      <Routes>
      <Route path='/auth' Component={Auth} />
      <Route path='/home' Component={Home} />
      <Route path='/about' Component={About} />
      <Route path='/post' Component={Post} />
      {/* <Route path='/select' Component={Select} /> */}
      </Routes>
      
      </BrowserRouter>
    </>
  )
}

export default Navbar
