import React from 'react'
import {auth, loginwithGoogle} from '../config/firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import { signInWithPopup, signOut } from 'firebase/auth'
function Auth() {
    const [user ,loading, error] = useAuthState(auth)
     async function handleLogin() {
        await signInWithPopup(auth, loginwithGoogle)
     }
  return (
    <div>
       <h3>login with google</h3>
      <input type="email"  placeholder='abc@gmail.com'/>
      <input type="password"  placeholder='*****'/>
      <button onClick={handleLogin}>login with google</button>
     
      {loading && <p>loading...</p>}
       {user && (<>
        <h2>{user?.displayName}</h2>
        {/* <img src={user?.photoURL || } alt="profile-image" /> */}
        <img src={user?.photoURL || "https://postimg.cc/mhk7TMtL"} alt="Profile" />
       </>)}
    </div>
  )
}

export default Auth
