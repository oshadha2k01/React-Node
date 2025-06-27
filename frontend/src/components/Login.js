import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { userAPI } from '../services/api';
import { useUser } from '../context/UserContext';
import Swal from 'sweetalert2';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useUser();

  function handleUsernameChange(e) {
    const value = e.target.value.replace(/[^a-zA-Z0-9]/g, '');
    setUsername(value);

    if (!value) {
      setUsernameError('Username is required');
    } else if (value.length < 3) {
      setUsernameError('Username must be at least 3 characters');
    } else {
      setUsernameError('');
    }
  }

  function handlePasswordChange(e) {
    const value = e.target.value;
    setPassword(value);

    if (!value) {
      setPasswordError('Password is required');
    } else if (value.length < 6) {
      setPasswordError('Password must be at least 6 characters');
    } else {
      setPasswordError('');
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    let valid = true;

    if (!username) {
      setUsernameError('Username is required');
      valid = false;
    }
    if (!password) {
      setPasswordError('Password is required');
      valid = false;
    }

    if (!valid) {
      Swal.fire({
        icon: 'error',
        title: 'Validation Error',
        text: 'Please check the fields and try again',
      });
      return;
    }

    setLoading(true);

    try {
      const response = await userAPI.login({ username, password });
      login({ username });

      Swal.fire({
        icon: 'success',
        title: 'Login Successful',
        text: response.data.message,
      });

      setUsername('');
      setPassword('');
      setUsernameError('');
      setPasswordError('');

      setTimeout(() => {
        navigate('/');
      }, 1500);
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Login Failed',
        text: err.response?.data?.error || 'Something went wrong',
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-12 col-sm-8 col-md-6 col-lg-4">
          <div className="card shadow position-fixed top-20">
            <div className="card-body p-4">
              <h2 className="card-title text-center mb-4">Login</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Username</label>
                  <input
                    type="text"
                    className={`form-control ${usernameError ? 'is-invalid' : ''}`}
                    value={username}
                    onChange={handleUsernameChange}
                    placeholder="Username"
                    required
                  />
                  {usernameError && (
                    <div className="invalid-feedback d-block">{usernameError}</div>
                  )}
                </div>

                <div className="mb-3">
                  <label className="form-label">Password</label>
                  <input
                    type="password"
                    className={`form-control ${passwordError ? 'is-invalid' : ''}`}
                    value={password}
                    onChange={handlePasswordChange}
                    placeholder="Password"
                    required
                  />
                  {passwordError && (
                    <div className="invalid-feedback d-block">{passwordError}</div>
                  )}
                </div>

                <button
                  type="submit"
                  className="btn btn-primary w-100 mb-3"
                  disabled={loading || usernameError || passwordError}
                >
                  {loading ? 'Logging in...' : 'Login'}
                </button>
              </form>

              <p className="text-center">
                Don't have an account?{' '}
                <Link to="/register">Register here</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
