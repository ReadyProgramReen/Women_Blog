import React, { useState } from 'react';
import {Navigate} from 'react-router-dom';


const LoginPage = () => {

  const [username,setUsername] = useState('')
const [password,setPassword] = useState('')
const [redirect,setRedirect] = useState(false)

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
      setRedirect(true)
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