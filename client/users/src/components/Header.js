import React, { Component } from 'react'
import '../index.css';
import '../App.css';
import { Link } from 'react-router-dom';


export default class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: '',
      password: '',
    }
  }
  
  handleLogout = () => {
    const URL = 'http://localhost:3000/';
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    window.location.href = URL;
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Sprint-Challenge-Authentication</h1> 

          {localStorage.username ? <p className="">Welcome, {localStorage.username}</p> : null}

          {localStorage.token ? null : <Link to="/register" style={{ textDecoration: 'none' }}>
            <button type='button' className="btn btn-info mr-2">Register</button>
          </Link>}

          {localStorage.token ? null : <Link to="/login" style={{ textDecoration: 'none' }}>
            <button type='button' className="btn btn-success mr-2">Login</button>
          </Link>}

          {localStorage.token ? <button type='button' onClick={() => this.handleLogout()} handleLogout={() => this.handleLogout} className="btn btn-danger mr-2">Logout</button> : null}
        </header>
      </div>
    )
  }
}