import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useUser } from '../context/UserContext';

function Navbar() {
  const { user, isLoggedIn, logout } = useUser();
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogout = async () => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to logout?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, logout!',
      cancelButtonText: 'Cancel',
      confirmButtonColor: '#EF4444',
      cancelButtonColor: '#6B7280'
    });

    if (result.isConfirmed) {
      logout();
      setShowDropdown(false);
      Swal.fire({
        icon: 'success',
        title: 'Logged Out!',
        text: 'You have been successfully logged out.',
        confirmButtonColor: '#10B981'
      });
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark navbar-custom fixed-top">
      <div className="container">
        <Link to="/" className="navbar-brand">
          Product App
        </Link>

        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item me-4">
              <Link to="/" className="nav-link">
                Home
              </Link>
            </li>

            {isLoggedIn ? (
              <li className="nav-item dropdown">
                <button
                  className="nav-link dropdown-toggle bg-transparent border-0"
                  style={{ color: 'rgba(255,255,255,.75)' }}
                  onClick={() => setShowDropdown(!showDropdown)}
                >
                  Hi, {user?.username}
                </button>
                {showDropdown && (
                  <div className="dropdown-menu show" style={{ position: 'absolute', right: 0 }}>
                    <button className="dropdown-item" onClick={handleLogout}>
                      Logout
                    </button>
                  </div>
                )}
              </li>
            ) : (
              <>
                <li className="nav-item me-4">
                  <Link to="/login" className="nav-link">
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/register" className="nav-link">
                    Register
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

