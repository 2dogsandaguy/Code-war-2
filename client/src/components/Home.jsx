import { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
// import bgVideo from '../../../public/video/home_page_video.mp4'
import bgImage from '../../../public/images/home_image.jpg';
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../../utils/mutations";
import Auth from '../../utils/auth';
import YourComponent from './YourComponent';
import "./Home.css";


function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  const [login] = useMutation(LOGIN_USER);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSignIn = async (event) => {
    event.preventDefault();
    try {
      console.log('Before login request');
      const { data } = await login({
        variables: { email: email, password },
      });

      console.log('Sign-in successful. Data:', data);
      // Store the token in local storage
      Auth.login(data.login.token);

      setEmail('');
      setPassword('');

      const signInSuccessful = true; // This should be the result of your sign-in operation.

      if (signInSuccessful) {

        navigate('/profile');
      }
    } catch (e) {
      console.error('Sign-in error:', e);
    }
  };
  // Check if the user is logged in
  const isLoggedIn = Auth.loggedIn();
  return (
    <div style={{
      backgroundImage: `url(${bgImage})`,
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      position: 'relative',
      height: '100vh',
      overflow: 'hidden'
    }}>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        zIndex: '1',
        position: 'relative'
      }}>
        <h1 className="lightblue-text" style={{ marginBottom: '50px', fontSize: '75px' }}>Endor Fitness</h1>
        <label className="lightblue-text large-bold-text label-email" style={{ marginTop: '20px' }}>
          Email:
          <input type="text" value={email} onChange={handleEmailChange} className="large-input" style={{ marginLeft: '10px' }} placeholder="Enter email" />
        </label>
        <label className="lightblue-text large-bold-text" style={{ marginTop: '20px' }}>
          Password:
          <input type="password" value={password} onChange={handlePasswordChange} className="large-input" style={{ marginLeft: '10px' }} placeholder="Enter password" />
        </label>
        <div style={{ display: 'flex', justifyContent: 'space-between', width: '200px', marginTop: '20px' }}>
          <button onClick={handleSignIn}>Sign In</button>
          <button><Link to="/signup" style={{ color: 'black' }}>Sign Up</Link></button>
          {/* Conditional rendering of YourComponent */}
          {isLoggedIn && <YourComponent />}
        </div>
      </div>
    </div>
  );
}
export default Login;

