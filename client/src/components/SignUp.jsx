import { useState } from "react";
import './SignUp.css';

function signUp () {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        //database
    };

    return (
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
  );
}

    export default signUp;
