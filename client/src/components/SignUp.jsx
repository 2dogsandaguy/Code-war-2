import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../../utils/mutations';
import './SignUp.css';
import { Link, useNavigate } from 'react-router-dom';


function SignUp() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const [addUser, { data }] = useMutation(ADD_USER);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await addUser({
        variables: {
          username,
          email,
          password,
        },
      });

      // Set the success message
      setMessage('Signup successful! Redirecting to home page...');

      // Redirect to the home page after a delay
      setTimeout(() => {
        navigate('/');
      }, 4000); // 4000ms delay
    } catch (err) {
      // Handle signup error`
      console.error("Mutation error:", err);
      console.log("Error details:", err.message, err.graphQLErrors, err.networkError);
    }
  };

  return (
    <>
    {message && <h2 style={{ color: 'green', textAlign: 'center' }}>{message}</h2>}
    <header className="header">
      <Link to="/">Back to Login</Link>
    </header>
    <div className="container">
      <form onSubmit={handleSubmit} className="mt-5">
        <div className="mb-3">
          <label className="form-label">Username:</label>
          <input type="text" className="form-control" value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div className="mb-3">
          <label className="form-label">Email:</label>
          <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="mb-3">
          <label className="form-label">Password:</label>
          <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type="submit" className="btn btn-primary">Sign Up</button>
      </form>
    </div>
    </>
  );
}

export default SignUp;
