
import { Link } from 'react-router-dom'
import {useEffect} from 'react';
import { useState } from 'react';




const Header = () => {
const [username , setUsername] = useState(null)
  useEffect(()=>{
     fetch('http://localhost:4000/profile',{
      credentials: 'include',
    }).then(res=>{
      res.json().then(userInfo =>{
          setUsername(userInfo.username)
      })
    })
  }, []);

const logout =()=>{
  fetch('http://localhost:4000/logout',{
    credentials:'include',
    method:'POST',
  });
  setUsername(null);
}
  
  return (
    
    <header>
    <Link to="/" className="logo">Women In Tech</Link>
    <nav>
      {username && (
        <>
        <Link to="/create">Create new post</Link>
        <a onClick={logout}>Logout</a>
        </>
      )}
      {!username && (
        <>
      <Link to="/login">Login</Link>
      <Link to="/register">Register</Link>
        </>
      )}
      
    </nav>
  </header>
  )
}

export default Header