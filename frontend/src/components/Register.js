import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { userAPI } from '../services/api';
import Swal from 'sweetalert2';

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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

    if (confirmPassword && value !== confirmPassword) {
      setConfirmPasswordError('Passwords do not match');
    } else {
      setConfirmPasswordError('');
    }
  }

  function handleConfirmPasswordChange(e) {
    const value = e.target.value;
    setConfirmPassword(value);

    if (!value) {
      setConfirmPasswordError('Please confirm your password');
    } else if (value !== password) {
      setConfirmPasswordError('Passwords do not match');
    } else {
      setConfirmPasswordError('');
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    let hasError = false;

    if (!username) {
      setUsernameError('Username is required');
      hasError = true;
    }

    if (!password) {
      setPasswordError('Password is required');
      hasError = true;
    }

    if (!confirmPassword) {
      setConfirmPasswordError('Please confirm your password');
      hasError = true;
    }

    if (password && confirmPassword && password !== confirmPassword) {
      setConfirmPasswordError('Passwords do not match');
      hasError = true;
    }

    if (hasError) {
      Swal.fire({
        icon: 'error',
        title: 'Validation Error',
        text: 'Please check the fields and try again',
      });
      return;
    }

    setLoading(true);

    try {
      const response = await userAPI.register({ username, password });

      Swal.fire({
        icon: 'success',
        title: 'Registration Successful',
        text: response.data.message,
      });

      setUsername('');
      setPassword('');
      setConfirmPassword('');
      setUsernameError('');
      setPasswordError('');
      setConfirmPasswordError('');

      setTimeout(() => {
        navigate('/login');
      }, 1500);

    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Registration Failed',
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
              <h2 className="card-title text-center mb-4">Register</h2>
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
                  {usernameError && <div className="invalid-feedback d-block">{usernameError}</div>}
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
                  {passwordError && <div className="invalid-feedback d-block">{passwordError}</div>}
                </div>

                <div className="mb-3">
                  <label className="form-label">Confirm Password</label>
                  <input
                    type="password"
                    className={`form-control ${confirmPasswordError ? 'is-invalid' : ''}`}
                    value={confirmPassword}
                    onChange={handleConfirmPasswordChange}
                    placeholder="Confirm Password"
                    required
                  />
                  {confirmPasswordError && <div className="invalid-feedback d-block">{confirmPasswordError}</div>}
                </div>

                <button
                  type="submit"
                  className="btn btn-primary w-100 mb-3"
                  disabled={
                    loading ||
                    usernameError ||
                    passwordError ||
                    confirmPasswordError ||
                    !username ||
                    !password ||
                    !confirmPassword
                  }
                >
                  {loading ? 'Registering...' : 'Register'}
                </button>
              </form>

              <p className="text-center">
                Already have an account?{' '}
                <Link to="/login">Login here</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
