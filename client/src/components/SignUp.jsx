import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../../utils/mutations';
import './SignUp.css';
import { useNavigate } from 'react-router-dom';


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
      console.log("Submitting mutation");
      console.log("Variables:", { username, email, password });
      const { data } = await addUser({
        variables: {
          username,
          email,
          password,
        },
      });

      // The signup was successful, you can now handle the data response
      console.log("Mutation success:", data);


      // Set the success message
      setMessage('Signup successful! Redirecting to home page...');

      // Redirect to the home page after a delay
      setTimeout(() => {
        navigate('/');
      }, 4000); // 4000ms delay
    } catch (err) {
      // Handle signup error
      console.error("Mutation error:", err);
      console.log("Error details:", err.message, err.graphQLErrors, err.networkError);
    }
  };
  console.log("GraphQL Mutation:", ADD_USER.loc.source.body);

  return (
    <>
    {message && <h2 style={{ color: 'green', textAlign: 'center' }}>{message}</h2>}
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
