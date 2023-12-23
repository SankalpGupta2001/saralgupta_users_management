import React, { useState } from 'react';
// import { useAuth } from '../components/AuthContext';
import "../App.css";

function LoginScreen() {
  // const { login } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const { loginUser } = useAuth();


  const handleLogin = async () => {
    const userData = {
      email,
      password,
    };

    try {
      const response = await fetch('/app/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
      console.log(response);

      if (response.ok) {
        const responseData = await response.json();
        console.log('Login successful:', responseData);
        // loginUser(responseData); 
        window.location.href = `/home`;
      } else {
        console.error('Login failed');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'  }}>
            <div style={{
                maxWidth: '550px', width: '100%', padding: '20px', display:"flex",boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',alignItems: 'center', flexDirection: 'column',borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                backgroundColor: '#f9f9f9',
            }}>
      <h1>Login</h1>
      <div style={{ marginBottom: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <label style={{ marginRight: '10px' }}>Email</label>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        className='form-control'
                        onChange={(e) => setEmail(e.target.value)}
                        style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc', width: "500px" }}
                    />
                </div>

                <div style={{ marginBottom: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <label style={{ marginRight: '10px' }}>Password</label>
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className='form-control'
                        style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc', width: "500px" }}
                    />
                </div>
                <div style={{ marginBottom: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <button onClick={handleLogin} style={{ padding: '10px 20px', borderRadius: '5px', backgroundColor: '#007bff', color: '#fff', border: 'none', cursor: 'pointer', marginRight: '10px' }}>Login</button>
      </div> 
      <p>Not have an account ? 
      <button onClick={() => {window.location.href="/"}} style={{ padding: '10px 20px', borderRadius: '5px', backgroundColor: '#6c757d', color: '#fff', border: 'none', cursor: 'pointer' }}>Sign Up</button>
            </p>
      </div>
    </div>
  );
}

export default LoginScreen;
