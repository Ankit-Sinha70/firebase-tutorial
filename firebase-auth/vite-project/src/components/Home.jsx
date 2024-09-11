import React from 'react'

function Home() {
  return (
    <>
        <div>
            <h2>Register User</h2>
            <input type="text" placeholder="email..." />
            <input type="text" placeholder='password...'/>
            <button>Create User</button>
        </div>
        <div>
            <h2>LogIn</h2>
            <input type="text" placeholder='email..' />
            <input type="text" placeholder='password..' />
            <button>Login</button>
        </div>
        <div>
            <h2>User Logged In : </h2>
            <button>SignOut</button>
        </div>
    </>
  )
}

export default Home