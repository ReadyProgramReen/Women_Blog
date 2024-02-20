import React, { useContext, useState } from 'react';
import {Navigate} from 'react-router-dom';
import { UserContext } from './UserContext';


const LoginPage = () => {

const [username,setUsername] = useState('')
const [password,setPassword] = useState('')
const [redirect,setRedirect] = useState(false)
const {setUserInfo}= useContext(UserContext)
const handlerName =(env)=>{
  setUsername(env.target.value)
}
const handlerPw =(env)=>{
  setPassword(env.target.value)
}


  const login =async (ev)=>{
    ev.preventDefault()
    const res = await  fetch('http://localhost:4000/login',{
      method : 'POST',
      body: JSON.stringify({username,password}),
      headers:{'Content-Type':'application/json'},
      credentials:'include',
     })
     if(res.ok){
      res.json().then(json=>{
        setUserInfo(json)
        setRedirect(true)

      })
    }else{
      
      alert('Wrong user name or password ')

    }
    }
    if(redirect){
      return <Navigate to={'/'} />
    }

  return (
   
        <form className='Login' onSubmit={login}>
         <h1>Login</h1>
        <input type="text" 
        placeholder='username' 
        value = {username} 
        onChange={handlerName}/>
        <input type="password" 
        placeholder='password'
         value={password} 
         onChange={handlerPw}/>
        <button>Login</button>

        </form>
    
  )
}

export default LoginPage