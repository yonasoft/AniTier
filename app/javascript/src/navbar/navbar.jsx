import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import './navbar.scss';

export default function NavBar() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState("");

  const token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

  useEffect(() => {
    fetch("/api/authenticate", {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-CSRF-Token': token
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setLoggedIn(data.logged_in);
        setUsername(data.username); // assuming the server returns username
      });
  }, []);

  const logout = () => {
    fetch("/api/logout", {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-CSRF-Token': token
      },
    })
      .then((response) => {
        if (response.ok) {
          setLoggedIn(false);
          setUsername("");
        }
      });
  }


  return (
    <nav className="navbar navbar-expand shadow p-3">
      <div className="container">
        <a className="navbar-brand text-light font-weight-bold" href="/"><span id="brand-ani">Ani</span><span id="brand-tier">Tier</span></a>
        <div className="collapse navbar-collapse d-flex justify-content-end " id="navbarSupportedContent">
          <ul className="navbar-nav d-flex justify-content-end me-3">
            <li className="nav-item">
              <a className="nav-link font-weight-bold text-light" href="/home">Home</a>
            </li>
            <li className="nav-item">
              <a className="nav-link font-weight-bold text-light" href="/create">Create</a>
            </li>
            <li className="nav-item">
              <a className="nav-link font-weight-bold text-light " href="/templates">Templates</a>
            </li>
          </ul>
          <ul id="account-nav" className="navbar-nav ml-auto">
            {loggedIn ? (
              <>
                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle font-weight-bold text-light" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    {username}
                  </a>
                  <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                    <li><a className="dropdown-item" href="#">Profile</a></li>
                    <li><a className="dropdown-item" onClick={logout}>Logout</a></li>
                  </ul>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <a id="login-btn" className="nav-link btn btn-primary btn-block mb-0 text-light font-weight-bold" href="/login">Login</a>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  )
}



