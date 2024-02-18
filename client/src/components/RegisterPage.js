import React from 'react'
import { useState } from 'react';

const RegisterPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handlerName =(env)=>{
        setUsername(env.target.value)
    }
    const handlerPw =(env)=>{
        setPassword(env.target.value)
    }

const register =async (ev)=>{
    ev.preventDefault();
  const response = await fetch('http://localhost:4000/register',{
        method : 'POST',
        body: JSON.stringify({username,password}),
        headers:{'Content-Type':'application/json'},
    })
  console.log(response)
    if(response.status === 200){
      alert('Username successful ')
    }else{
      alert('Username is unavaible ')

    }


}
  return (
    
    <form className="Register"onSubmit={register}>
    <h1>Register</h1>
    <input type="text" 
    placeholder='username'
     value={username} 
     onChange={handlerName}/>
    <input type="text" 
    placeholder='password'
    value={password}
   onChange={handlerPw}/>
    <button>Register</button>
   

    </form>
  )
}

export default RegisterPage